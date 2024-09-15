import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Nav = () => {
  const navigate = useNavigate();
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {}; // Fetching user from localStorage
  const username = user.name || 'User'; // Defaulting username if it doesn't exist
  
  useEffect(() => {
    // Check if the user is not authenticated
    if (!user || Object.keys(user).length === 0) {
      toast.error("Unauthorized access. Please log in.", {
        position: "top-right",
        style: { width: "400px", height: "60px" },
      });
      navigate("/"); // Redirect to login page if session variables are missing
    }else if (!initialLoadDone && user) {
      // Check if initial load redirection has been done
      if (!sessionStorage.getItem('initialLoadDone')) {
        // Navigate to the view page only if initial load redirection is not done
        navigate('/expenselens/view', { state: { obj: user } });
        sessionStorage.setItem('initialLoadDone', 'true');
        setInitialLoadDone(true);
      }
    }
  }, [user, navigate]);

  const handleViewClick = () => {
    navigate('/expenselens/view', { state: { obj: user } });
  };

  const handleAddClick = () => {
    navigate('/expenselens/add', { state: { obj: user } });
  };

  const handleLogoutClick = () => {
    // Remove user from session storage and clear all session data
    localStorage.removeItem("user");
    sessionStorage.clear();
    
    // Show a toast notification for successful logout
    toast.success("You have been logged out successfully.", {
      position: "top-right",
      style: { width: "400px", height: "80px" },
    });

    // Redirect to the login page after logging out
    navigate("/");
  };

  return (
    <>
      <div className="sidebar">
        <h2>Welcome, {username}! Manage your expenses with the following options - </h2>
        <p className="sidebar-description">View a summary of all your current expenses:</p>
        <button className="sidebar-button" onClick={handleViewClick}>
          Expense chart
        </button>
        <br/>
        <br/>
        
        <p className="sidebar-description">Add a new expense to the system:</p>
        <button className="sidebar-button" onClick={handleAddClick}>
          Add New Expense
        </button>

        <br/>
        <br/>
        <br/>
        <button className="sidebar-buttondown" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Nav;
