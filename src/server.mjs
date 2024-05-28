// src/server.mjs
import express from 'express';
import authRoutes from './routes/auth.mjs';
import transactionsRoutes from './routes/transactions.mjs';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Create users.json if it doesn't exist
const dataFilePath = path.join(__dirname, 'data/users.json');
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/transactions', transactionsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});