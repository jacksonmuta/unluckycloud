# 🛍️ unlucky.cloud – eCommerce Web App

## 📌 Overview
unlucky.cloud is a modern eCommerce web application built with React for selling premium hoodies. The platform provides a clean, responsive shopping experience with authentication, cart management, and an admin dashboard. Users can browse products freely, but must log in to make purchases.

## 🚀 Features

### 👤 User Features
- Browse products without logging in  
- User authentication (Login & Signup required for purchase)  
- View detailed product pages  
- Add products to cart  
- Update cart (change quantity or remove items)  
- Checkout with multiple payment options (UI): Stripe, PayPal, Cash App  

### 🛒 Product Features
- Product listing in a responsive grid layout  
- Product filtering (size, price, color)  
- Individual product detail pages  
- Interactive product cards with images, pricing, and actions  

### 🔐 Authentication
- Secure login and registration interface  
- Protected routes for checkout and purchasing  
- Session-based user state management  

### 🧑‍💼 Admin Panel (Frontend)
- Add new hoodie products  
- Edit existing products  
- Delete products  
- Manage product attributes (name, price, description, images, sizes)  

## 🛠️ Tech Stack
- Frontend Framework: React (Functional Components + Hooks)  
- UI Library: Material UI (MUI)  
- Routing: React Router  
- State Management: Context API / useState  
- Styling: MUI with custom theme  
- Icons: MUI Icons / Lucide Icons  

## 🎨 Design System
The application follows a minimal and modern design approach using a professional color palette. Primary colors include black and charcoal, supported by white or off-white backgrounds, with accent tones of muted purple or deep blue. The interface uses card-based layouts, soft shadows, rounded corners, and smooth hover animations to enhance user experience. The design is fully responsive across all screen sizes.

## 📂 Project Structure
src/
 ├── components/
 │    ├── Navbar/
 │    ├── Footer/
 │    ├── ProductCard/
 │    ├── CartItem/
 │
 ├── pages/
 │    ├── Home/
 │    ├── Products/
 │    ├── ProductDetails/
 │    ├── Cart/
 │    ├── Checkout/
 │    ├── Login/
 │    ├── Signup/
 │    ├── Admin/
 │
 ├── context/
 │    ├── AuthContext.js
 │    ├── CartContext.js
 │
 ├── data/
 │    ├── products.js
 │
 ├── theme/
 │    ├── theme.js
 │
 ├── App.js
 └── main.js

## 🔄 Application Flow
A user visits the homepage and browses available hoodies. They can view detailed product information and add items to their cart. Before proceeding to checkout, the user must log in or create an account. Once authenticated, they can complete the checkout process by selecting a payment method and confirming the purchase (UI simulation).

## 💳 Payment Integration (Frontend Only)
The application provides a user interface for multiple payment methods including Stripe, PayPal, and Cash App. These integrations are currently UI-based and require backend services for real transaction processing.

## 🔒 Authentication Logic
Users must be authenticated to access checkout and complete purchases. Public access is allowed for browsing products and viewing product details. Protected routes ensure that only logged-in users can proceed with transactions.

## 📱 Responsiveness
The application is fully responsive and optimized for mobile devices, tablets, and desktop screens, ensuring a consistent user experience across all platforms.

## 🧪 Future Improvements
Future enhancements may include backend integration (Node.js or Spring Boot), real payment processing, order history tracking, wishlist functionality, product reviews and ratings, and an advanced admin analytics dashboard.

## ⚙️ Installation & Setup
Clone the repository, install dependencies, and run the development server:

git clone https://github.com/your-username/unlucky-cloud.git  
cd unlucky-cloud  
npm install  
npm run dev  

## 📄 License
This project is intended for educational and commercial use.

## 👨‍💻 Author
jackson muta
