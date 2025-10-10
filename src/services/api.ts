import { Product, ProductFormData } from '@/types/product';

// ============================================
// TODO: REPLACE THIS WITH YOUR BACKEND API URL
// ============================================
const API_BASE_URL = 'http://localhost:5000/api'; // Change this to your Express server URL

// ============================================
// API SERVICE FOR CONNECTING TO YOUR EXPRESS/MONGODB BACKEND
// ============================================
// This file contains all the API calls your frontend will make to your backend
// Each function corresponds to one of your Express.js API endpoints

export const productAPI = {
  // GET /api/products - Fetch all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // GET /api/products/:id - Fetch a single product by ID
  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // POST /api/products - Create a new product
  createProduct: async (productData: ProductFormData): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to create product');
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // PUT /api/products/:id - Update an existing product
  updateProduct: async (id: string, productData: ProductFormData): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to update product');
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // DELETE /api/products/:id - Delete a product
  deleteProduct: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

// ============================================
// MOCK DATA FOR TESTING (Remove this when you connect your backend)
// ============================================
export const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    price: 99.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  {
    _id: '2',
    name: 'JavaScript Programming Book',
    description: 'Comprehensive guide to modern JavaScript programming. Learn ES6+, async programming, and best practices.',
    price: 29.99,
    category: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
  },
  {
    _id: '3',
    name: 'Cotton T-Shirt',
    description: '100% organic cotton t-shirt, comfortable and sustainable. Available in multiple colors and sizes.',
    price: 19.99,
    category: 'Apparel',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
  },
  {
    _id: '4',
    name: 'Smart Watch',
    description: 'Feature-packed smartwatch with fitness tracking, heart rate monitor, and smartphone notifications.',
    price: 199.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  },
  {
    _id: '5',
    name: 'React Development Guide',
    description: 'Master React with this comprehensive guide covering hooks, context, and modern patterns.',
    price: 34.99,
    category: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
  },
  {
    _id: '6',
    name: 'Running Shoes',
    description: 'Professional running shoes with advanced cushioning and support. Perfect for marathons and daily runs.',
    price: 89.99,
    category: 'Apparel',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
  },
];
