import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Adjust the path if App.js is in a different location
import './index.css';
 // This assumes the file is named index.css and is located in src


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
