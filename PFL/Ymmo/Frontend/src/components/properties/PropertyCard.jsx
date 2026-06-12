import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, formatType, formatStatus } from '../../utils/formatters';

const getStatusClass = (status) => {
  if (status === 'SOLD') return 'status-sold';
  if (status === 'AVAILABLE') return 'status-available';
  return 'status-pending';
};

export const PropertyCard = ({ property }) => {
  const imageUrl = property.photos?.[0]?.url || 'https://via.placeholder.com/300x200?text=Pas+d%27image';

  return (
    <article>
      <Link
        to={`/properties/${property.id}`}
        style={styles.link}
        aria-label={`Voir le détail de ${property.title}, ${formatPrice(property.price)}`}
      >
        <div className="property-card">
          <div className="property-card__image">
            <img
              src={imageUrl}
              alt={`Photo de ${property.title}`}
              className="property-card__img"
              loading="lazy"
              width={300}
              height={200}
            />
            <span
              className={`property-card__badge ${getStatusClass(property.status)}`}
              aria-label={`Statut : ${formatStatus(property.status)}`}
            >
              {formatStatus(property.status)}
            </span>
          </div>
          <div className="property-card__content">
            <h3 className="property-card__title">{property.title}</h3>
            <p className="property-card__meta">
              {property.city} · {property.surface} m²
            </p>
            <div className="property-card__details" aria-label="Caractéristiques">
              <span>{property.rooms} pièce{property.rooms > 1 ? 's' : ''}</span>
              <span>{formatType(property.type)}</span>
            </div>
            <div className="property-card__footer">
              <span className="property-card__price">{formatPrice(property.price)}</span>
              <span className="property-card__status" role="status" aria-label={`Type : ${formatType(property.type)}`}>
                {formatType(property.type)}
              </span>
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
};
