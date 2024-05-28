// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { newKit } = require('@celo/contractkit');
const Web3 = require('web3');
require('dotenv').config();
const { addTransaction } = require('./transactionHistory.js');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

// Celo Payment Function
const kit = newKit('https://alfajores-forno.celo-testnet.org');
const web3 = new Web3(kit.web3.currentProvider);

app.post('/pay-rent', async (req, res) => {
  const { recipientAddress, amount, userPrivateKey, email } = req.body;

  try {
    kit.addAccount(userPrivateKey);
    const stableToken = await kit.contracts.getStableToken();
    const tx = await stableToken
      .transfer(recipientAddress, web3.utils.toWei(amount.toString(), 'ether'))
      .send({ from: kit.defaultAccount });
    const receipt = await tx.waitReceipt();

    // Add transaction to history
    addTransaction(email, kit.defaultAccount, recipientAddress, amount, new Date().toISOString());

    res.status(200).send({ message: 'Payment successful', receipt });
  } catch (error) {
    res.status(500).send({ message: 'Payment failed', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});