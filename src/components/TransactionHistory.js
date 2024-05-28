// src/components/TransactionHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/TransactionHistory.css';

const TransactionHistory = ({ email }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/transactions/${email}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };

    fetchTransactions();
  }, [email]);

  return (
    <div>
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Amount</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.sender}</td>
              <td>{transaction.recipient}</td>
              <td>{transaction.amount}</td>
              <td>{new Date(transaction.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;