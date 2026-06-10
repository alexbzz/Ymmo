const TYPE_LABELS = {
  APARTMENT: 'Appartement',
  HOUSE: 'Maison',
  LAND: 'Terrain',
  COMMERCIAL: 'Commercial',
};

const STATUS_LABELS = {
  AVAILABLE: 'Disponible',
  UNDER_OFFER: 'Sous offre',
  SOLD: 'Vendu',
};

const TRANSACTION_STATUS_LABELS = {
  PENDING: 'En attente',
  ACCEPTED: 'Acceptée',
  REJECTED: 'Refusée',
  COMPLETED: 'Finalisée',
};

export const formatPrice = (price) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);

export const formatType = (type) => TYPE_LABELS[type] || type;

export const formatStatus = (status) => STATUS_LABELS[status] || status;

export const formatTransactionStatus = (status) => TRANSACTION_STATUS_LABELS[status] || status;
