// src/api/productApi.js
import axios from 'axios';

const API_BASE_URL = 'https://your-api-endpoint.com/api'; // Replace with your actual API base URL

const productApi = {
  /**
   * Fetches all products with optional filters
   * @param {Object} filters - Optional filters for product listing
   * @returns {Promise<Array>} - Array of products
   */
  getAllProducts: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, {
        params: filters
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Fetches a single product by ID
   * @param {string|number} productId - ID of the product to fetch
   * @returns {Promise<Object>} - Product details
   */
  getProductById: async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      throw error;
    }
  },

  /**
   * Creates a new product
   * @param {Object} productData - Product data to create
   * @returns {Promise<Object>} - Created product
   */
  createProduct: async (productData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  /**
   * Updates an existing product
   * @param {string|number} productId - ID of the product to update
   * @param {Object} productData - Updated product data
   * @returns {Promise<Object>} - Updated product
   */
  updateProduct: async (productId, productData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/products/${productId}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
      throw error;
    }
  },

  /**
   * Deletes a product
   * @param {string|number} productId - ID of the product to delete
   * @returns {Promise<Object>} - Delete confirmation
   */
  deleteProduct: async (productId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${productId}:`, error);
      throw error;
    }
  }
};

export default productApi;