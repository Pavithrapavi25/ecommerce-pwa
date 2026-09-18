# 🛍️ E-Commerce PWA

A responsive and offline-ready **E-Commerce Progressive Web App (PWA)** built using HTML, CSS and JavaScript.

This project provides a complete basic shopping experience with product browsing, search, categories, sorting, product details, wishlist, cart management, user authentication, checkout and order management.

---

## 🚀 Live Demo

The application can be run locally using a lightweight web server.

**Local Frontend:**

```text
http://localhost:5500
📌 Problem Statement

Traditional basic shopping websites may provide only product listings and simple cart functionality.

A modern e-commerce application should provide a smoother shopping experience with features such as:

Product discovery
Product search
Product categorization
Product sorting
Product details
Wishlist management
Shopping cart management
User authentication
Checkout
Order tracking
Persistent shopping data
Responsive design
Offline support

This project was developed to demonstrate these core e-commerce workflows in a simple and lightweight Progressive Web App.

💡 Solution

The application provides a complete basic shopping workflow:

Browse Products → Search → Filter → View Details → Wishlist → Add to Cart → Checkout → Place Order → View Orders

The application uses browser Local Storage to maintain user data, cart information, wishlist items and order history across page refreshes.

The project also includes PWA functionality through a manifest and Service Worker for offline-ready behavior.

✨ Key Features
🛍️ Product Management
Display products in a responsive product grid
Product images
Product names
Product prices
Product categories
Product descriptions
Product details modal
Add products to cart
Add products to wishlist
🔎 Product Search
Search products by name
Real-time product filtering
Displays a message when no matching products are found
🗂️ Product Categories

Products can be filtered using categories:

All
Fashion
Accessories
Bags
Other
↕️ Product Sorting

Products can be sorted by:

Default order
Price: Low to High
Price: High to Low
Name: A to Z
Name: Z to A
👀 Product Details

Users can open a product details window to view:

Product image
Product name
Category
Price
Description
Add to Cart option
❤️ Wishlist

Users can save products for later.

Wishlist functionality includes:

Add products to wishlist
Remove products from wishlist
View wishlist count
Persistent wishlist using Local Storage
Add wishlist products directly to cart
🛒 Shopping Cart

The cart provides:

Add products
Remove products
Increase quantity
Decrease quantity
Automatic subtotal calculation
Automatic total calculation
Cart item count
Persistent cart using Local Storage
Empty cart handling
Checkout navigation
👤 User Authentication

The project includes a simple frontend authentication flow:

User registration
Email validation
Password creation
Login
Logout
Login validation
Persistent login state
📦 Checkout

The checkout system collects:

Full name
Phone number
Delivery address
City
PIN code
Payment method

Supported demo payment methods:

Cash on Delivery
Test Payment
🧾 Order Management

Users can place orders and view their order history.

Order management includes:

Automatic Order ID generation
Order date and time
Customer delivery details
Ordered products
Product quantities
Order total
Payment method
Order status
Persistent order history
📱 Responsive Design

The application is designed to work across:

Desktop
Laptop
Tablet
Mobile devices
📶 Progressive Web App

The application includes:

Web App Manifest
Service Worker
Offline caching
Standalone PWA configuration
Cached application files
🔐 Authentication & Data Storage

The project uses browser Local Storage for frontend data persistence.

Stored information includes:

User account
Login state
Shopping cart
Wishlist
Order history

Important:

This authentication system is a frontend/demo implementation.

It is not intended to provide production-level authentication or security because user credentials are stored in browser Local Storage.

No real payment gateway is connected.

🛠️ Technology Stack
Frontend
HTML5
CSS3
JavaScript
Responsive Web Design
Browser Storage
Local Storage
Progressive Web App
Web App Manifest
Service Worker
Offline Caching
Development
Git
GitHub
Python HTTP Server
📸 Screenshots
🛒 Shopping Cart

💳 Checkout

🔐 Login & Registration

❤️ Wishlist

📦 My Orders

📊 Dashboard

🏗️ Project Architecture
ecommerce-pwa/
│
├── images/
│   ├── product1.jpg
│   ├── product2.jpg
│   ├── product3.jpg
│   ├── product4.jpg
│   ├── product5.jpg
│   ├── product6.jpg
│   ├── product7.jpg
│   ├── product8.jpg
│   ├── product9.jpg
│   └── product10.jpg
│
├── screenshots/
│   ├── cart.png
│   ├── checkout.png
│   ├── login&register.png
│   ├── orders.png
│   ├── wishlist.png
│   ├── dashboard1 (2).png
│   ├── dashboard2 (2).png
│   └── dashboard3 (2).png
│
├── .gitignore
├── app.js
├── ecommerce pwa.code-workspace
├── index.html
├── manifest.json
├── service-worker.js
├── style.css
└── README.md
🔄 Application Workflow
Open Application
       ↓
Browse Products
       ↓
Search / Category / Sort
       ↓
View Product Details
       ↓
Add to Wishlist or Cart
       ↓
Manage Cart
       ↓
Checkout
       ↓
Enter Delivery Details
       ↓
Select Payment Method
       ↓
Place Order
       ↓
Generate Order ID
       ↓
View My Orders
       ↓
Order History Saved in Local Storage
💾 Data Persistence

The application uses browser Local Storage to maintain important user data.

User Data
ecommerceUser
Login State
isLoggedIn
Shopping Cart
ecommerceCart
Wishlist
ecommerceWishlist
Orders
ecommerceOrders

This allows the application to retain shopping information even after refreshing the browser.

🧪 Testing

The application was tested across the major shopping workflows:

Product browsing
Product search
Category filtering
Product sorting
Product details
Wishlist functionality
Add to cart
Remove from cart
Increase product quantity
Decrease product quantity
Cart total calculation
Cart persistence
User registration
Login
Logout
Checkout validation
Cash on Delivery selection
Test payment selection
Order placement
Automatic Order ID generation
Order history
Order persistence after refresh
Responsive UI
Service Worker registration
Offline caching

The complete shopping workflow was tested from product selection through order placement and order history.

💻 Run Locally
Clone the Repository
git clone https://github.com/Pavithrapavi25/ecommerce-pwa.git
Open the Project
cd ecommerce-pwa
Start a Local Server

Because the application uses a Service Worker, it should be opened through a local web server rather than directly using the file:// protocol.

Run:

python -m http.server 5500
Open the Application

Open:

http://localhost:5500
⚙️ PWA Configuration

The application includes a Web App Manifest containing:

Application Name
Short Name
Description
Start URL
Scope
Display Mode
Theme Color
Background Color

The Service Worker is responsible for caching the main application files and providing offline-ready behavior.

📱 Progressive Web App Workflow
Browser
   ↓
Web App
   ↓
Service Worker
   ↓
Cache Storage
   ↓
Cached Application Files
   ↓
Offline Access

The Service Worker caches the core application files including:

index.html
style.css
app.js
manifest.json
🌐 Deployment

The project is structured as a static frontend application and can be deployed using services such as:

GitHub Pages
Render Static Site
Netlify
Vercel

The project source code is maintained on GitHub.

GitHub Repository:

https://github.com/Pavithrapavi25/ecommerce-pwa

🎯 Project Objective

The main objective of this project is to build a practical e-commerce application that demonstrates the complete basic shopping lifecycle while also implementing Progressive Web App concepts.

The project focuses on:

User-friendly shopping
Product discovery
Cart management
Wishlist management
Checkout workflow
Order management
Data persistence
Responsive design
Offline-ready functionality
📚 What I Learned

Through this project, I worked with:

Frontend web development
HTML5 semantic structure
CSS responsive design
JavaScript DOM manipulation
JavaScript event handling
Product filtering
Product categorization
Product sorting
Modal interfaces
Local Storage
Shopping cart calculations
Wishlist management
Form validation
Authentication flow
Checkout workflow
Order generation
Persistent order history
Progressive Web App development
Service Worker implementation
Offline caching
Git and GitHub
Project documentation
🔮 Future Improvements

Potential future enhancements include:

Backend API integration
Database-backed products
Secure server-side authentication
Real payment gateway integration
Product administration
Inventory management
Order status tracking
Customer profiles
Product reviews and ratings
Email order notifications
Advanced product filtering
Cloud-based image storage
Admin dashboard
Production-grade security
👩‍💻 Developer

Pavithra

AI & Data Science Graduate | Full-Stack Developer

This project was developed as a practical e-commerce application to demonstrate frontend development, user interaction, data persistence, responsive design and Progressive Web App functionality.

📄 License

This project is created for learning, portfolio and demonstration purposes.