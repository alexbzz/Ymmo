export const LoadingSpinner = ({ label = 'Chargement en cours…' }) => (
  <div className="loading-spinner" role="status" aria-live="polite">
    <div className="spinner" aria-hidden="true" />
    <span>{label}</span>
  </div>
);
