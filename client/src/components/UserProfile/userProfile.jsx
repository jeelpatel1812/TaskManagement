import React, { useState } from 'react';
import './userProfile.css';
import api from '../../api'; 
import  { Navigate } from 'react-router-dom'

const UserProfile = () => {
  const email = JSON.parse(localStorage.getItem('user'));
  const organization = 'ADD VERB';
  const DOB = '2001-12-18';
  const createdAt = JSON.parse(localStorage.getItem('createdAt'));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  if (loading) return <p>Loading...</p>;

  return (
    <div className="login-container">
      <h2>Profile</h2>
      <div >
      <img style={{height:'80px', width:'160px', display: 'block', margin:'auto'}} src='https://www.svgrepo.com/show/404545/avatar-man-profile-user-3.svg'></img>
      </div>
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={()=>{}}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Organization:</label>
          <input
            type="text"
            value={organization}
          />
        </div>
        <div className="form-group">
          <label>DOB:</label>
          <input
            type="text"
            value={DOB}
          />
        </div>
        <div className="form-group">
          <label>Created At:</label>
          <input
            type="text"
            value={createdAt.substring(0,10)}
          />
        </div>

      </form>
    </div>
  );
};

export default UserProfile;
