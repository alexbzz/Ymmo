import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAgentStats } from '../hooks/useAgentStats';
import { agentsAPI } from '../services/api';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { PropertyCard } from '../components/properties/PropertyCard';

export const AgentDashboard = () => {
  const { data, loading, error, refetch } = useAgentStats();
  const [profileForm, setProfileForm] = useState({
    licenseNumber: '',
    agencyName: '',
    bio: '',
  });
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const needsProfile = error && (error.includes('introuvable') || error.includes('Profil'));

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setSubmitting(true);
    try {
      await agentsAPI.register({
        ...profileForm,
        bio: profileForm.bio || undefined,
      });
      setProfileSuccess('Profil agent créé avec succès.');
      refetch();
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner label="Chargement du tableau de bord…" />;

  if (needsProfile) {
    return (
      <main className="page-container" id="main-content">
        <h1 style={{ marginTop: 0 }}>Tableau de bord agent</h1>
        <div className="form-card" style={{ maxWidth: 560 }}>
          <h2 style={{ marginTop: 0 }}>Compléter votre profil agent</h2>
          <p style={{ color: '#666' }}>
            Avant de publier des biens, renseignez vos informations professionnelles.
          </p>

          {profileError && <div className="alert alert-error" role="alert">{profileError}</div>}
          {profileSuccess && <div className="alert alert-success" role="status">{profileSuccess}</div>}

          <form onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="licenseNumber">Numéro de licence</label>
              <input
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                className="form-input"
                value={profileForm.licenseNumber}
                onChange={handleProfileChange}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="agencyName">Nom de l'agence</label>
              <input
                id="agencyName"
                name="agencyName"
                type="text"
                className="form-input"
                value={profileForm.agencyName}
                onChange={handleProfileChange}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio (optionnel)</label>
              <textarea
                id="bio"
                name="bio"
                className="form-input"
                rows={4}
                value={profileForm.bio}
                onChange={handleProfileChange}
                style={{ resize: 'vertical' }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
              {submitting ? 'Enregistrement…' : 'Créer mon profil agent'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container" id="main-content">
        <div className="alert alert-error" role="alert">{error}</div>
      </main>
    );
  }

  const { agent, stats } = data;
  const properties = agent?.properties || [];

  return (
    <main className="page-container" id="main-content">
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem' }}>Tableau de bord agent</h1>
        <p style={{ color: '#666', margin: 0 }}>
          {agent.agencyName} — Licence {agent.licenseNumber}
        </p>
      </header>

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Statistiques</h2>
        <div className="dashboard-stats" role="list">
          {[
            { label: 'Biens publiés', value: stats.totalProperties },
            { label: 'Disponibles', value: stats.availableProperties },
            { label: 'Vendus', value: stats.soldProperties },
            { label: 'Offres reçues', value: stats.totalTransactions },
            { label: 'Offres en attente', value: stats.pendingTransactions },
          ].map((item) => (
            <div key={item.label} className="stat-box" role="listitem">
              <strong aria-label={`${item.value} ${item.label}`}>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="properties-heading">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 id="properties-heading" style={{ margin: 0 }}>Mes biens</h2>
          <Link to="/properties" className="btn btn-primary">
            Voir le catalogue
          </Link>
        </div>

        {properties.length === 0 ? (
          <p role="status" style={{ color: '#666' }}>
            Vous n'avez pas encore publié de biens.
          </p>
        ) : (
          <div className="properties-grid" role="list">
            {properties.map((property) => (
              <div key={property.id} role="listitem">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
