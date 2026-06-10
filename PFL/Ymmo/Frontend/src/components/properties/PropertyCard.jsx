import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, formatType, formatStatus } from '../../utils/formatters';

export const PropertyCard = ({ property }) => {
  const imageUrl = property.photos?.[0]?.url || 'https://via.placeholder.com/300x200?text=Pas+d%27image';

  return (
    <article>
      <Link
        to={`/properties/${property.id}`}
        style={styles.link}
        aria-label={`Voir le détail de ${property.title}, ${formatPrice(property.price)}`}
      >
        <div style={styles.card}>
          <div style={styles.image}>
            <img
              src={imageUrl}
              alt={`Photo de ${property.title}`}
              style={styles.img}
              loading="lazy"
              width={300}
              height={200}
            />
            <span style={styles.badge} aria-label={`Type : ${formatType(property.type)}`}>
              {formatType(property.type)}
            </span>
          </div>
          <div style={styles.content}>
            <h3 style={styles.title}>{property.title}</h3>
            <p style={styles.address}>{property.address}, {property.city}</p>
            <div style={styles.details} aria-label="Caractéristiques">
              <span>{property.rooms} pièce{property.rooms > 1 ? 's' : ''}</span>
              <span>{property.surface} m²</span>
            </div>
            <div style={styles.footer}>
              <span style={styles.price}>{formatPrice(property.price)}</span>
              <span style={styles.status} role="status">{formatStatus(property.status)}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    height: '100%',
  },
  image: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  badge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#3498db',
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
  },
  content: {
    padding: '1rem',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
  },
  address: {
    color: '#666',
    fontSize: '0.9rem',
    margin: '0 0 0.75rem 0',
  },
  details: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.9rem',
    marginBottom: '0.75rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.75rem',
    borderTop: '1px solid #eee',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  status: {
    fontSize: '0.85rem',
    color: '#27ae60',
  },
};
