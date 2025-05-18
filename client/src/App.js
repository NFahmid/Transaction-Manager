import {useState} from "react";

function App() {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
  });

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
    console.log("Response:", response);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="number" name="amount" onChange={handleInput} placeholder="Enter transaction amount" />
        <input type="text" name="description" onChange={handleInput} placeholder="Enter transaction description" />
        <input type="date" name="date" onChange={handleInput} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
