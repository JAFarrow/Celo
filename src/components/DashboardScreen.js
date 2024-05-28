// src/components/DashboardScreen.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import TransactionHistory from './TransactionHistory.js';

const DashboardScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [userPrivateKey, setUserPrivateKey] = useState('');
  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:3000/transactions', {
  //       email: user.email,
  //       sender: user.email,
  //       recipient: recipientAddress,
  //       amount,
  //       timestamp: new Date().toISOString(),
  //     });
  //     alert(`Payment Successful: ${response.data.message}`);
  //   } catch (error) {
  //     alert(`Payment Failed: ${error.response.data.message}`);
  //   }
  // };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/pay-rent', {
        recipientAddress,
        amount,
        userPrivateKey,
        email: user.email, // Include the user's email
      });
      alert(`Payment Successful: ${response.data.message}`);
    } catch (error) {
      alert(`Payment Failed: ${error.response.data.message}`);
    }
  };
  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="dashboard-screen">
      {user ? (
        <>
          <div className="dashboard-header">
            <h2>Welcome, {user.email}!</h2>
          </div>
          <div className="dashboard-content">
            <h3>Pay Rent</h3>
            <form onSubmit={handlePayment}>
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button type="submit">Pay</button>
            </form>
          </div>
          <TransactionHistory email={user.email} />
          <div className="dashboard-links">
            <Link to="/profile/edit">Edit Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <p>Please log in or register to access the dashboard.</p>
      )}
    </div>
  );
};

export default DashboardScreen;