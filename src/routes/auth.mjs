// src/routes/auth.mjs
import express from 'express';
import bcrypt from 'bcrypt';
import { getUsers, saveUser } from '../data.mjs';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = { email, password: hashedPassword };

  saveUser(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful', user });
});

router.post('/pay-rent', async (req, res) => {

  // Save transaction details to database
  const { recipientAddress, amount, user } = req.body;
  const transaction = new Transaction({
    sender: user.email,
    recipient: recipientAddress,
    amount,
    timestamp: new Date(),
  });
  await transaction.save();

  res.status(200).json({ message: 'Payment Successful', transaction });
});

export default router;