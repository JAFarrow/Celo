import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles.css';  // Import the styles.css
import App from './App.js'; // Add .js extension
import Header from './components/header.jsx';
import reportWebVitals from './reportWebVitals.js'; // Add .js extension

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />;
    <App />;
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
