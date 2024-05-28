// transactionHistory.js
const fs = require('fs');
const path = require('path');

const transactionsFilePath = path.join(__dirname, 'transactions.json');

const loadTransactions = () => {
  try {
    const data = fs.readFileSync(transactionsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading transactions:', error);
    return [];
  }
};

const saveTransactions = (transactions) => {
  try {
    fs.writeFileSync(transactionsFilePath, JSON.stringify(transactions, null, 2));
  } catch (error) {
    console.error('Error writing transactions:', error);
  }
};

const addTransaction = (email, sender, recipient, amount, timestamp) => {
  const transactions = loadTransactions();
  const userTransactions = transactions.find(t => t.email === email) || { email, transactions: [] };
  userTransactions.transactions.push({ sender, recipient, amount, timestamp });

  if (!transactions.find(t => t.email === email)) {
    transactions.push(userTransactions);
  }

  saveTransactions(transactions);
};

module.exports = { addTransaction };