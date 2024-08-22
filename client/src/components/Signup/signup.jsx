import React, { useState } from 'react';
import './signup.css';
import api from '../../api'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await  api.post('/user/signup',{
            email,
            password,
            name
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
  };

  if (loading) return <p>Loading...</p>;
  

  return (
    <div className="login-container">
      <h2>Register</h2>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
