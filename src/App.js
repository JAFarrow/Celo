// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen.js';
import RegisterScreen from './components/RegisterScreen.js';
import DashboardScreen from './components/DashboardScreen.js';
import ProfileEditScreen from './components/ProfileEditScreen.js';
import HomeScreen from './components/HomeScreen.js'; // Assuming HomeScreen component exists


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/profile/edit" element={<ProfileEditScreen />} />

      </Routes>
    </Router>
  );
}

export default App;
