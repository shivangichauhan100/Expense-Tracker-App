import React, { useState, useEffect } from 'react';
import swal from "sweetalert";
import '../styles/ExpenseTracker.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css";


const ExpenseTrackerApp = () => {
  const [transactions, setTransactions] = useState(() => {
    // Load transactions from localStorage
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    transaction: "transaction",
  });
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  // Format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { dateStyle: "medium", timeStyle: "short" };
    return new Intl.DateTimeFormat("en-IN", options).format(date);
  };

  // Calculate totals and balance
  useEffect(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.transaction === "cr") income += Number(transaction.amount);
      if (transaction.transaction === "dr") expense += Number(transaction.amount);
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
  }, [transactions]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, transaction } = formData;

    if (!title || !amount || transaction === "transaction") {
      swal("Error", "Please fill all fields", "error");
      return;
    }

    const newTransaction = {
      title,
      amount: Number(amount),
      transaction,
      date: new Date().toISOString(),
    };

    if (editingIndex !== null) {
      const updatedTransactions = [...transactions];
      updatedTransactions[editingIndex] = newTransaction;
      setTransactions(updatedTransactions);
      setEditingIndex(null);
    } else {
      setTransactions([...transactions, newTransaction]);
    }

    swal("Success", "Transaction Saved!", "success");
    setFormData({ title: "", amount: "", transaction: "transaction" });
    document.querySelector(".btn-close").click();
  };

  // Handle deletion
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

  // Handle edit
  const handleEdit = (index) => {
    const transaction = transactions[index];
    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      transaction: transaction.transaction,
    });
    setEditingIndex(index);
    document.querySelector(".modal-btn").click();
  };

  // Sync transactions to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div className="container">
      {/* Background Video */}
      <div className="banner">
        <video autoPlay loop muted className="background-video">
          <source src="TrackerApp.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Header */}
      <h1 className="text-center mt-5 text-white">ExpenseTrackerApp</h1>
      <h2 className="text-center mt-5 text-white">Your Balance</h2>
      <h3
        className={`text-center mt-5 text-white balance ${
          balance < 0 ? "text-danger" : "text-success"
        }`}
      >
        ₹{balance}
      </h3>
      <hr />

      {/* Income and Expense */}
      <div className="d-flex flex-column align-items-center">
        <div className="w-50 d-flex justify-content-between align-items-center">
          <h2 className="text-white">Income</h2>
          <h2 className="text-white">Expense</h2>
        </div>
        <div className="w-50 d-flex justify-content-between align-items-center">
          <h2 className="text-success">₹{totalIncome}</h2>
          <h2 className="text-danger">₹{totalExpense}</h2>
        </div>
        <hr />

        {/* Transaction History */}
        <h2 className="text-white">History</h2>
        <div className="w-75 mt-3 table-responsive">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th className="text-white">Title</th>
                <th className="text-white">Amount</th>
                <th className="text-white">Transaction</th>
                <th className="text-white">Date</th>
                <th className="text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => (
                <tr key={index}>
                  <td className="text-nowrap">{item.title}</td>
                  <td className="text-nowrap">₹{item.amount}</td>
                  <td className="text-nowrap">{item.transaction}</td>
                  <td className="text-nowrap">{formatDate(item.date)}</td>
                  <td className="text-nowrap">
                    <button
                      onClick={() => handleEdit(index)}
                      className="btn edit-btn text-success"
                    >
                      <i className="fa fa-pen"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="btn del-btn text-danger"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <button
        className="btn modal-btn bg-primary text-white rounded-circle position-fixed end-0 bottom-0"
        style={{ margin: "60px" }}
        data-bs-toggle="modal"
        data-bs-target="#transactionModal"
      >
        <i className="fa fa-plus"></i>
      </button>

      <div className="modal" id="transactionModal">
        <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title text-white">Add Your Transaction</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <select
                  className="form-select mb-3"
                  value={formData.transaction}
                  onChange={(e) =>
                    setFormData({ ...formData, transaction: e.target.value })
                  }
                >
                  <option value="transaction" hidden>
                    Transaction
                  </option>
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
    </div>
  );
};

export default ExpenseTrackerApp;
