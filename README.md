# Vaibhavam

<div align="center">
  <h3>Luxury Event Planning Marketplace</h3>
  <p><i>Stunning Minimalism. Pure Aesthetics. Flawless Engineering.</i></p>
</div>

---

## 🖤 Product Overview
Vaibhavam is a premium, ultra-minimalist event planning marketplace that bridges the gap between discerning customers and elite event service providers. Designed with a strict monochrome color palette, refined typography, and glassmorphic elements, it offers an editorial-style aesthetic for an unparalleled user experience.

- **Customers** can search for premium event planners, explore portfolios, book personalized events, and shop for curated event products.
- **Planners** manage their premium profiles, showcase portfolios, update inventory, and handle exclusive bookings.
- **Administrators** maintain the sanctity of the platform through user management, approvals, and system-wide monitoring.

---

## ✨ Features

### Customer
- Explore visually stunning planner portfolios.
- Book bespoke events seamlessly.
- Event Shop: Curated renting/buying of exclusive products.
- Secure Checkout & In-App Chat.

### Planner
- Clean dashboard for portfolio management.
- Direct booking calendar and service offering configurations.
- Effortless inventory control.

### Admin
- Absolute platform control securely.
- Verification and approval layers for planners.
- Global monitoring.

---

## 🛠 Tech Stack

### Frontend
- **Next.js (App Router)** - Server-Side Rendering & elite performance.
- **TypeScript** - For flawless execution and type safety.
- **Tailwind CSS** - Pixel-perfect utility-first styling.
- **Framer Motion** - Smooth, buttery transitions and parallax aesthetics.

### Backend
- **Node.js & Express** - Lightning fast API serving.
- **MongoDB (Mongoose)** - Scalable, flexible data structures.
- **JWT & bcryptjs** - Robust stateless authentication.

---

## 🎨 Design System

**Theme:** Pure Monochrome  
- Pure Black: `#000000`
- Soft Black: `#111111`
- White: `#FFFFFF`
- Light Gray: `#F5F5F5`
- Border Gray: `#E5E5E5`

**Typography:**
- Headers: `Playfair Display` (Elegant Serif)
- Body: `Inter` (Clean Sans-Serif)

**UI Elements:**
- Extremely subtle glassmorphism
- High contrast layouts with expansive whitespace
- Slow, deliberate micro-interactions and transitions

---

## 📂 Architecture & Folder Structure

```
vaibhavam/
├── backend/          # Node.js + Express Server API
│   ├── src/
│   │   ├── config/   # Environment & DB
│   │   ├── controllers/# Route handlers
│   │   ├── middleware/ # JWT Auth & Error Handling
│   │   ├── models/   # Mongoose Schemas definitions
│   │   └── routes/   # Express API Endpoints
├── frontend/         # Next.js Application
│   ├── app/          # App Router & Pages
│   ├── components/   # Reusable UI Architecture
│   ├── public/       # Static assets
│   └── lib/          # State & Utility Functions
└── README.md         # Documentation
```

---

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/manojKonda01/vaibhavam.git
   ```

2. **Environment Variables:**
   - In `/backend`, create `.env`:
     ```env
     PORT=5000
     MONGO_URI=your_mongo_db_string
     JWT_SECRET=your_jwt_signature_secret
     ```
   - In `/frontend`, configure respective API URLs.

3. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

<p align="center"><i>"Create Timeless Celebrations"</i></p>
