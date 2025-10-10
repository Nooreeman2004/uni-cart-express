# Backend Setup Instructions

This React frontend is ready to connect to your Express.js + MongoDB backend. Follow these instructions to set up your backend and connect it to this frontend.

## Required Backend API Endpoints

Your Express.js server needs to implement these RESTful API endpoints:

### 1. GET /api/products
**Purpose:** Fetch all products  
**Response:** Array of product objects

```javascript
// Example response:
[
  {
    _id: "507f1f77bcf86cd799439011",
    name: "Product Name",
    description: "Product description",
    price: 29.99,
    category: "Electronics",
    imageUrl: "https://example.com/image.jpg",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z"
  }
]
```

### 2. GET /api/products/:id
**Purpose:** Fetch a single product by ID  
**Response:** Single product object

### 3. POST /api/products
**Purpose:** Create a new product  
**Request Body:**
```javascript
{
  name: "Product Name",
  description: "Product description",
  price: 29.99,
  category: "Electronics",
  imageUrl: "https://example.com/image.jpg"
}
```
**Response:** Created product object with _id

### 4. PUT /api/products/:id
**Purpose:** Update an existing product  
**Request Body:** Same as POST  
**Response:** Updated product object

### 5. DELETE /api/products/:id
**Purpose:** Delete a product  
**Response:** Success message

## MongoDB Schema

Create a Mongoose schema for products:

```javascript
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Books', 'Apparel', 'Home & Garden', 'Sports']
  },
  imageUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Product', productSchema);
```

## Express.js Server Example

Create a file called `server.js`:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// TODO: INSERT YOUR MONGODB CONNECTION STRING HERE
// ============================================
const MONGODB_URI = 'mongodb://localhost:27017/ecommerce'; 
// OR use MongoDB Atlas:
// const MONGODB_URI = 'mongodb+srv://username:password@cluster.mongodb.net/ecommerce';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Product Model
const Product = require('./models/Product'); // Create this file with the schema above

// Routes

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create product
app.post('/api/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    imageUrl: req.body.imageUrl
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.imageUrl = req.body.imageUrl || product.imageUrl;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Connecting the Frontend

Once your backend is running:

1. **Update the API URL** in `src/services/api.ts`:
   ```typescript
   const API_BASE_URL = 'http://localhost:5000/api'; // Your backend URL
   ```

2. **Uncomment the real API calls** in these files:
   - `src/pages/Products.tsx` - Replace mock data with `productAPI.getAllProducts()`
   - `src/pages/ProductDetail.tsx` - Replace mock data with `productAPI.getProductById()`
   - `src/pages/ProductForm.tsx` - Use `productAPI.createProduct()` and `productAPI.updateProduct()`

3. **Remove mock data imports** once you've confirmed the backend is working

## Installation

Install required npm packages for the backend:

```bash
npm init -y
npm install express mongoose cors
npm install -D nodemon
```

Add to your `package.json`:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## Running the Application

1. Start MongoDB (if running locally)
2. Start your backend: `npm run dev`
3. Start your React frontend (in this directory): `npm run dev`
4. The frontend will be at `http://localhost:8080`
5. The backend should be at `http://localhost:5000`

## Testing the API

You can test your API endpoints using:
- Postman
- Thunder Client (VS Code extension)
- cURL commands

Example cURL to create a product:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "This is a test",
    "price": 19.99,
    "category": "Electronics",
    "imageUrl": "https://via.placeholder.com/400"
  }'
```

## CORS Issues?

If you encounter CORS errors, make sure your Express server has:
```javascript
app.use(cors());
```

Or configure it specifically:
```javascript
app.use(cors({
  origin: 'http://localhost:8080' // Your React app URL
}));
```
