import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'CLIENT',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register({
        ...form,
        phone: form.phone || undefined,
      });
      navigate(form.role === 'AGENT' ? '/dashboard' : '/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-container" id="main-content">
      <div className="form-card" role="region" aria-labelledby="register-title">
        <h1 id="register-title" style={{ marginTop: 0, marginBottom: '1.5rem', textAlign: 'center' }}>
          Inscription
        </h1>

        {error && (
          <div className="alert alert-error" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-input"
              value={form.firstName}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-input"
              value={form.lastName}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={6}
              required
              aria-required="true"
              aria-describedby="password-hint"
            />
            <small id="password-hint" style={{ color: '#666' }}>Minimum 6 caractères</small>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Téléphone (optionnel)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-input"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Type de compte</label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
            >
              <option value="CLIENT">Client — acheter ou louer</option>
              <option value="AGENT">Agent immobilier</option>
            </select>
          </div>

          {form.role === 'AGENT' && (
            <div className="alert alert-info" role="note">
              Après inscription, complétez votre profil agent depuis le tableau de bord.
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? 'Inscription…' : 'Créer mon compte'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0, color: '#666' }}>
          Déjà inscrit ?{' '}
          <Link to="/login" style={{ color: '#667eea' }}>Se connecter</Link>
        </p>
      </div>
    </main>
  );
};
