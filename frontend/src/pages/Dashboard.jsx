import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardApi } from '../api/client';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await dashboardApi.get('/');
        setDashboard(response.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load dashboard.');
        if (requestError.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      }
    };

    loadDashboard();
  }, [navigate]);

  if (error) {
    return <p className="status error center-text">{error}</p>;
  }

  if (!dashboard) {
    return <p className="center-text">Loading dashboard...</p>;
  }

  const registrationDate = new Date(dashboard.registrationDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <p className="eyebrow">Protected route</p>
        <h1>{dashboard.message}</h1>
      </div>

      <div className="stats-grid">
        <article className="info-card">
          <span>User Name</span>
          <strong>{dashboard.userName}</strong>
        </article>
        <article className="info-card">
          <span>Email</span>
          <strong>{dashboard.email}</strong>
        </article>
        <article className="info-card">
          <span>Registration Date</span>
          <strong>{registrationDate}</strong>
        </article>
      </div>

      <div className="activity-panel">
        <h2>Internship Summary</h2>
        <p>
          Your profile is active. This page is served by the dashboard microservice after
          verifying the JWT issued by the authentication microservice.
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
