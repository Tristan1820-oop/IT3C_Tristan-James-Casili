import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18
import App from './App.jsx'; // Your main App component
import reportWebVitals from './reportWebVitals'; // Performance logging
import './index.css'; // Global styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(console.log); // Log performance metrics