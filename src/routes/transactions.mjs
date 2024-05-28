// src/routes/transactions.mjs
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const transactionsFilePath = path.join(__dirname, '../data/transactions.json');

// Load transactions from file
const loadTransactions = () => {
  try {
    const data = fs.readFileSync(transactionsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading transactions:', error);
    return [];
  }
};

// Save transactions to file
const saveTransactions = (transactions) => {
  try {
    fs.writeFileSync(transactionsFilePath, JSON.stringify(transactions, null, 2));
  } catch (error) {
    console.error('Error writing transactions:', error);
  }
};

// Endpoint to fetch transactions for a specific user
router.get('/:email', (req, res) => {
  try {
    const transactions = loadTransactions();
    const userTransactions = transactions.find(t => t.email === req.params.email);
    res.status(200).json(userTransactions ? userTransactions.transactions : []);
  } catch (error) {
    console.error('Error reading transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to save a new transaction
router.post('/', (req, res) => {
  const { email, sender, recipient, amount, timestamp } = req.body;
  const transactions = loadTransactions();
  const userTransactions = transactions.find(t => t.email === email);

  const newTransaction = { sender, recipient, amount, timestamp };

  if (userTransactions) {
    userTransactions.transactions.push(newTransaction);
  } else {
    transactions.push({ email, transactions: [newTransaction] });
  }

  saveTransactions(transactions);
  res.status(201).json({ message: 'Transaction saved successfully' });
});

export default router;