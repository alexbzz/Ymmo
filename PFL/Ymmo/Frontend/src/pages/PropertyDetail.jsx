import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperty } from '../hooks/useProperty';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { transactionsAPI } from '../services/api';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { formatPrice, formatType, formatStatus } from '../utils/formatters';

export const PropertyDetail = () => {
  const { id } = useParams();
  const { property, loading, error } = useProperty(id);
  const { user } = useAuth();
  const { favoriteIds, toggleFavorite } = useFavorites(!!user);
  const [offerPrice, setOfferPrice] = useState('');
  const [offerError, setOfferError] = useState('');
  const [offerSuccess, setOfferSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleFavorite = async () => {
    if (!user) return;
    try {
      await toggleFavorite(id);
    } catch (err) {
      setOfferError(err.message);
    }
  };

  const handleOffer = async (e) => {
    e.preventDefault();
    setOfferError('');
    setOfferSuccess('');
    setSubmitting(true);
    try {
      await transactionsAPI.create({ propertyId: id, offerPrice: Number(offerPrice) });
      setOfferSuccess('Votre offre a été envoyée avec succès.');
      setOfferPrice('');
    } catch (err) {
      setOfferError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner label="Chargement du bien…" />;

  if (error || !property) {
    return (
      <main className="page-container" id="main-content">
        <div className="alert alert-error" role="alert">
          {error || 'Bien introuvable.'}
        </div>
        <Link to="/properties" className="btn btn-outline">Retour aux propriétés</Link>
      </main>
    );
  }

  const isFavorite = favoriteIds.has(property.id);
  const canOffer = user?.role === 'CLIENT' && property.status === 'AVAILABLE';
  const agentName = property.agent?.user
    ? `${property.agent.user.firstName} ${property.agent.user.lastName || ''}`.trim()
    : 'Non renseigné';

  return (
    <main className="page-container" id="main-content">
      <nav aria-label="Fil d'Ariane" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <Link to="/properties" style={{ color: '#667eea' }}>Propriétés</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{property.title}</span>
      </nav>

      <article aria-labelledby="property-title">
        <header style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start' }}>
            <div>
              <h1 id="property-title" style={{ margin: '0 0 0.5rem' }}>{property.title}</h1>
              <p style={{ color: '#666', margin: 0 }}>
                {property.address}, {property.city} {property.postalCode}
              </p>
            </div>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#e74c3c', margin: 0 }}>
              {formatPrice(property.price)}
            </p>
          </div>
        </header>

        {property.photos?.length > 0 ? (
          <section className="detail-gallery" aria-label="Photos du bien">
            {property.photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.url}
                alt={`Photo de ${property.title}`}
                loading="lazy"
              />
            ))}
          </section>
        ) : (
          <div
            style={{ background: '#eee', height: 300, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: '#666' }}
            role="img"
            aria-label="Aucune photo disponible"
          >
            Aucune photo disponible
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <section aria-labelledby="details-heading">
            <h2 id="details-heading" style={{ marginTop: 0 }}>Caractéristiques</h2>
            <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.5rem 1.5rem' }}>
              <dt>Type</dt><dd>{formatType(property.type)}</dd>
              <dt>Statut</dt><dd>{formatStatus(property.status)}</dd>
              <dt>Surface</dt><dd>{property.surface} m²</dd>
              <dt>Pièces</dt><dd>{property.rooms}</dd>
              <dt>Agent</dt><dd>{agentName}</dd>
            </dl>
            <h3 style={{ marginTop: '1.5rem' }}>Description</h3>
            <p style={{ lineHeight: 1.6, color: '#444' }}>{property.description}</p>
          </section>

          <aside aria-label="Actions">
            {user && (
              <button
                type="button"
                className={`btn ${isFavorite ? 'btn-accent' : 'btn-outline'} btn-full`}
                onClick={handleFavorite}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                style={{ marginBottom: '1rem' }}
              >
                {isFavorite ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}
              </button>
            )}

            {!user && (
              <div className="alert alert-info" role="note">
                <Link to="/login" style={{ color: '#667eea' }}>Connectez-vous</Link> pour ajouter aux favoris ou faire une offre.
              </div>
            )}

            {canOffer && (
              <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: 8 }}>
                <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>Faire une offre</h2>
                {offerError && <div className="alert alert-error" role="alert">{offerError}</div>}
                {offerSuccess && <div className="alert alert-success" role="status">{offerSuccess}</div>}
                <form onSubmit={handleOffer}>
                  <div className="form-group">
                    <label htmlFor="offerPrice">Montant proposé (€)</label>
                    <input
                      id="offerPrice"
                      type="number"
                      className="form-input"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      min="1"
                      required
                      aria-required="true"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                    {submitting ? 'Envoi…' : 'Envoyer l\'offre'}
                  </button>
                </form>
              </div>
            )}
          </aside>
        </div>
      </article>
    </main>
  );
};
