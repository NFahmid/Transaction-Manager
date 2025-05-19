import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const todaysDate = new Date().toISOString().split("T")[0];

const InitialForm = {
    amount: "",
    description: "",
    date: todaysDate,
  };

export default function TransactionForm({ fetchTransactions}) {
  const [form, setForm] = React.useState(InitialForm);
  const [transactions, setTransactions] = React.useState([]); 

    React.useEffect(() => {
        fetchTransactions();
        }, []);

    async function fetchTransactions() {
        const response = await fetch("http://localhost:4000/transactions");
        if (response.ok) {
            const data = await response.json();
            setTransactions(data);
        } else {
            console.error("Error fetching transactions");
        }
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:4000/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            console.log("Transaction created successfully");
            fetchTransactions();
            setForm(InitialForm);
        } else {
            console.error("Error creating transaction");
        }
    }

    async function handleDelete(id) {
        const response = await fetch(`http://localhost:4000/transactions/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            console.log("Transaction deleted successfully");
        } else {
            console.error("Error deleting transaction");
        }
        fetchTransactions();
    }

    const handleReset = () => {
        setForm(InitialForm);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    }

    const handleDateChange = (event) => {
        const { value } = event.target;
        setForm({
            ...form,
            date: value,
        });
    }

    const handleAmountChange = (event) => {
        const { value } = event.target;
        setForm({
            ...form,
            amount: value,
        });
    }

    const handleDescriptionChange = (event) => {
        const { value } = event.target;
        setForm({
            ...form,
            description: value,
        });
    }

    const handleDateInput = (event) => {
        const { value } = event.target;
        setForm({
            ...form,
            date: value,
        });
    }

  return (
    <Card sx={{ minWidth: 275 , marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CardContent>
        <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Add new transaction
        </Typography>
          <form>
            <TextField
              label="Amount"
              name="amount"
              value={form.amount}
              onChange={handleInput}
              variant="outlined"
              style={{ marginBottom: 20, marginRight: 5, height: 50, width: 200 }}
            />
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleInput}
              variant="outlined"
              style={{ marginLeft: 5, marginRight: 5, marginBottom: 5 }}
            />
            <TextField
              type="date"
              label="Date"
              name="date"
              value={form.date}
              onChange={handleInput}
              variant="outlined"
              style={{ marginLeft: 5, marginRight: 5, marginBottom: 5 }}
            />
            
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: 10 }}>
              Submit
            </Button>
          </form>

      </CardContent>
    </Card>
  );
}
