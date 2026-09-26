// components/ProductCard.jsx
// Reusable card to display a product preview in grids
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { _id, title, price, images, condition, location, status } = product;
  const thumbnail = images && images.length > 0 ? images[0] : null;

  return (
    <Link to={`/products/${_id}`} className="product-card card">
      <div className="product-card-image">
        {thumbnail ? (
          <img src={thumbnail} alt={title} loading="lazy" />
        ) : (
          <div className="product-card-placeholder">📷</div>
        )}
        <span className={`badge ${status === 'Sold' ? 'badge-sold' : 'badge-available'} product-card-badge`}>
          {status}
        </span>
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{title}</h3>
        <p className="product-card-price">₹{Number(price).toLocaleString()}</p>
        <div className="product-card-meta">
          <span className="product-card-condition">{condition}</span>
          <span className="product-card-location">📍 {location}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
