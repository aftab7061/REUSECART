// // services/productService.js
// import api from './api';

// // filters: { search, category, minPrice, maxPrice, condition, page, limit }
// export const getProducts = (filters = {}) =>
//   api.get('/products', { params: filters }).then((res) => res.data);

// export const getProductById = (id) => api.get(`/products/${id}`).then((res) => res.data);

// export const getMyListings = () => api.get('/products/my-listings').then((res) => res.data);

// // formData must be a FormData instance (for multipart image upload)
// export const createProduct = (formData) =>
//   api
//     .post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
//     .then((res) => res.data);

// export const updateProduct = (id, formData) =>
//   api
//     .put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
//     .then((res) => res.data);

// export const deleteProduct = (id) => api.delete(`/products/${id}`).then((res) => res.data);

// export const markAsSold = (id) => api.patch(`/products/${id}/sold`).then((res) => res.data);

// export const removeProductImage = (id, imageUrl) =>
//   api.delete(`/products/${id}/images`, { data: { imageUrl } }).then((res) => res.data);




// services/productService.js
import api from "./api";

// filters: { search, category, subcategory, minPrice, maxPrice, condition, location, page, limit }
export const getProducts = (filters = {}) =>
  api.get("/products", { params: filters }).then((res) => res.data);

export const getCategories = () =>
  api.get("/products/categories").then((res) => res.data);

export const getProductById = (id) =>
  api.get(`/products/${id}`).then((res) => res.data);

export const getMyListings = () =>
  api.get("/products/my-listings").then((res) => res.data);

// formData must be a FormData instance (for multipart image upload)
export const createProduct = (formData) =>
  api
    .post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const updateProduct = (id, formData) =>
  api
    .put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`).then((res) => res.data);

export const markAsSold = (id) =>
  api.patch(`/products/${id}/sold`).then((res) => res.data);

export const removeProductImage = (id, imageUrl) =>
  api
    .delete(`/products/${id}/images`, { data: { imageUrl } })
    .then((res) => res.data);

// Fix: Proper async/await return for Location Search
export const getProductsByLocation = (params = {}) =>
  api.get("/products", { params }).then((res) => res.data);