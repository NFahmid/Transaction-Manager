import express from 'express';
import connect from './database/mongodb.js';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import TransactionRouter from './route/transactions.js';

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/transactions', TransactionRouter);

await connect();

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});