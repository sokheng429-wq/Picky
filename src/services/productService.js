// =====================================================================
// Product data access layer.
//
// Every function here maps 1:1 to a REST endpoint the Spring Boot
// controller exposes:
//
//   GET    /api/products               -> getAllProducts()
//   GET    /api/products/{id}          -> getProductById(id)
//   GET    /api/products?gender=male   -> getProductsByGender(gender)
//   GET    /api/products/brands        -> getBrands()
//   POST   /api/products               -> createProduct(payload)
//   PUT    /api/products/{id}          -> updateProduct(id, payload)
//   DELETE /api/products/{id}          -> deleteProduct(id)
//   POST   /api/products/{id}/reviews  -> addReview(id, review)
//   DELETE /api/products/{id}/reviews/{reviewId} -> deleteReview(id, reviewId)
//
// These call the backend directly and let errors bubble up to the UI —
// no silent local/offline fallback, so what you see always matches
// what's actually in the database.
// =====================================================================

import { api } from "./apiClient.js";

// ---- public API ----

export const getAllProducts = () => api.get("/products");

export const getProductById = (id) => api.get(`/products/${id}`);

export const getProductsByGender = (gender) =>
  api.get(`/products?gender=${encodeURIComponent(gender)}`);

export const getBrands = async () => {
  const all = await getAllProducts();
  return ["All", ...new Set(all.map((p) => p.brand).filter(Boolean))];
};

export const getBestSellers = async (limit = 3) => {
  const all = await getAllProducts();
  return [...all].sort((a, b) => b.rating - a.rating).slice(0, limit);
};

export const createProduct = (payload) => api.post("/products", payload);

export const updateProduct = (id, payload) => api.put(`/products/${id}`, payload);

export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const addReview = (productId, review) => api.post(`/products/${productId}/reviews`, review);

export const deleteReview = (productId, reviewId) => api.delete(`/products/${productId}/reviews/${reviewId}`);
