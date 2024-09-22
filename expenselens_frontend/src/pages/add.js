import React, { useState } from 'react';
import Nav from './nav'; // Adjust the path if needed
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userId = user.id || '';

  const [food, setFood] = useState({ groceries: '', diningOut: '', beverage: '', takeOut: '' });
  const [entertainment, setEntertainment] = useState({ streamingSubscriptions: '', musicSubscriptions: '', cinemaAndEvents: '', shoppingBills: '' });
  const [utility, setUtility] = useState({ electricity: '', water: '', rent: '', gas: '', mobile: '', maintenance: '' });

  const handleFoodChange = (e) => {
    const { name, value } = e.target;
    setFood((prevFood) => ({ ...prevFood, [name]: value }));
  };

  const handleEntertainmentChange = (e) => {
    const { name, value } = e.target;
    setEntertainment((prevEntertainment) => ({ ...prevEntertainment, [name]: value }));
  };

  const handleUtilityChange = (e) => {
    const { name, value } = e.target;
    setUtility((prevUtility) => ({ ...prevUtility, [name]: value }));
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9090/expenses/updateFood?id=${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(food),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Food added successfully!');
        setFood({ groceries: '', diningOut: '', beverage: '', takeOut: '' });
      } else {
        toast.error('Failed to add food: ' + result.message);
      }
    } catch (error) {
      toast.error('An error occurred while adding food.');
    }
  };

  const handleAddEntertainment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9090/expenses/updateEntertainment?id=${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entertainment),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Entertainment added successfully!');
        setEntertainment({ streamingSubscriptions: '', musicSubscriptions: '', cinemaAndEvents: '', shoppingBills: '' });
      } else {
        toast.error('Failed to add entertainment: ' + result.message);
      }
    } catch (error) {
      toast.error('An error occurred while adding entertainment.');
    }
  }; 

  const handleAddUtility = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch(`http://localhost:9090/expenses/updateUtility?id=${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(utility),
          });
          const result = await response.json();
          if (response.ok) {
            toast.success('Utility added successfully!');
            setUtility({ electricity: '', water: '', rent: '', gas: '', mobile: '', maintenance: '' });
        } else {
            toast.error('Failed to add utility: ' + result.message);
          }
        } catch (error) {
          toast.error('An error occurred while adding utility.');
        }
  };

  return (
    <div className="add-page">
      <Nav />
      <div className="content">
        <h1>Add your spending below</h1>
        
        <div className="form-container">
          <h2>Add Food Expense</h2>
          <form onSubmit={handleAddFood}>
            <input type="number" name="groceries" placeholder="Groceries cost in ₹" min="0" step="0.01" value={food.groceries} onChange={handleFoodChange} />
            <input type="number" name="diningOut" placeholder="Dining Out cost in ₹" min="0" step="0.01" value={food.diningOut} onChange={handleFoodChange} />
            <input type="number" name="beverage" placeholder="Beverage cost in ₹" min="0"  step="0.01" value={food.beverage} onChange={handleFoodChange} />
            <input type="number" name="takeOut" placeholder="Take Out cost in ₹" min="0" step="0.01"  value={food.takeOut} onChange={handleFoodChange} />
            <button type="submit">Add Food Expense</button>
          </form>
        </div>

        <div className="form-container">
          <h2>Add Entertainment Expense</h2>
          <form onSubmit={handleAddEntertainment}>
            <input type="number" name="streamingSubscriptions" placeholder="Streaming Subscriptions cost in ₹" min="0" step="0.01"  value={entertainment.streamingSubscriptions} onChange={handleEntertainmentChange} />
            <input type="number" name="musicSubscriptions" placeholder="Music Subscriptions cost in ₹" min="0" step="0.01"  value={entertainment.musicSubscriptions} onChange={handleEntertainmentChange} />
            <input type="number" name="cinemaAndEvents" placeholder="Cinema and Events cost in ₹" min="0" step="0.01"  value={entertainment.cinemaAndEvents} onChange={handleEntertainmentChange} />
            <input type="number" name="shoppingBills" placeholder="Shopping Bills cost in ₹" min="0"  step="0.01" value={entertainment.shoppingBills} onChange={handleEntertainmentChange} />
            <button type="submit">Add Entertainment Expense</button>
          </form>
        </div>

        <div className="form-container">
          <h2>Add Utility Expense</h2>
          <form onSubmit={handleAddUtility}>
            <input type="number" name="electricity" placeholder="Electricity cost in ₹" min="0" step="0.01"  value={utility.electricity} onChange={handleUtilityChange} />
            <input type="number" name="water" placeholder="Water cost in ₹" min="0"  step="0.01" value={utility.water} onChange={handleUtilityChange} />
            <input type="number" name="rent" placeholder="Rent cost in ₹" min="0"  step="0.01" value={utility.rent} onChange={handleUtilityChange} />
            <input type="number" name="gas" placeholder="Gas cost in ₹" min="0"  step="0.01" value={utility.gas} onChange={handleUtilityChange} />
            <input type="number" name="mobile" placeholder="Mobile cost in ₹" min="0" step="0.01"  value={utility.mobile} onChange={handleUtilityChange} />
            <input type="number" name="maintenance" placeholder="Maintenance cost in ₹" min="0" step="0.01"  value={utility.maintenance} onChange={handleUtilityChange} />
            <button type="submit">Add Utility Expense</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Add;
