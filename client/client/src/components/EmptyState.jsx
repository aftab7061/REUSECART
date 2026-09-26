// components/EmptyState.jsx
// Reusable empty state for lists with no data
const EmptyState = ({ icon = '📦', title = 'Nothing here yet', message = '', actionLabel, onAction }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <h3>{title}</h3>
    {message && <p>{message}</p>}
    {actionLabel && onAction && (
      <button className="btn btn-primary" onClick={onAction}>
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
