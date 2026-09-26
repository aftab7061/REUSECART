// pages/NotFound.jsx
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

const NotFound = () => (
  <div className="page container">
    <EmptyState icon="🚫" title="404 - Page Not Found" message="The page you're looking for doesn't exist." />
    <div style={{ textAlign: 'center' }}>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  </div>
);

export default NotFound;
