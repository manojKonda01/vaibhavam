# Vaibhavam — Luxury Event Planning Marketplace

Vaibhavam is a **premium event planning marketplace platform** that connects customers with professional event planners. The platform allows users to explore planners, view event portfolios, book services, and purchase or rent event equipment such as decorations, lighting, and audio systems.

The goal of Vaibhavam is to provide a **luxury digital experience for planning memorable celebrations** including weddings, corporate events, birthdays, festivals, and private parties.

---

# Features

## Customer Features

* User registration and secure login
* Browse and search event planners
* View planner profiles and portfolios
* Request and book event planning services
* Shop event items such as decorations and equipment
* Rent or purchase event supplies
* Add products to cart and place orders
* View order history and booked events

## Planner Features

* Create and manage planner profile
* Upload event portfolio images
* Manage services offered
* Manage equipment inventory for rent or sale
* Accept or reject event booking requests
* Communicate with customers

## Admin Features

* Manage users and planners
* Approve planner profiles
* Monitor bookings and marketplace activity
* Manage event shop products

---

# Technology Stack

Frontend

* Next.js (React)
* TypeScript
* Tailwind CSS
* Framer Motion (animations)

Backend

* Node.js
* Express.js
* MVC architecture

Database

* MongoDB Atlas
* Mongoose ODM

Authentication

* JWT Access Tokens
* JWT Refresh Tokens
* Role-based authorization

Other Tools

* Cloudinary (image uploads)
* Socket.io (real-time messaging)

---

# Project Structure

```
vaibhavam/

client/
  components/
  pages/
  hooks/
  services/
  layouts/
  styles/

server/
  controllers/
  models/
  routes/
  middlewares/
  services/
  utils/
  config/

shared/
  types/

docs/

docker/
```

---

# Environment Variables

Create a `.env` file in the backend folder.

```
# JWT
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Database
MONGO_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# Installation

Clone the repository

```
git clone https://github.com/your-username/vaibhavam.git
```

Navigate to the project directory

```
cd vaibhavam
```

Install dependencies

Backend

```
cd server
npm install
```

Frontend

```
cd client
npm install
```

---

# Running the Application

Start backend server

```
cd server
npm run dev
```

Start frontend

```
cd client
npm run dev
```

Frontend will run on

```
http://localhost:3000
```

Backend will run on

```
http://localhost:5000
```

---

# API Overview

Authentication

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/refresh

Planners

* GET /api/planners
* GET /api/planners/:id
* POST /api/planners/profile

Events

* POST /api/events
* GET /api/events

Products

* GET /api/products
* POST /api/products

Cart

* GET /api/cart
* POST /api/cart/add

Orders

* POST /api/orders
* GET /api/orders

Admin

* GET /api/admin/users
* GET /api/admin/planners
* PUT /api/admin/approve-planner

---

# UI Design

Vaibhavam uses a **luxury design system**.

Color Palette

Primary
Royal Purple — #5B2E91

Secondary
Champagne Gold — #D4AF37

Accent
Rose Gold — #B76E79

Background
Soft Ivory — #FAF7F2

Typography

Headings
Playfair Display

Body
Inter

Design Style

* Luxury Minimalism
* Glassmorphism UI
* Soft shadows and elegant spacing
* Smooth transitions and animations

---

# Animations

The UI uses **Framer Motion** to implement:

* Smooth page transitions
* Hero text reveal animations
* Scroll-triggered fade-ins
* Card hover lift animations
* Parallax scrolling effects

---

# Deployment

Frontend

Deploy on **Vercel**

Backend

Deploy on **Render** or **Railway**

Database

Use **MongoDB Atlas**

---

# Security

* Password hashing with bcrypt
* JWT authentication
* Role-based authorization
* Input validation
* Environment variable protection

---

# Future Improvements

* AI event planning assistant
* Smart vendor recommendations
* Event budgeting tools
* Real-time booking notifications
* Advanced analytics dashboard

---

# Contributing

Contributions are welcome. Please create a feature branch and submit a pull request with a detailed description of the changes.

---

# License

This project is licensed under the MIT License.

---

# Vaibhavam

Create unforgettable celebrations with a **premium event planning experience**.
