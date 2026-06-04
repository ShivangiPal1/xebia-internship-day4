import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/client';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await authApi.post('/login', form);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="intro-panel">
        <p className="eyebrow">Secure dashboard</p>
        <h1>Manage your internship journey</h1>
        <p>
          Login with your registered email to view profile details served by the dashboard
          microservice.
        </p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={updateField} required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={updateField}
            required
          />
        </label>
        {status && <p className="status error">{status}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Checking credentials...' : 'Login'}
        </button>
        <p className="switch-text">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
