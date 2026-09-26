// services/wishlistService.js
import api from './api';

export const getWishlist = () => api.get('/wishlist').then((res) => res.data);

export const addToWishlist = (productId) =>
  api.post('/wishlist', { productId }).then((res) => res.data);

export const removeFromWishlist = (productId) =>
  api.delete(`/wishlist/${productId}`).then((res) => res.data);

export const checkWishlist = (productId) =>
  api.get(`/wishlist/check/${productId}`).then((res) => res.data);
