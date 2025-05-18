import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import Transaction from './models/transaction.js';

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://mernstack123:mernstack123@cluster0.gxdpecz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/transactions', async (req, res) => {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    if (!transactions) {
        return res.status(404).json({ message: 'No transactions found' });
    }
    res.json(transactions);
}); 

app.post('/transactions', async (req, res) => {
    const { amount, description, date } = req.body;
    const transaction = new Transaction({
        amount,
        description,
        date: date ? new Date(date) : new Date(),
    });
    try {
        await transaction.save();
        res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    console.log('Transaction created:', transaction);
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});