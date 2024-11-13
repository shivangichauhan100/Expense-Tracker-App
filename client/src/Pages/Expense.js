//client/src/Pages/EXpense.js
import React, { useState, useEffect } from "react";
import "./ExpenseTracker.css";

const Expense = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (savedTransactions) {
      setTransactions(savedTransactions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (text.trim() === "" || amount.trim() === "") {
      alert("Please add text and amount");
      return;
    }
    const newTransaction = {
      id: Math.floor(Math.random() * 1000000000),
      text,
      amount: +amount,
    };
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    setText("");
    setAmount("");
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all transaction history?")) {
      setTransactions([]);
    }
  };

  const income = transactions.filter((transaction) => transaction.amount > 0);
  const expense = transactions.filter((transaction) => transaction.amount < 0);

  const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
  const incomeAmount = income.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
  const expenseAmount = Math.abs(expense.reduce((acc, transaction) => acc + transaction.amount, 0)).toFixed(2);

  return (
    <div className="container">
      <h1>Personal Expense Tracker App</h1>

      <div className="inc-exp-container">
        <div>
          <h4>Your Balance</h4>
          <h1>&#8377;{total}</h1>
        </div>
      </div>

      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money money-plus">+&#8377;{incomeAmount}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money money-minus">-&#8377;{expenseAmount}</p>
        </div>
      </div>

      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className={transaction.amount < 0 ? "minus" : "plus"}>
            {transaction.text} <span>{transaction.amount < 0 ? "-" : "+"}&#8377;{Math.abs(transaction.amount)}</span>
            <button className="delete-btn" onClick={() => handleDeleteTransaction(transaction.id)}>x</button>
          </li>
        ))}
      </ul>

      <h4>Add New Amount</h4>
      <form onSubmit={handleAddTransaction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter description..."
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount <br /> (negative - expense, positive - income)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            required
          />
        </div>
        <button type="submit" className="btn">Add Amount</button>
        <button type="button" className="btn" onClick={handleClearHistory}>Clear History</button>
      </form>
    </div>
  );
};

export default Expense;
