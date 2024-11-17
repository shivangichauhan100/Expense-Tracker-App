// client/src/App.js
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import LandingPage from './components/LandPage';
import LoginSignup from './components/LoginSignup';
import Expense from './Pages/Expense' ;// Corrected import path

// Context
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/ExpenseTracker' element={<Expense />} />
        </Routes>
        <Toaster />
      </Router>
    </GlobalProvider>
  );
}

export default App;
