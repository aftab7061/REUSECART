// // pages/ProductDetails.jsx
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import * as productService from '../services/productService';
// import * as wishlistService from '../services/wishlistService';
// import * as orderService from '../services/orderService';
// import { useAuth } from '../hooks/useAuth';
// import { useToast } from '../hooks/useToast';
// import Loader from '../components/Loader';
// import './ProductDetails.css';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useAuth();
//   const { showToast } = useToast();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImage, setActiveImage] = useState(0);
//   const [inWishlist, setInWishlist] = useState(false);
//   const [wishlistLoading, setWishlistLoading] = useState(false);

//   // Order modal & address states
//   const [showOrderModal, setShowOrderModal] = useState(false);
//   const [shippingAddress, setShippingAddress] = useState('');
//   const [ordering, setOrdering] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     setLoading(true);
//     productService
//       .getProductById(id)
//       .then((data) => {
//         if (isMounted) setProduct(data.product);
//       })
//       .catch(() => showToast('Product not found', 'error'))
//       .finally(() => isMounted && setLoading(false));

//     if (isAuthenticated) {
//       wishlistService
//         .checkWishlist(id)
//         .then((data) => isMounted && setInWishlist(data.inWishlist))
//         .catch(() => {});
//     }
//     return () => {
//       isMounted = false;
//     };
//   }, [id, isAuthenticated]);

//   const toggleWishlist = async () => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }
//     setWishlistLoading(true);
//     try {
//       if (inWishlist) {
//         await wishlistService.removeFromWishlist(id);
//         setInWishlist(false);
//         showToast('Removed from wishlist', 'info');
//       } else {
//         await wishlistService.addToWishlist(id);
//         setInWishlist(true);
//         showToast('Added to wishlist', 'success');
//       }
//     } catch (err) {
//       showToast(err.response?.data?.message || 'Something went wrong', 'error');
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   // 👈 Chat with Seller Handler
//   const handleStartChat = () => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }

//     const sellerId = product.sellerId?._id || product.sellerId || product.user;

//     // Direct Chat Page par navigate karein metadata ke saath
//     navigate('/chat', {
//       state: {
//         sellerId,
//         sellerName: product.sellerId?.name || 'Seller',
//         productId: product._id,
//         productTitle: product.title,
//       },
//     });
//   };

//   // Order API Handler
//   const handleBuyNow = async (e) => {
//     e.preventDefault();

//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }

//     if (!shippingAddress.trim()) {
//       showToast('Please enter shipping address', 'error');
//       return;
//     }

//     setOrdering(true);
//     try {
//       await orderService.createOrder(product._id, shippingAddress);

//       showToast('Order placed successfully! 🎉', 'success');
//       setShowOrderModal(false);

//       setProduct((prev) => ({ ...prev, status: 'Sold', isSold: true }));
//       navigate('/my-orders');
//     } catch (err) {
//       showToast(err.response?.data?.message || 'Failed to place order', 'error');
//     } finally {
//       setOrdering(false);
//     }
//   };

//   if (loading) return <Loader label="Loading product..." />;
//   if (!product) {
//     return (
//       <div className="page container">
//         <p>Product not found.</p>
//         <Link to="/" className="btn btn-primary">Back to Home</Link>
//       </div>
//     );
//   }

//   // Owner check aur Sold status check
//   const sellerId = product.sellerId?._id || product.sellerId || product.user;
//   const isOwner = isAuthenticated && user?._id === sellerId;
//   const isSold = product.status === 'Sold' || product.isSold;
//   const images = product.images?.length > 0 ? product.images : [];

//   return (
//     <div className="page">
//       <div className="container product-details">
//         <div className="product-details-gallery">
//           <div className="main-image card">
//             {images.length > 0 ? (
//               <img src={images[activeImage]} alt={product.title} />
//             ) : (
//               <div className="main-image-placeholder">📷 No image available</div>
//             )}
//             <span className={`badge ${isSold ? 'badge-sold' : 'badge-available'} pd-badge`}>
//               {isSold ? 'Sold' : 'Available'}
//             </span>
//           </div>
//           {images.length > 1 && (
//             <div className="thumbnail-row">
//               {images.map((img, idx) => (
//                 <button
//                   key={img}
//                   className={`thumbnail ${idx === activeImage ? 'active' : ''}`}
//                   onClick={() => setActiveImage(idx)}
//                 >
//                   <img src={img} alt={`Thumbnail ${idx + 1}`} />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="product-details-info card">
//           <h1>{product.title}</h1>
//           <p className="pd-price">₹{Number(product.price).toLocaleString()}</p>

//           <div className="pd-tags">
//             <span className="badge badge-available">{product.category}</span>
//             <span className="product-card-condition">{product.condition}</span>
//           </div>

//           <p className="pd-location">📍 {product.location}</p>

//           <h3>Description</h3>
//           <p className="pd-description">{product.description}</p>

//           <div className="pd-seller card">
//             <div className="pd-seller-avatar">
//               {product.sellerId?.avatar ? (
//                 <img src={product.sellerId.avatar} alt={product.sellerId.name} />
//               ) : (
//                 <span>{product.sellerId?.name?.charAt(0).toUpperCase() || 'S'}</span>
//               )}
//             </div>
//             <div>
//               <p className="pd-seller-name">{product.sellerId?.name || 'Seller'}</p>
//               {product.sellerId?.email && <p className="pd-seller-email">{product.sellerId.email}</p>}
//             </div>
//           </div>

//           {/* BUTTONS SECTION */}
//           <div className="pd-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
//             {/* Owner Actions */}
//             {isOwner && (
//               <Link to={`/edit-product/${product._id}`} className="btn btn-primary btn-block">
//                 Edit Listing
//               </Link>
//             )}

//             {/* Buyer / Non-Owner Actions */}
//             {!isOwner && (
//               <>
//                 {isSold ? (
//                   <button className="btn btn-secondary btn-block" disabled>
//                     🚫 Item Already Sold
//                   </button>
//                 ) : (
//                   <>
//                     {/* BUY NOW BUTTON */}
//                     <button
//                       className="btn btn-primary btn-block"
//                       onClick={() => {
//                         if (!isAuthenticated) return navigate('/login');
//                         setShowOrderModal(true);
//                       }}
//                     >
//                       🛒 Buy Now
//                     </button>

//                     {/* 👇 CHAT WITH SELLER BUTTON */}
//                     <button
//                       className="btn btn-secondary btn-block"
//                       onClick={handleStartChat}
//                       style={{
//                         backgroundColor: '#10b981',
//                         color: '#fff',
//                         border: 'none',
//                       }}
//                     >
//                       💬 Chat with Seller
//                     </button>
//                   </>
//                 )}

//                 {/* WISHLIST BUTTON */}
//                 <button
//                   className={`btn ${inWishlist ? 'btn-danger' : 'btn-outline'} btn-block`}
//                   onClick={toggleWishlist}
//                   disabled={wishlistLoading}
//                 >
//                   {inWishlist ? '💔 Remove from Wishlist' : '🤍 Save to Wishlist'}
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ORDER CONFIRMATION MODAL */}
//       {showOrderModal && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.6)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 1000,
//           }}
//         >
//           <div
//             className="card"
//             style={{
//               width: '100%',
//               maxWidth: '450px',
//               padding: '1.5rem',
//               borderRadius: '8px',
//             }}
//           >
//             <h2>Confirm Your Purchase</h2>
//             <p><strong>Item:</strong> {product.title}</p>
//             <p><strong>Total Price:</strong> ₹{Number(product.price).toLocaleString()}</p>

//             <form onSubmit={handleBuyNow} style={{ marginTop: '1rem' }}>
//               <div className="form-group" style={{ marginBottom: '1rem' }}>
//                 <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
//                   Shipping Address
//                 </label>
//                 <textarea
//                   className="form-control"
//                   rows={3}
//                   value={shippingAddress}
//                   onChange={(e) => setShippingAddress(e.target.value)}
//                   placeholder="Enter your full house address, street, landmark, city, pin code..."
//                   required
//                   style={{
//                     width: '100%',
//                     padding: '0.5rem',
//                     borderRadius: '4px',
//                     border: '1px solid #ccc',
//                   }}
//                 />
//               </div>

//               <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
//                 <button
//                   type="button"
//                   className="btn btn-outline"
//                   onClick={() => setShowOrderModal(false)}
//                   disabled={ordering}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary" disabled={ordering}>
//                   {ordering ? 'Placing Order...' : 'Confirm Order'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;

// pages/ProductDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as productService from "../services/productService";
import * as wishlistService from "../services/wishlistService";
import * as orderService from "../services/orderService";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import Loader from "../components/Loader";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Order modal & address states
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    productService
      .getProductById(id)
      .then((data) => {
        if (isMounted) setProduct(data.product);
      })
      .catch(() => showToast("Product not found", "error"))
      .finally(() => isMounted && setLoading(false));

    if (isAuthenticated) {
      wishlistService
        .checkWishlist(id)
        .then((data) => isMounted && setInWishlist(data.inWishlist))
        .catch(() => {});
    }
    return () => {
      isMounted = false;
    };
  }, [id, isAuthenticated]);

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setWishlistLoading(true);
    try {
      if (inWishlist) {
        await wishlistService.removeFromWishlist(id);
        setInWishlist(false);
        showToast("Removed from wishlist", "info");
      } else {
        await wishlistService.addToWishlist(id);
        setInWishlist(true);
        showToast("Added to wishlist", "success");
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong", "error");
    } finally {
      setWishlistLoading(false);
    }
  };

  // 👈 Chat with Seller Handler
  const handleStartChat = () => {
    if (!isAuthenticated) return navigate("/login");

    // Backend response ke hisaab se seller ID check karein
    const sellerId =
      product?.sellerId?._id || product?.sellerId || product?.user;

    if (!sellerId) {
      showToast("Seller details missing for this product", "error");
      return;
    }

    navigate("/chat", {
      state: {
        sellerId,
        sellerName: product.sellerId?.name || "Seller",
        productId: product._id,
        productTitle: product.title,
      },
    });
  };

  // Order API Handler
  const handleBuyNow = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!shippingAddress.trim()) {
      showToast("Please enter shipping address", "error");
      return;
    }

    setOrdering(true);
    try {
      await orderService.createOrder(product._id, shippingAddress);

      showToast("Order placed successfully! 🎉", "success");
      setShowOrderModal(false);

      setProduct((prev) => ({ ...prev, status: "Sold", isSold: true }));
      navigate("/my-orders");
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to place order",
        "error",
      );
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return <Loader label="Loading product..." />;
  if (!product) {
    return (
      <div className="page container">
        <p>Product not found.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  // Owner check aur Sold status check
  const sellerId = product.sellerId?._id || product.sellerId || product.user;
  const isOwner = isAuthenticated && user?._id === sellerId;
  const isSold = product.status === "Sold" || product.isSold;
  const images = product.images?.length > 0 ? product.images : [];

  return (
    <div className="page">
      <div className="container product-details">
        <div className="product-details-gallery">
          <div className="main-image card">
            {images.length > 0 ? (
              <img src={images[activeImage]} alt={product.title} />
            ) : (
              <div className="main-image-placeholder">
                📷 No image available
              </div>
            )}
            <span
              className={`badge ${isSold ? "badge-sold" : "badge-available"} pd-badge`}
            >
              {isSold ? "Sold" : "Available"}
            </span>
          </div>
          {images.length > 1 && (
            <div className="thumbnail-row">
              {images.map((img, idx) => (
                <button
                  key={img}
                  className={`thumbnail ${idx === activeImage ? "active" : ""}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-details-info card">
          <h1>{product.title}</h1>
          <p className="pd-price">₹{Number(product.price).toLocaleString()}</p>

          <div className="pd-tags">
            <span className="badge badge-available">{product.category}</span>
            <span className="product-card-condition">{product.condition}</span>
          </div>

          <p className="pd-location">📍 {product.location}</p>

          <h3>Description</h3>
          <p className="pd-description">{product.description}</p>

          <div className="pd-seller card">
            <div className="pd-seller-avatar">
              {product.sellerId?.avatar ? (
                <img
                  src={product.sellerId.avatar}
                  alt={product.sellerId.name}
                />
              ) : (
                <span>
                  {product.sellerId?.name?.charAt(0).toUpperCase() || "S"}
                </span>
              )}
            </div>
            <div>
              <p className="pd-seller-name">
                {product.sellerId?.name || "Seller"}
              </p>
              {product.sellerId?.email && (
                <p className="pd-seller-email">{product.sellerId.email}</p>
              )}
            </div>
          </div>

          {/* BUTTONS SECTION */}
          <div
            className="pd-actions"
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {/* Owner Actions */}
            {isOwner && (
              <Link
                to={`/edit-product/${product._id}`}
                className="btn btn-primary btn-block"
              >
                Edit Listing
              </Link>
            )}

            {/* Buyer / Non-Owner Actions */}
            {!isOwner && (
              <>
                {isSold ? (
                  <button className="btn btn-secondary btn-block" disabled>
                    🚫 Item Already Sold
                  </button>
                ) : (
                  <>
                    {/* BUY NOW BUTTON */}
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => {
                        if (!isAuthenticated) return navigate("/login");
                        setShowOrderModal(true);
                      }}
                    >
                      🛒 Buy Now
                    </button>

                    {/* 👇 CHAT WITH SELLER BUTTON */}
                    <button
                      className="btn btn-secondary btn-block"
                      onClick={handleStartChat}
                      style={{
                        backgroundColor: "#10b981",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      💬 Chat with Seller
                    </button>
                  </>
                )}

                {/* WISHLIST BUTTON */}
                <button
                  className={`btn ${inWishlist ? "btn-danger" : "btn-outline"} btn-block`}
                  onClick={toggleWishlist}
                  disabled={wishlistLoading}
                >
                  {inWishlist
                    ? "💔 Remove from Wishlist"
                    : "🤍 Save to Wishlist"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ORDER CONFIRMATION MODAL */}
      {showOrderModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="card"
            style={{
              width: "100%",
              maxWidth: "450px",
              padding: "1.5rem",
              borderRadius: "8px",
            }}
          >
            <h2>Confirm Your Purchase</h2>
            <p>
              <strong>Item:</strong> {product.title}
            </p>
            <p>
              <strong>Total Price:</strong> ₹
              {Number(product.price).toLocaleString()}
            </p>

            <form onSubmit={handleBuyNow} style={{ marginTop: "1rem" }}>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Shipping Address
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your full house address, street, landmark, city, pin code..."
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowOrderModal(false)}
                  disabled={ordering}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={ordering}
                >
                  {ordering ? "Placing Order..." : "Confirm Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
