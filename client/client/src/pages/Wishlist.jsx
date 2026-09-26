// pages/Wishlist.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as wishlistService from '../services/wishlistService';
import { useToast } from '../hooks/useToast';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const Wishlist = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wishlistService
      .getWishlist()
      .then((data) => setProducts(data.products))
      .catch(() => showToast('Failed to load wishlist', 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>My Wishlist</h1>
        </div>

        {loading ? (
          <Loader label="Loading wishlist..." />
        ) : products.length === 0 ? (
          <EmptyState
            icon="🤍"
            title="Your wishlist is empty"
            message="Save items you're interested in to find them here later."
            actionLabel="Browse Listings"
            onAction={() => navigate('/')}
          />
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
