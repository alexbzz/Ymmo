import React from 'react';
import { Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { formatPrice, formatTransactionStatus } from '../utils/formatters';

export const Transactions = () => {
  const { transactions, loading, error } = useTransactions();

  return (
    <main className="page-container" id="main-content">
      <h1 style={{ marginTop: 0 }}>Mes offres</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Suivez l'état de vos offres d'achat sur les biens immobiliers.
      </p>

      {error && (
        <div className="alert alert-error" role="alert" aria-live="polite">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner label="Chargement de vos transactions…" />
      ) : transactions.length === 0 ? (
        <p role="status" style={{ color: '#666' }}>
          Aucune offre pour le moment. Consultez les{' '}
          <Link to="/properties" style={{ color: '#667eea' }}>propriétés</Link> pour faire une offre.
        </p>
      ) : (
        <div role="list" aria-label="Liste des offres">
          {transactions.map((tx) => (
            <article
              key={tx.id}
              role="listitem"
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: '1.5rem',
                marginBottom: '1rem',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <div>
                <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>
                  <Link to={`/properties/${tx.propertyId}`} style={{ color: '#333', textDecoration: 'none' }}>
                    {tx.property?.title || 'Bien immobilier'}
                  </Link>
                </h2>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  Offre : {formatPrice(tx.offerPrice)}
                  {tx.property?.price && (
                    <span> (prix affiché : {formatPrice(tx.property.price)})</span>
                  )}
                </p>
                <time style={{ fontSize: '0.85rem', color: '#999' }}>
                  {new Date(tx.createdAt).toLocaleDateString('fr-FR')}
                </time>
              </div>
              <span
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 20,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: tx.status === 'ACCEPTED' ? '#d4edda' : tx.status === 'REJECTED' ? '#fdecea' : '#fff3cd',
                  color: tx.status === 'ACCEPTED' ? '#155724' : tx.status === 'REJECTED' ? '#c0392b' : '#856404',
                }}
                role="status"
                aria-label={`Statut : ${formatTransactionStatus(tx.status)}`}
              >
                {formatTransactionStatus(tx.status)}
              </span>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};
