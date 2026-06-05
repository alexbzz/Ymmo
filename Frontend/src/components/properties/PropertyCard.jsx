import React from 'react';
import { Link } from 'react-router-dom';

export const PropertyCard = ({ property }) => {
  return (
    <Link to={`/properties/${property.id}`} style={styles.link}>
      <div style={styles.card}>
        <div style={styles.image}>
          <img
            src={property.photos?.[0]?.url || 'https://via.placeholder.com/300x200'}
            alt={property.title}
            style={styles.img}
          />
          <span style={styles.badge}>{property.type}</span>
        </div>
        <div style={styles.content}>
          <h3 style={styles.title}>{property.title}</h3>
          <p style={styles.address}>{property.address}, {property.city}</p>
          <div style={styles.details}>
            <span>🛏️ {property.rooms} chambres</span>
            <span>📐 {property.surface} m²</span>
          </div>
          <div style={styles.footer}>
            <span style={styles.price}>{property.price}€</span>
            <span style={styles.status}>{property.status}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  },
  image: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  badge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#3498db',
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem'
  },
  content: {
    padding: '1rem'
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem'
  },
  address: {
    color: '#666',
    fontSize: '0.9rem',
    margin: '0 0 0.75rem 0'
  },
  details: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.9rem',
    marginBottom: '0.75rem'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.75rem',
    borderTop: '1px solid #eee'
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#e74c3c'
  },
  status: {
    fontSize: '0.85rem',
    color: '#27ae60'
  }
};
