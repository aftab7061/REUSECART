// components/Toast.jsx
const ICONS = { success: '✅', error: '⚠️', info: 'ℹ️' };

const Toast = ({ message, type = 'info', onClose }) => (
  <div className={`toast toast-${type}`} role="alert">
    <span className="toast-icon">{ICONS[type] || ICONS.info}</span>
    <span className="toast-message">{message}</span>
    <button className="toast-close" onClick={onClose} aria-label="Close notification">
      ×
    </button>
  </div>
);

export default Toast;
