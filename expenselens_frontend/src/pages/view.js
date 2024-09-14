import React, { useEffect, useState } from 'react';
import Nav from './nav'; // Adjust the path as needed
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const View = () => {
  const location = useLocation();
  const { obj } = location.state || {};
  const userId = obj?.id || '';
  const totalIncome = obj?.salary || 0; // Get the total income from the object

  const [spendingVsSaving, setSpendingVsSaving] = useState([]);
  const [entertainment, setEntertainment] = useState({});
  const [food, setFood] = useState({});
  const [utility, setUtility] = useState({});
  const [percentage, setPercentage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spendingResponse = await fetch(`http://localhost:9090/expenses/getSpendingVsSaving/${userId}`);
        const spendingData = await spendingResponse.json();
        setSpendingVsSaving(spendingData);

        const entertainmentResponse = await fetch(`http://localhost:9090/expenses/getEntertainment/${userId}`);
        const entertainmentData = await entertainmentResponse.json();
        setEntertainment(entertainmentData);

        const foodResponse = await fetch(`http://localhost:9090/expenses/getFood/${userId}`);
        const foodData = await foodResponse.json();
        setFood(foodData);

        const utilityResponse = await fetch(`http://localhost:9090/expenses/getUtility/${userId}`);
        const utilityData = await utilityResponse.json();
        setUtility(utilityData);

        const percentageResponse = await fetch(`http://localhost:9090/expenses/getAsPercentage/${userId}`);
        const percentageData = await percentageResponse.json();
        setPercentage(percentageData);
        
      } catch (error) {
        if(userId)
        toast.error('Failed to fetch data...');
      }
    };

    fetchData();
  }, [userId]);

  // Utility function to calculate total and avoid floating-point issues
  const calculateTotal = (expenseData) => {
    return Object.values(expenseData).reduce((total, value) => {
      const numericValue = parseFloat(value);
      // Ensuring value is valid number and rounding to 2 decimal places
      return total + (numericValue===0 ? 0 : ((numericValue * 100) / 100));
    }, 0).toFixed(2);
  };

  // Data for pie charts
  const spendingVsSavingData = {
    labels: ['% of Total Spending', '% of Total Saving'],
    datasets: [
      {
        data: spendingVsSaving.map(Number),
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const spendingDistributionData = {
    labels: ['% of Entertainment Expense', '% of Food Expense', '% of Utility Expense'],
    datasets: [
      {
        data: percentage.map(Number),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Adding padding to increase spacing between labels and pie chart
  const options = {
    layout: {
      padding: {
        top: 20,
        bottom: 20, // Adjust this value to change the vertical spacing
      },
    },
    plugins: {
      legend: {
        labels: {
          padding: 20, // Adjust the padding between labels and chart
        },
      },
    },
  };

  // Utility function to display expense details as a list with rupee symbol
  const renderExpenseDetails = (expenseData) => {
    return (
      <ul>
        {Object.entries(expenseData).map(([key, value], index) => (
          index !== 0 ? (
            <li key={key}>
              <strong>{key}:</strong> {'\u20B9'}{parseFloat(value).toLocaleString('en-IN', { maximumFractionDigits: 2 })} 
            </li>
          ) : null
        ))}
      </ul>      
    );
  };

  const totalSpending = (
    parseFloat(calculateTotal(entertainment)) +
    parseFloat(calculateTotal(food)) +
    parseFloat(calculateTotal(utility))
  ).toFixed(2);

  return (
    <div className="view-page">
      <Nav />
      <div className="content">
        <h1>Expense Analysis</h1>
        
        <div className="info-boxes" style={{ display: 'flex', gap: '20px' }}>
          <div className="income-box" style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', flex: 1 }}>
            <h3>Total Income</h3>
            <p>{totalIncome.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
          </div>
          <div className="total-spending-box" style={{ padding: '20px', backgroundColor: '#ffebcc', borderRadius: '5px', flex: 1 }}>
            <h3>Total Spending</h3>
            <p>{totalSpending.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart">
            <h2>Spending vs Saving</h2>
            <Pie data={spendingVsSavingData} options={options} />
          </div>
          <div className="chart">
            <h2>Spending Distribution</h2>
            <Pie data={spendingDistributionData} options={options} />
          </div>
        </div>

        {/* Static sections for each expense detail */}
        <div className="details-container">
          <div className="expense-detail">
            <h2>Entertainment Expense Details</h2>
            <div className="expense-summary">
              <div className="total-box">
                <p>Total Expense: {'\u20B9'}{calculateTotal(entertainment).toLocaleString('en-IN', { maximumFractionDigits: 2 })-1}</p>
              </div>
            </div>
            {renderExpenseDetails(entertainment)}
          </div>
          <div className="expense-detail">
            <h2>Food Expense Details</h2>
            <div className="expense-summary">
              <div className="total-box">
                <p>Total Expense: {'\u20B9'}{calculateTotal(food).toLocaleString('en-IN', { maximumFractionDigits: 2 })-1}</p>
              </div>
            </div>
            {renderExpenseDetails(food)}
          </div>
          <div className="expense-detail">
            <h2>Utility Expense Details</h2>
            <div className="expense-summary">
              <div className="total-box">
                <p>Total Expense: {'\u20B9'}{calculateTotal(utility).toLocaleString('en-IN', { maximumFractionDigits: 2 })-1}</p>
              </div>
            </div>
            {renderExpenseDetails(utility)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
