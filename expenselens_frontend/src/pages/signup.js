import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    salary: '',
    food: '',
    utility: '',
    entertainment: '',
    
  });

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request to the API endpoint
      const response = await fetch(`http://localhost:9090/expenses/newUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error("Usernmae already exists. Please give another username", { position: "top-center", style: { width: "400px", height: "60px" }, });
      } else {
        // Set success message as true to display the green box
        setSuccessMessage(true);

        // Show toast for redirecting message
        toast.info(
          "Redirecting to homepage...", 
          {
            position: "top-center",
            autoClose: 2000, // Automatically close after 2 seconds
          }
        );

        // Redirect to homepage after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className = "signup-page">
    <div className="signup-container">
      <h2>Sign Up</h2>

      {successMessage && (
        <div className="success-box">
          Successfully Signed Up
        </div>
      )}

      {errorMessage && (
        <div className="error-box">
          {errorMessage}
        </div>
      )}

      <form className="signup-form" onSubmit={handleSubmit}>
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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
