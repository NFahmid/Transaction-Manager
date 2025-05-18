import {useState, useEffect} from "react";

function App() {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
  });

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
      console.log("Transaction submitted successfully");
    } else {
      console.error("Error submitting transaction");
    }
    setForm({
      amount: "",
      description: "",
      date: "",
    });
    fetchTransactions();
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="number" name="amount" onChange={handleInput} placeholder="Enter transaction amount" />
        <input type="text" name="description" onChange={handleInput} placeholder="Enter transaction description" />
        <input type="date" name="date" onChange={handleInput} />
        <button type="submit">Submit</button>
      </form>

      <br />

      <section>
        <table>
          <thead>
            <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>

    
  );
}

export default App;
