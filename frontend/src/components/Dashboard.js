import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; 

export default function Dashboard() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios
      .get('http://localhost:5000/api/auth/me', { headers: { 'x-auth-token': token } })
      .then((res) => setMe(res.data))
      .catch((err) => console.error(err));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!me)
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Dashboard</h2>
        <p className="welcome-text">
          Welcome, <span className="highlight">{me.name}</span> ({me.role})
        </p>

        <div className="role-panel">
          {me.role === 'Admin' && <div className="panel admin">Admin Panel</div>}
          {me.role === 'Manager' && <div className="panel manager">Manager Panel</div>}
          {me.role === 'User' && <div className="panel user">User Panel</div>}
        </div>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}
