
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import LandingPage from './components/LandPage';
import LoginSignup from './components/LoginSignup';

 

// Expense Tracker Pages
import Balance from './Pages/Balance';
import IncomeExpenses from './Pages/IncomeExpenses';
import TransactionList from './Pages/TransactionList';
import AddTransaction from './Pages/AddTransaction';
import { Header } from './Pages/Header';

//// Expense Tracker Pages css
import './styles/ExpenseTracker.css';


// Context
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/expense-tracker/header' element={<Header/>} />
          <Route path='/expense-tracker/balance' element={<Balance />} />
          <Route path='/expense-tracker/income-expenses' element={<IncomeExpenses />} />
          <Route path='/expense-tracker/transactions' element={<TransactionList />} />
          <Route path='/expense-tracker/add' element={<AddTransaction />} />
          {/* You can add more routes here for additional features */}
        </Routes>
        <Toaster />
      </Router>
    </GlobalProvider>
  );
}

export default App;
