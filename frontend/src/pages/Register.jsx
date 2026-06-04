import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/client';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await authApi.post('/register', form);
      setStatus({ type: 'success', message: 'Account created. Redirecting to login...' });
      setTimeout(() => navigate('/login'), 800);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Registration failed.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="intro-panel">
        <p className="eyebrow">Student access</p>
        <h1>Create your internship profile</h1>
        <p>
          Register once, then use your secure account to access internship dashboard services.
        </p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>
          Full Name
          <input name="fullName" value={form.fullName} onChange={updateField} required />
        </label>
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
            minLength="6"
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={updateField}
            minLength="6"
            required
          />
        </label>
        {status.message && <p className={`status ${status.type}`}>{status.message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
        <p className="switch-text">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
