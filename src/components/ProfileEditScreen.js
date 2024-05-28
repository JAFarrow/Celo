// src/components/ProfileEditScreen.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ProfileEditScreen = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [walletAddress, setWalletAddress] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/update-profile', {
        email: user.email,
        walletAddress,
        newPassword,
      });
      alert(response.data.message);
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileEditScreen;
