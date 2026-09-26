// pages/MyListings.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as productService from '../services/productService';
import { useToast } from '../hooks/useToast';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import './MyListings.css';

const MyListings = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const data = await productService.getMyListings();
      setProducts(data.products);
    } catch (err) {
      showToast('Failed to load your listings', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleMarkSold = async (id) => {
    try {
      await productService.markAsSold(id);
      showToast('Marked as sold', 'success');
      fetchListings();
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await productService.deleteProduct(id);
      showToast('Listing deleted', 'success');
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      showToast('Failed to delete listing', 'error');
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>My Listings</h1>
          <Link to="/add-product" className="btn btn-primary">+ Add New</Link>
        </div>

        {loading ? (
          <Loader label="Loading your listings..." />
        ) : products.length === 0 ? (
          <EmptyState
            icon="🗂️"
            title="You haven't listed anything yet"
            message="Start selling by adding your first item."
            actionLabel="Add a Listing"
            onAction={() => navigate('/add-product')}
          />
        ) : (
          <div className="my-listings-grid">
            {products.map((p) => (
              <div className="my-listing-card card" key={p._id}>
                <Link to={`/products/${p._id}`} className="my-listing-image">
                  {p.images?.[0] ? <img src={p.images[0]} alt={p.title} /> : <div className="placeholder">📷</div>}
                </Link>
                <div className="my-listing-body">
                  <h3>{p.title}</h3>
                  <p className="my-listing-price">₹{Number(p.price).toLocaleString()}</p>
                  <span className={`badge ${p.status === 'Sold' ? 'badge-sold' : 'badge-available'}`}>
                    {p.status}
                  </span>
                  <div className="my-listing-actions">
                    <Link to={`/edit-product/${p._id}`} className="btn btn-outline btn-sm">Edit</Link>
                    {p.status !== 'Sold' && (
                      <button className="btn btn-outline btn-sm" onClick={() => handleMarkSold(p._id)}>
                        Mark Sold
                      </button>
                    )}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
