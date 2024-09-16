import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Welcome = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loginError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Post request to the API
      const response = await fetch(`http://18.204.215.150:9090/expenses/getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json(); // Parse the JSON response

      if (result && result.id) {
        // Store the user's name in localStorage or state and navigate to user page
        localStorage.setItem('user', JSON.stringify(result));
        toast.success('Login Successful!', {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          // Pass the username to the User page (you can also use a global state or context)
          navigate('/expenselens/nav', { state: { obj: result } });
        }, 2000);
        
      } else {
        // Display error toast on login failure
        toast.error('Invalid username or password. Please try again.', {
            position: "top-center",
            autoClose: 2000,
          });
      }
    } catch (error) {
        toast.error('Failed to Login', {
            position: "top-center",
            autoClose: 2000,
          });
    }
  };

  return (
    <div className="welcome-page">
    <div className="intro-section">
      <h1>Welcome to ExpenseLens</h1>
      <h3>An innovative approach to your personal finance management</h3>
      <p>
        Take control of your finances with Expense Lens! Our platform helps you 
        track your income and expenses, categorize your spending, and visualize 
        your financial data. Whether you're saving for a big goal or just trying 
        to manage your day-to-day expenses, we've got the tools to help you stay 
        on top of your finances.
      </p>
      <p>
        Sign up today to start gaining insights into your financial habits and 
        make better financial decisions.
      </p>
    </div>

    <div className="login-section">
      <h2>Login</h2>
      {loginError && <p className="error-message">{loginError}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p>Don't have an account? <Link to="/expenselens/signup">Sign Up</Link></p>
    </div>
  </div>
);
};

export default Welcome;
