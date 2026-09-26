// client/src/pages/MyOrders.jsx
import { useEffect, useState } from "react";
import * as orderService from "../services/orderService";
import Loader from "../components/Loader";
import "./MyOrder.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected Order for Modal View
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    orderService
      .getMyOrders()
      .then((data) => setOrders(data.orders || []))
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading your orders..." />;

  return (
    <div className="page container">
      {/* <h1 className="page-title">My Orders</h1> */}

      {orders.length === 0 ? (
        <div className="card empty-orders">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              key={order._id}
              className="card order-card clickable-order"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="order-header">
                <div>
                  <span className="order-id">Order #{order._id.slice(-6)}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span className={`badge badge-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-body">
                <img
                  src={order.product?.images?.[0] || "/placeholder.png"}
                  alt={order.product?.title}
                  className="order-img"
                />
                <div className="order-info">
                  <h3>{order.product?.title || "Product Unavailable"}</h3>
                  <p className="order-price">
                    ₹{Number(order.amount).toLocaleString()}
                  </p>
                  <p className="order-seller">
                    <strong>Seller:</strong> {order.seller?.name || "N/A"}
                  </p>
                  <p className="order-address">
                    📍 <strong>Shipping To:</strong> {order.shippingAddress}
                  </p>
                  <span className="view-details-link">
                    Click to view full details ➔
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔍 DETAILED ORDER & SELLER MODAL */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button
                className="close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Product Info Section */}
              <div className="detail-section">
                <h3>📦 Product Details</h3>
                <div className="product-summary">
                  <img
                    src={
                      selectedOrder.product?.images?.[0] || "/placeholder.png"
                    }
                    alt={selectedOrder.product?.title}
                    className="modal-product-img"
                  />
                  <div>
                    <h4 className="h4">
                      {selectedOrder.product?.title || "N/A"}
                    </h4>
                    <p className="modal-price">
                      {" "}
                      <strong>Price Paid:</strong> ₹
                      {Number(selectedOrder.amount).toLocaleString()}
                    </p>
                    {selectedOrder.product?.category && (
                      <p className="modal-price">
                        <strong>Category:</strong>{" "}
                        {selectedOrder.product.category}
                      </p>
                    )}
                    {selectedOrder.product?.condition && (
                      <p className="modal-price">
                        <strong>Condition:</strong>{" "}
                        {selectedOrder.product.condition}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Seller Info Section */}
              <div className="detail-section">
                <h3>👤 Seller Information</h3>
                <div className="info-box">
                  <p>
                    <strong>Name:</strong> {selectedOrder.seller?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedOrder.seller?.email || "N/A"}
                  </p>
                  {selectedOrder.seller?.phone && (
                    <p>
                      <strong>Phone:</strong> {selectedOrder.seller.phone}
                    </p>
                  )}
                  {selectedOrder.product?.location && (
                    <p>
                      <strong>Location:</strong> 📍{" "}
                      {selectedOrder.product.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Order & Shipping Info Section */}
              <div className="detail-section">
                <h3>🚚 Shipping & Transaction</h3>
                <div className="info-box">
                  <p>
                    <strong>Order ID:</strong> #{selectedOrder._id}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="badge badge-completed">
                      {selectedOrder.status}
                    </span>
                  </p>
                  <p>
                    <strong>Delivery Address:</strong>{" "}
                    {selectedOrder.shippingAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
