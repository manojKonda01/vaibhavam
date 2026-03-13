# Vaibhavam - Luxury Event Planning Platform

A full-stack marketplace platform connecting customers with professional event planners for creating unforgettable celebrations.

## 🚀 Features

### For Customers
- Browse and search professional event planners
- View detailed planner profiles and portfolios
- Book event planning services
- Rent or buy event equipment
- Real-time chat with planners
- Manage upcoming events and bookings

### For Event Planners
- Create professional profiles
- Upload portfolio images
- Manage services and pricing
- Handle equipment inventory
- Receive and manage bookings
- Communicate with clients

### For Admins
- User and planner management
- Approve planner applications
- Monitor platform analytics
- Manage marketplace products

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB Atlas** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Authentication & Security
- **JWT** - Access and refresh tokens
- **bcryptjs** - Password hashing
- **Role-based authorization**

### Real-time Features
- **Socket.io** - Real-time messaging

### File Storage
- **Cloudinary** - Image storage and optimization

### Deployment
- **Vercel** - Frontend deployment
- **Render/Railway** - Backend deployment

## 📁 Project Structure

```
vaibhavam/
├── client/                 # Next.js frontend
│   ├── app/               # Next.js app router
│   ├── components/        # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service functions
│   ├── contexts/         # React contexts
│   ├── layouts/          # Layout components
│   └── styles/           # Global styles
├── server/                # Express.js backend
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── middlewares/  # Custom middlewares
│   │   ├── services/     # Business logic services
│   │   ├── utils/        # Helper utilities
│   │   └── config/       # Configuration files
│   └── dist/             # Compiled JavaScript
├── shared/                # Shared types/interfaces
├── docs/                  # Documentation
└── docker/                # Docker configurations
```

## 🗄 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String,
  password: String,
  role: 'customer' | 'planner' | 'admin',
  phone: String,
  address: Object,
  isVerified: Boolean,
  refreshTokens: [String]
}
```

### Planners Collection
```javascript
{
  userId: ObjectId,
  businessName: String,
  description: String,
  location: Object,
  rating: Number,
  portfolioImages: [String],
  services: [String],
  experience: Number,
  isApproved: Boolean
}
```

### Events Collection
```javascript
{
  customerId: ObjectId,
  plannerId: ObjectId,
  eventType: String,
  eventDate: Date,
  location: Object,
  budget: Number,
  status: String,
  notes: String
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/vaibhavam.git
   cd vaibhavam
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   cp .env.local.example .env.local
   # Configure your environment variables
   npm run dev
   ```

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🐳 Docker Deployment

### Build and run with Docker Compose
```bash
docker-compose up --build
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Configure environment variables
5. Deploy

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

### Planners
- `GET /api/planners` - Get all approved planners
- `GET /api/planners/:id` - Get planner details
- `POST /api/planners/profile` - Create/update planner profile
- `POST /api/planners/portfolio` - Upload portfolio images

### Events
- `POST /api/events` - Create new event booking
- `GET /api/events` - Get user's events
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id/status` - Update event status

### Shop
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

## 🎨 Design System

### Colors
- **Primary**: Royal Purple (#5B2E91)
- **Secondary**: Champagne Gold (#D4AF37)
- **Accent**: Rose Gold (#B76E79)
- **Background**: Soft Ivory (#FAF7F2)

### Typography
- **Headings**: Playfair Display
- **Body**: Inter

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 📞 Support

For support, email support@vaibhavam.com or join our Discord community.

---

Built with ❤️ for creating unforgettable celebrations