import { Router } from "express";
import Transaction from "../models/transaction.js";

const router = Router();

router.get('/', async (req, res) => {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    if (!transactions) {
        return res.status(404).json({ message: 'No transactions found' });
    }
    res.json(transactions);
}); 

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;