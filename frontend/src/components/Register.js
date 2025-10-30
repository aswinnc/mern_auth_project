import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Register failed');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={submit} className="register-form">
        <h2>Create Account</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option>User</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>
        </div>

        <button type="submit">Register</button>

        <p className="login-redirect">
          Already have an account?{' '}
          <span onClick={() => navigate('/')} className="link-text">
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
