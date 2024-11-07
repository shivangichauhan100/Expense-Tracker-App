import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'; // Make sure this path is correct

// Initial state
const initialState = {
  transactions: []
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions (example)
  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      deleteTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
