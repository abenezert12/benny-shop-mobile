# Benny Shop Backend

A comprehensive backend API for the Benny Shop mobile application, built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based auth with user registration/login
- **Product Management**: Full CRUD operations for products with categories
- **File Management**: Upload, store, and manage user files
- **Shopping Cart**: Add, update, remove items from cart
- **Wishlist**: Save favorite products
- **Order Management**: Complete order processing with Stripe payment integration
- **Admin Panel**: User and product management for administrators
- **Security**: Rate limiting, input validation, CORS, Helmet

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Stripe
- **File Upload**: Multer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env` file and update the values
   - Set your MongoDB URI
   - Set your JWT secret
   - Set your Stripe keys

4. Seed the database with initial data:
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with filtering/pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Files
- `POST /api/files/upload` - Upload file
- `GET /api/files` - Get user's files
- `PUT /api/files/:id` - Update file
- `DELETE /api/files/:id` - Delete file
- `GET /api/files/download/:filename` - Download file

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/add` - Add item to wishlist
- `DELETE /api/wishlist/remove/:productId` - Remove item from wishlist
- `DELETE /api/wishlist` - Clear wishlist

### Orders
- `POST /api/orders/create-payment-intent` - Create Stripe payment intent
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (admin)

### Users (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with initial data
- `npm test` - Run tests

## Environment Variables

Create a `.env` file in the backend root:

```env
MONGODB_URI=mongodb://localhost:27017/benny-shop-mobile
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
PORT=5000
NODE_ENV=development
```

## Default Admin Account

After seeding the database, you can login with:
- Email: admin@benny-shop-mobile.com
- Password: admin123

## File Upload

Files are stored in the `backend/uploads/` directory. Supported formats:
- Images: JPEG, JPG, PNG, GIF
- Documents: PDF, DOC, DOCX
- Audio: MP3, WAV
- Video: MP4

Maximum file size: 10MB

## Payment Integration

The backend integrates with Stripe for payment processing. Make sure to:
1. Create a Stripe account
2. Get your API keys
3. Update the `.env` file
4. Test payments in test mode

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation and sanitization
- CORS protection
- Helmet security headers
- File type validation for uploads

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.