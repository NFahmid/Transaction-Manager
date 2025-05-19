import {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import AppBar from "./component/appbar.js";
import TransactionForm from "./component/TransactionForm.js";
import './index.css';
import Table from "./component/Table.js";

function App() {
  const InitialForm = {
    amount: "",
    description: "",
    date: "",
  };

  const [form, setForm] = useState(InitialForm);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }
  , []);

  async function fetchTransactions() {
    const response = await fetch("http://localhost:4000/transactions");
    if (response.ok) {
      const data = await response.json();
      setTransactions(data);
    } else {
      console.error("Error fetching transactions");
    }
  }
  
  async function handleDelete(id) {
    const response = await fetch(`http://localhost:4000/transactions/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Transaction deleted successfully");
      fetchTransactions();
    } else {
      console.error("Error deleting transaction");
    }
  }

  return (
    <div className="App">
      <AppBar />

      <TransactionForm fetchTransactions={fetchTransactions} />

      <br />

      <Table transactions={transactions} onDelete={handleDelete} />
    </div>

    
  );
}

export default App;
