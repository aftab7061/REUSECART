// pages/EditProduct.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as productService from '../services/productService';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import ImageUploader from '../components/ImageUploader';
import Loader from '../components/Loader';
import './ProductForm.css';

const CATEGORIES = [
  'Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Books',
  'Home & Garden', 'Sports', 'Toys & Games', 'Other',
];
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();

  const [form, setForm] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    productService
      .getProductById(id)
      .then((data) => {
        const p = data.product;
        if (p.sellerId?._id !== user?._id) {
          showToast('You are not authorized to edit this listing', 'error');
          navigate('/my-listings');
          return;
        }
        setForm({
          title: p.title, description: p.description, price: p.price,
          category: p.category, condition: p.condition, location: p.location,
        });
        setExistingImages(p.images || []);
      })
      .catch(() => showToast('Failed to load product', 'error'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRemoveExisting = async (imageUrl) => {
    try {
      const data = await productService.removeProductImage(id, imageUrl);
      setExistingImages(data.product.images);
      showToast('Image removed', 'info');
    } catch (err) {
      showToast('Failed to remove image', 'error');
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.price || Number(form.price) < 0) errs.price = 'Enter a valid price';
    if (!form.category) errs.category = 'Select a category';
    if (!form.condition) errs.condition = 'Select a condition';
    if (!form.location.trim()) errs.location = 'Location is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      newFiles.forEach((file) => formData.append('images', file));

      const data = await productService.updateProduct(id, formData);
      showToast('Listing updated successfully!', 'success');
      navigate(`/products/${data.product._id}`);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update listing', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !form) return <Loader label="Loading listing..." />;

  return (
    <div className="page">
      <div className="container">
        <div className="product-form-card card">
          <h1>Edit Listing</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" className="form-control" rows={4} value={form.description} onChange={handleChange} />
              {errors.description && <span className="form-error">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (₹)</label>
                <input type="number" name="price" className="form-control" min="0" value={form.price} onChange={handleChange} />
                {errors.price && <span className="form-error">{errors.price}</span>}
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" className="form-control" value={form.location} onChange={handleChange} />
                {errors.location && <span className="form-error">{errors.location}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" className="form-control" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Condition</label>
                <select name="condition" className="form-control" value={form.condition} onChange={handleChange}>
                  {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="product-form-section">
              <label className="section-label">Photos (up to 6)</label>
              <ImageUploader
                existingImages={existingImages}
                newFiles={newFiles}
                onFilesChange={setNewFiles}
                onRemoveExisting={handleRemoveExisting}
              />
            </div>

            <button className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
