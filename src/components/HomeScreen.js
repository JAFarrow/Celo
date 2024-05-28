// src/components/HomeScreen.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomeScreen() {
  return (
    <div className="home-screen">
      <h1>Welcome to Our App</h1>
      <p>This is the home page of our application.</p>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
    </div>
  );
}

export default HomeScreen;