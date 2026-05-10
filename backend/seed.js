const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const products = [
  { id: 'e1', name: 'AirPods Pro', price: 249, category: 'Electronics', badge: 'Best Seller', rating: 4.8, reviews: 1245, inStock: true, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80','https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=80'], description: 'Active Noise Cancellation for immersive sound. Transparency mode for hearing and connecting with the world around you. A more customizable fit for all-day comfort.' },
  { id: 'e2', name: 'MacBook Stand', price: 89, category: 'Electronics', badge: null, rating: 4.5, reviews: 312, inStock: true, image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80'], description: 'Elevate your MacBook to the perfect ergonomic height. Crafted from premium aluminum with a sleek, minimalist design.' },
  { id: 'e3', name: 'Mechanical Keyboard', price: 179, category: 'Electronics', badge: 'New', rating: 4.9, reviews: 89, inStock: true, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80'], description: 'Tactile precision meets elegant design. Cherry MX switches, PBT keycaps, and a compact TKL layout for maximum desk space.' },
  { id: 'e4', name: 'USB-C Hub', price: 69, category: 'Electronics', badge: 'Out of Stock', rating: 4.2, reviews: 56, inStock: false, image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=800&q=80'], description: '7-in-1 USB-C hub with 4K HDMI, 100W PD, SD card reader, and 3 USB-A ports. Your complete connectivity solution.' },
  { id: 'e5', name: 'Wireless Earbuds', price: 149, category: 'Electronics', badge: 'New', rating: 4.6, reviews: 387, inStock: true, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'], description: 'True wireless freedom with 30-hour battery life, IPX5 water resistance, and powerful sound in a compact design.' },
  { id: 'e6', name: 'Smart Watch', price: 299, category: 'Electronics', badge: null, rating: 4.8, reviews: 542, inStock: true, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'], description: 'Advanced health tracking, GPS, and a stunning Always-On display. Your most capable companion for every adventure.' },
  { id: 'c1', name: 'Merino Wool Sweater', price: 145, category: 'Clothing', badge: null, rating: 4.7, reviews: 231, inStock: true, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80'], description: 'Luxuriously soft 100% merino wool. Naturally temperature-regulating and odor-resistant for year-round wear.' },
  { id: 'c2', name: 'Linen Trousers', price: 98, category: 'Clothing', badge: null, rating: 4.4, reviews: 112, inStock: true, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'], description: 'Lightweight linen trousers with a relaxed fit. Breathable and effortlessly stylish for warm days.' },
  { id: 'c3', name: 'Leather Sneakers', price: 220, originalPrice: 280, category: 'Shoes', badge: 'Sale', rating: 4.8, reviews: 456, inStock: true, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'], description: 'Handcrafted full-grain leather sneakers with a vulcanized rubber sole. Timeless style built to last.' },
  { id: 'c4', name: 'Cotton T-Shirt', price: 45, category: 'Clothing', badge: null, rating: 4.3, reviews: 89, inStock: true, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'], description: 'Heavyweight 220gsm cotton for a premium feel. Pre-shrunk and garment-washed for an effortless look.' },
  { id: 'c5', name: 'Denim Jacket', price: 120, category: 'Clothing', badge: null, rating: 4.5, reviews: 156, inStock: true, image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=800&q=80'], description: 'Classic denim jacket in a relaxed fit. Washed for a broken-in feel from day one.' },
  { id: 's1', name: 'Trail Runner', price: 138, category: 'Shoes', badge: null, rating: 4.7, reviews: 182, inStock: true, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80'], description: 'Aggressive grip, waterproof membrane, and a cushioned midsole for peak trail performance.' },
  { id: 's2', name: 'Everyday Loafers', price: 160, category: 'Shoes', badge: null, rating: 4.6, reviews: 94, inStock: true, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'], description: 'Hand-stitched penny loafers in soft calfskin leather. Equally at home on weekdays and weekends.' },
  { id: 's3', name: 'Classic Court Sneakers', price: 125, category: 'Shoes', badge: null, rating: 4.8, reviews: 205, inStock: true, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'], description: 'Inspired by the courts, built for the streets. Clean lines, durable canvas, and gum rubber sole.' },
  { id: 's4', name: 'Running Shoes', price: 180, category: 'Shoes', badge: null, rating: 4.7, reviews: 298, inStock: true, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'], description: 'Responsive foam cushioning and engineered mesh upper for your fastest miles yet.' },
  { id: 's5', name: 'Leather Boots', price: 250, category: 'Shoes', badge: 'New', rating: 4.9, reviews: 187, inStock: true, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'], description: 'Full-grain leather Chelsea boots with a Goodyear welt construction. Built to be resoled and worn for decades.' },
  { id: 'a1', name: 'Leather Wallet', price: 85, category: 'Accessories', badge: null, rating: 4.5, reviews: 215, inStock: true, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'], description: 'Slim bifold wallet in vegetable-tanned leather. Holds 8 cards and cash with a minimal profile.' },
  { id: 'a2', name: 'Sunglasses', price: 195, category: 'Accessories', badge: null, rating: 4.6, reviews: 178, inStock: true, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'], description: 'Polarized acetate frames with UV400 protection. Handcrafted in Italy with spring hinges for a perfect fit.' },
  { id: 'a3', name: 'Leather Backpack', price: 180, category: 'Accessories', badge: null, rating: 4.6, reviews: 234, inStock: true, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'], description: 'Waxed canvas and full-grain leather backpack with a padded 15" laptop sleeve and organizer pockets.' },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/benny-shop');
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert products
    await Product.insertMany(products.map(p => ({
      name: p.name,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      category: p.category,
      images: p.images,
      inStock: p.inStock,
      badge: p.badge,
      rating: p.rating,
      reviews: p.reviews
    })));
    
    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@benny-shop.com' });
    if (!adminExists) {
      const admin = new User({
        name: 'Admin',
        email: 'admin@benny-shop.com',
        password: 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created: admin@benny-shop.com / admin123');
    }
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();