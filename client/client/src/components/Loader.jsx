// components/Loader.jsx
// Simple reusable loading spinner
const Loader = ({ label = 'Loading...' }) => (
  <div className="loader-wrap">
    <div className="spinner" />
    <span>{label}</span>
  </div>
);

export default Loader;
