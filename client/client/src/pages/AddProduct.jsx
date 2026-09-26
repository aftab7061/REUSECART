// // pages/AddProduct.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import * as productService from '../services/productService';
// import { useToast } from '../hooks/useToast';
// import ImageUploader from '../components/ImageUploader';
// import './ProductForm.css';
 
// const CATEGORIES = [
//   'Electronics', 'Furniture', 'Vehicles', 'Fashion', 'Books',
//   'Home & Garden', 'Sports', 'Toys & Games', 'Other',
// ];
// const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];

// const AddProduct = () => {
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const [form, setForm] = useState({
//     title: '', description: '', price: '', category: '', condition: '', location: '',
//   });
//   const [newFiles, setNewFiles] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const errs = {};
//     if (!form.title.trim()) errs.title = 'Title is required';
//     if (!form.description.trim()) errs.description = 'Description is required';
//     if (!form.price || Number(form.price) < 0) errs.price = 'Enter a valid price';
//     if (!form.category) errs.category = 'Select a category';
//     if (!form.condition) errs.condition = 'Select a condition';
//     if (!form.location.trim()) errs.location = 'Location is required';
//     return errs;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errs = validate();
//     setErrors(errs);
//     if (Object.keys(errs).length > 0) return;

//     setSubmitting(true);
//     try {
//       const formData = new FormData();
//       Object.entries(form).forEach(([key, value]) => formData.append(key, value));
//       newFiles.forEach((file) => formData.append('images', file));

//       const data = await productService.createProduct(formData);
//       showToast('Listing created successfully!', 'success');
//       navigate(`/products/${data.product._id}`);
//     } catch (err) {
//       showToast(err.response?.data?.message || 'Failed to create listing', 'error');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="page">
//       <div className="container">
//         <div className="product-form-card card">
//           <h1>Sell an Item</h1>
//           <p className="subtitle">Fill in the details below to list your item on ReSellHub</p>

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Title</label>
//               <input
//                 type="text" name="title" className="form-control"
//                 value={form.title} onChange={handleChange}
//                 placeholder="e.g. iPhone 12, 128GB"
//               />
//               {errors.title && <span className="form-error">{errors.title}</span>}
//             </div>

//             <div className="form-group">
//               <label>Description</label>
//               <textarea
//                 name="description" className="form-control" rows={4}
//                 value={form.description} onChange={handleChange}
//                 placeholder="Describe the item's condition, age, and any flaws..."
//               />
//               {errors.description && <span className="form-error">{errors.description}</span>}
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Price (₹)</label>
//                 <input
//                   type="number" name="price" className="form-control" min="0"
//                   value={form.price} onChange={handleChange} placeholder="0"
//                 />
//                 {errors.price && <span className="form-error">{errors.price}</span>}
//               </div>

//               <div className="form-group">
//                 <label>Location</label>
//                 <input
//                   type="text" name="location" className="form-control"
//                   value={form.location} onChange={handleChange} placeholder="City, State"
//                 />
//                 {errors.location && <span className="form-error">{errors.location}</span>}
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Category</label>
//                 <select name="category" className="form-control" value={form.category} onChange={handleChange}>
//                   <option value="">Select category</option>
//                   {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
//                 </select>
//                 {errors.category && <span className="form-error">{errors.category}</span>}
//               </div>

//               <div className="form-group">
//                 <label>Condition</label>
//                 <select name="condition" className="form-control" value={form.condition} onChange={handleChange}>
//                   <option value="">Select condition</option>
//                   {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
//                 </select>
//                 {errors.condition && <span className="form-error">{errors.condition}</span>}
//               </div>
//             </div>

//             <div className="product-form-section">
//               <label className="section-label">Photos (up to 6)</label>
//               <ImageUploader newFiles={newFiles} onFilesChange={setNewFiles} onRemoveExisting={() => {}} />
//             </div>

//             <button className="btn btn-primary btn-block" disabled={submitting}>
//               {submitting ? 'Publishing...' : 'Publish Listing'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;



// pages/AddProduct.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as productService from '../services/productService';
import { useToast } from '../hooks/useToast';
import ImageUploader from '../components/ImageUploader';
import './ProductForm.css';

const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];

const AddProduct = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',    // Custom text input
    subcategory: '', // Custom text input
    condition: '',
    location: '',
  });
  const [newFiles, setNewFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.price || Number(form.price) < 0) errs.price = 'Enter a valid price';
    if (!form.category.trim()) errs.category = 'Category is required';
    if (!form.subcategory.trim()) errs.subcategory = 'Subcategory is required';
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

      const data = await productService.createProduct(formData);
      showToast('Listing created successfully!', 'success');
      navigate(`/products/${data.product._id}`);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create listing', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="product-form-card card">
          <h1>Sell an Item</h1>
          <p className="subtitle">Fill in the details below to list your item on ReSellHub</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. iPhone 12, 128GB"
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the item's condition, age, and any flaws..."
              />
              {errors.description && <span className="form-error">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0"
                />
                {errors.price && <span className="form-error">{errors.price}</span>}
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, State"
                />
                {errors.location && <span className="form-error">{errors.location}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Electronics, Vehicles, Gadgets"
                />
                {errors.category && <span className="form-error">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label>Subcategory</label>
                <input
                  type="text"
                  name="subcategory"
                  className="form-control"
                  value={form.subcategory}
                  onChange={handleChange}
                  placeholder="e.g. Smartphones, Laptops, Bicycles"
                />
                {errors.subcategory && <span className="form-error">{errors.subcategory}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Condition</label>
                <select
                  name="condition"
                  className="form-control"
                  value={form.condition}
                  onChange={handleChange}
                >
                  <option value="">Select condition</option>
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.condition && <span className="form-error">{errors.condition}</span>}
              </div>
            </div>

            <div className="product-form-section">
              <label className="section-label">Photos (up to 6)</label>
              <ImageUploader newFiles={newFiles} onFilesChange={setNewFiles} onRemoveExisting={() => {}} />
            </div>

            <button className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Publishing...' : 'Publish Listing'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;