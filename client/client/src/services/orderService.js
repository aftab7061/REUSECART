// client/src/services/orderService.js
import api from './api';

// Create a new order (Buy Product)
export const createOrder = (productId, shippingAddress) =>
  api.post('/orders', { productId, shippingAddress }).then((res) => res.data);

// Fetch logged-in user's orders
export const getMyOrders = () =>
  api.get('/orders/my-orders').then((res) => res.data);   