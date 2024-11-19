//client/src/pages/EXpense.js
import React, { useState, useEffect } from 'react';
import swal from "sweetalert";
import '../styles/ExpenseTracker.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css";

const ExpenseTrackerApp = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [formData, setFormData] = useState({ title: "", amount: "", transaction: "transaction" });
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);  // Control modal visibility

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(date);
  };

  useEffect(() => {
    let income = 0, expense = 0;
    transactions.forEach((transaction) => {
      transaction.transaction === "cr" ? (income += Number(transaction.amount)) : (expense += Number(transaction.amount));
    });
    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
  }, [transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, transaction } = formData;
  
    // Validation checks
    if (!title || !amount || transaction === "transaction") {
      swal("Error", "Please fill all fields", "error");
      return;
    }
  
    // Create new transaction object
    const newTransaction = { title, amount: Number(amount), transaction, date: new Date().toISOString() };
  
    // Add or update the transaction
    if (editingIndex !== null) {
      const updatedTransactions = [...transactions];
      updatedTransactions[editingIndex] = newTransaction;
      setTransactions(updatedTransactions);
      setEditingIndex(null);
    } else {
      setTransactions([...transactions, newTransaction]);
    }
  
    // Display success message
    swal("Success", "Transaction Saved!", "success");
  
    // Clear the form data
    setFormData({ title: "", amount: "", transaction: "transaction" });
  
    // Close the modal
    setModalVisible(false); // Use state to control modal visibility
  };
  
  const handleDelete = (index) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this transaction!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const updatedTransactions = transactions.filter((_, i) => i !== index);
        setTransactions(updatedTransactions);
        swal("Deleted!", "Transaction has been removed.", "success");
      }
    });
  };

  const handleEdit = (index) => {
    const transaction = transactions[index];
    setFormData({ title: transaction.title, amount: transaction.amount, transaction: transaction.transaction });
    setEditingIndex(index);
    setModalVisible(true); // Show modal on edit
  };

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <>
      <div className="container">
        <div className="banner">
          <video autoPlay loop muted className="background-video">
            <source src="TrackerApp.mp4" type="video/mp4" />
          </video>
        </div>

        <h1 className="text-center mt-5 text-white">ExpenseTrackerApp</h1>
        <h2 className="text-center mt-5 text-white">Your Balance</h2>
        <h3 className="text-center mt-5 balance text-white" style={{ color: balance < 0 ? 'red' : 'green' }}>
          ₹{balance}
        </h3>
        <hr />

        <div className="d-flex flex-column align-items-center">
          <div className="w-50 d-flex justify-content-between align-items-center">
            <h2 className="text-white">Income</h2>
            <h2 className="text-white">Expense</h2>
          </div>
          <div className="w-50 d-flex justify-content-between align-items-center">
            <h2 className="text-success income">₹{totalIncome}</h2>
            <h2 className="text-danger expense">₹{totalExpense}</h2>
          </div>
        </div>
        <hr />
      </div>

      <h2 className="text-center text-white">History</h2>
      <h2 className="text-center text-white">Add New Transaction</h2>
      <div className="table-responsive">
        <table className="table table-striped table-dark text-center table-large-font">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Transaction</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>₹{item.amount}</td>
                <td>{item.transaction}</td>
                <td>{formatDate(item.date)}</td>
                <td>
                  <button onClick={() => handleEdit(index)} className="btn edit-btn text-success">
                    <i className="fa fa-pen"></i>
                  </button>
                  <button onClick={() => handleDelete(index)} className="btn del-btn text-danger">
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Button to Open Modal */}
      <button
        className="btn modal-btn bg-primary text-white rounded-circle position-fixed end-0 bottom-0"
        style={{ margin: "60px" }}
        onClick={() => setModalVisible(true)} // Open modal on click
      >
        <i className="fa fa-plus"></i>
      </button>

      {/* Modal Dialog - Controlled by modalVisible state */}
      {modalVisible && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title text-white">Add Your Transaction</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalVisible(false)} // Close modal
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <select
                    className="form-select mb-3"
                    value={formData.transaction}
                    onChange={(e) => setFormData({ ...formData, transaction: e.target.value })}
                  >
                    <option value="transaction" hidden>Transaction</option>
                    <option value="cr">Cr</option>
                    <option value="dr">Dr</option>
                  </select>
                  <input
                    required
                    type="text"
                    placeholder="Title"
                    className="form-control mb-3"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  <input
                    required
                    type="text"
                    placeholder="Amount"
                    className="form-control mb-3"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                  <button type="submit" className="btn btn-primary text-white w-100">
                    {editingIndex !== null ? "Update" : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseTrackerApp;
