# 🚀 Case 1 Full Stack - Product Management System

Modern Full Stack uygulaması - .NET 8.0 Backend + Next.js 14+ Frontend

**Full Stack Developer 1. ve 2. Aşama gereksinimlerini karşılar:**
- ✅ .NET Backend API (Onion Architecture + CQRS + JWT + Redis)
- ✅ Next.js Frontend (TypeScript + TailwindCSS + RTK + i18n)
- ✅ Complete Product CRUD Operations
- ✅ JWT Authentication & Authorization
- ✅ Shopping Cart with Redux State Management
- ✅ Multi-language Support (EN/TR)
- ✅ Responsive Design & SEO Optimized

---

## 🛠️ Quick Start

### 📋 Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/) 
- [Redis](https://redis.io/download)

### 🚀 Installation & Setup

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/ekremsekmen/Case_1_2_FullStack.git
cd Case_1_2_FullStack
```

#### 2️⃣ Backend Setup
```bash
cd backend

# Restore dependencies
dotnet restore

# Setup database (PostgreSQL)
# Update connection string in appsettings.Development.json if needed
dotnet ef database update

# Run backend
dotnet run
```
**Backend will run on:** http://localhost:5125

#### 3️⃣ Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create environment file (optional - defaults are set in next.config.ts)
cp .env.example .env.local
# Edit .env.local with your configuration if needed

# Run frontend
npm run dev
```
**Frontend will run on:** http://localhost:3000

---

## 🏗️ Project Structure

```
Case_1_2_FullStack/
├── 🔧 backend/                     # .NET 8.0 Web API
│   ├── API/                        # Controllers & Endpoints
│   ├── Core/                       # Domain & Application Logic
│   │   ├── Domain/                 # Entities
│   │   └── Application/            # CQRS Commands/Queries
│   ├── Infrastructure/             # Data Access & Services
│   └── Middleware/                 # Global Exception Handling
├── 🎨 frontend/                    # Next.js 14+ Application
│   ├── src/
│   │   ├── app/                    # App Router Pages
│   │   ├── components/             # Reusable Components
│   │   ├── store/                  # Redux Store & Slices
│   │   ├── services/               # API Services
│   │   └── providers/              # Context Providers
│   ├── messages/                   # i18n Translation Files
│   └── .env.local                  # Environment Variables
└── 📄 README.md                   # This file
```

---

## 🎯 Features

### 🔐 Authentication System
- **User Registration** with validation
- **JWT Login** with secure token storage
- **Protected Routes** with middleware
- **User Profile** management

### 📦 Product Management
- **CRUD Operations** (Create, Read, Update, Delete)
- **Product Listing** with pagination
- **Product Details** with dynamic routing
- **Category Filtering** and search
- **Price Range** filtering
- **Sort by** name, price, date

### 🛒 Shopping Cart
- **Add/Remove Products** with Redux state
- **Quantity Management** 
- **Cart Persistence** with localStorage
- **Total Calculation** with real-time updates

### 🌍 Multi-language Support
- **English (EN)** and **Turkish (TR)**
- **Dynamic Language Switching**
- **Localized Content** and formatting

### 🎨 Modern UI/UX
- **Responsive Design** (Mobile-first)
- **TailwindCSS** styling
- **Loading States** and error handling
- **Toast Notifications**
- **SEO Optimized** with meta tags

---

## 📋 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | User registration | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/auth/profile` | Get user profile | ✅ |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Get all products (cached) | ❌ |
| GET | `/api/products/{id}` | Get product by ID | ❌ |
| POST | `/api/products` | Create new product | ✅ |
| PUT | `/api/products/{id}` | Update product | ✅ |
| DELETE | `/api/products/{id}` | Delete product | ✅ |

---

## 🧪 Testing

### Backend API Testing
```bash
cd backend

# Test with curl
curl -X GET "http://localhost:5125/api/products"

# Or use the provided .http file
# Open Case_1_2.http in VS Code with REST Client extension
```

### Frontend Testing
```bash
cd frontend

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

---

## ⚙️ Configuration

### Backend Configuration
Update `backend/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=ProductDb_Dev;Username=postgres;Password=your_password",
    "Redis": "localhost:6379"
  },
  "JWT": {
    "SecretKey": "your-secret-key-here",
    "Issuer": "Case1API",
    "Audience": "Case1APIUsers",
    "AccessTokenExpiryMinutes": 60
  }
}
```

### Frontend Configuration
Create `frontend/.env.local` (optional - defaults are provided):

```env
NEXT_PUBLIC_API_URL=http://localhost:5125/api
NEXT_PUBLIC_AUTH_STORAGE_KEY=case1_auth_token
NEXT_PUBLIC_APP_NAME=Case 1 Full Stack
NODE_ENV=development
```

**Note**: Default values are already configured in `next.config.ts`, so `.env.local` is optional unless you need custom values.

---

## 🔧 Troubleshooting

### Backend Issues

**PostgreSQL Connection Error:**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql  # Linux
brew services list | grep postgres  # macOS

# Create database if not exists
createdb ProductDb_Dev
```

**Redis Connection Error:**
```bash
# Check Redis status
redis-cli ping  # Should return PONG

# Start Redis
redis-server  # Default port 6379
```

**Migration Issues:**
```bash
cd backend
dotnet ef database drop
dotnet ef database update
```

### Frontend Issues

**Port Already in Use:**
```bash
# Kill process using port 3000
kill -9 $(lsof -t -i:3000)

# Or use different port
npm run dev -- -p 3001
```

**Module Not Found:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Tech Stack

### Backend (.NET 8.0)
- **ASP.NET Core Web API** - REST API framework
- **Onion Architecture** - Clean code structure  
- **CQRS Pattern** - Command/Query separation
- **MediatR** - Request/response handling
- **Entity Framework Core** - ORM
- **PostgreSQL** - Database
- **Redis** - Caching
- **JWT** - Authentication
- **Serilog** - Logging
- **Swagger** - API documentation

### Frontend (Next.js 14+)
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **Redux Toolkit (RTK)** - State management
- **Next-intl** - Internationalization
- **Axios** - HTTP client
- **Lucide React** - Icons
- **SSR/ISR** - Server-side rendering

---

## 🎯 Development Workflow

### 1️⃣ Full Stack Developer - Stage 1 ✅
- ✅ Basic backend API development
- ✅ Simple frontend with product listing
- ✅ Product add/list functionality
- ✅ Clean component structure

### 2️⃣ Full Stack Developer - Stage 2 ✅
- ✅ Advanced architecture (Onion + CQRS)
- ✅ JWT authentication system
- ✅ Redis caching with invalidation
- ✅ Multi-language support (EN/TR)
- ✅ Shopping cart with RTK state
- ✅ Product filtering & sorting
- ✅ SEO optimization with SSR/ISR
- ✅ Dynamic meta tags

---

## 📞 Support

**Issues & Questions:**
1. Check this README first
2. Review the troubleshooting section
3. Check logs in `backend/logs/` directory
4. Open GitHub issue if needed

**🧑‍💻 Developer:** [Ekrem Sekmen](mailto:ekremsekmenq@gmail.com)

---

## 🏆 Project Highlights

- 🎯 **Complete Full Stack Implementation**
- 🏗️ **Clean Architecture** with SOLID principles
- 🔒 **Secure Authentication** with JWT
- ⚡ **High Performance** with Redis cache
- 🌍 **Multi-language Support** 
- 📱 **Mobile Responsive** design
- 🔍 **SEO Optimized** with Next.js SSR
- 🛒 **Advanced Shopping Cart** functionality
- 📊 **Professional Code Quality**
- 🚀 **Production Ready**

**Perfect for showcasing modern full-stack development skills!** 🎉