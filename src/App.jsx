import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Select,
  Card,
  Typography,
  Space,
} from "antd";

function App() {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  // 💾 localStorage load
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // ✏️ edit state
  const [editId, setEditId] = useState(null);

  // ✍️ input handlers
  function handleExpenseChange(e) {
    setExpense(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  // ➕ add / update expense
  function addExpense() {
    if (!expense || !amount || !category) return;

    if (editId !== null) {
      // ✏️ UPDATE MODE
      setExpenses(
        expenses.map((item) =>
          item.id === editId
            ? {
                ...item,
                expense,
                amount: Number(amount),
                category,
              }
            : item
        )
      );

      setEditId(null);
    } else {
      // ➕ ADD MODE
      const newExpense = {
        id: Date.now(),
        expense,
        amount: Number(amount),
        category,
      };

      setExpenses([...expenses, newExpense]);
    }

    // 🔄 reset inputs
    setExpense("");
    setAmount("");
    setCategory("");
  }

  // ❌ delete expense
  function deleteExpense(id) {
    setExpenses(
      expenses.filter((item) => item.id !== id)
    );
  }

  // ✏️ edit expense
  function editExpense(item) {
    setExpense(item.expense);
    setAmount(item.amount);
    setCategory(item.category);
    setEditId(item.id);
  }

  // 💾 save localStorage
  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  // 💰 total expense
  const totalExpense = expenses.reduce(
    (total, item) => total + item.amount,
    0
  );

  // 📊 category totals
  const foodTotal = expenses
    .filter((item) => item.category === "Food")
    .reduce((total, item) => total + item.amount, 0);

  const travelTotal = expenses
    .filter((item) => item.category === "Travel")
    .reduce((total, item) => total + item.amount, 0);

  const billsTotal = expenses
    .filter((item) => item.category === "Bills")
    .reduce((total, item) => total + item.amount, 0);

  const shoppingTotal = expenses
    .filter((item) => item.category === "Shopping")
    .reduce((total, item) => total + item.amount, 0);

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        padding: "20px",
        color: "black",
      }}
    >
      {/* TITLE */}
      <Typography.Title>
        Expense Tracker
      </Typography.Title>

      {/* INPUT SECTION */}
      <Space
        direction="vertical"
        style={{ width: "300px" }}
      >
        <Input
          value={expense}
          onChange={handleExpenseChange}
          placeholder="Expense name"
        />

        <Input
          value={amount}
          onChange={handleAmountChange}
          placeholder="Amount"
        />

        <Select
          value={category}
          onChange={(value) => setCategory(value)}
          placeholder="Select Category"
          options={[
            { value: "Food", label: "Food" },
            { value: "Travel", label: "Travel" },
            { value: "Bills", label: "Bills" },
            { value: "Shopping", label: "Shopping" },
          ]}
        />

        <Button type="primary" onClick={addExpense}>
          {editId !== null
            ? "Update Expense"
            : "Add Expense"}
        </Button>
      </Space>

      {/* TOTALS */}
      <div style={{ marginTop: "20px" }}>
        <Typography.Title level={4}>
          Total Expense: Rs. {totalExpense}
        </Typography.Title>

        <p>🍔 Food Total: Rs. {foodTotal}</p>
        <p>✈️ Travel Total: Rs. {travelTotal}</p>
        <p>💡 Bills Total: Rs. {billsTotal}</p>
        <p>🛍️ Shopping Total: Rs. {shoppingTotal}</p>
      </div>

      {/* EXPENSE LIST */}
      <div style={{ marginTop: "20px" }}>
        {expenses.map((item) => (
          <Card
            key={item.id}
            style={{ marginTop: "10px" }}
          >
            <p>
              <strong>Expense:</strong>{" "}
              {item.expense}
            </p>

            <p>
              <strong>Amount:</strong> Rs.{" "}
              {item.amount}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {item.category}
            </p>

            <Space>
              <Button
                onClick={() => editExpense(item)}
              >
                Edit
              </Button>

              <Button
                danger
                onClick={() =>
                  deleteExpense(item.id)
                }
              >
                Delete
              </Button>
            </Space>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;