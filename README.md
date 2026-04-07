# 🐄 Mi Vaquita API

![Mi Vaquita](https://res.cloudinary.com/dmaviub4l/image/upload/v1711547483/h4mcpdoav6plnxmjbpzx.svg)

**REST API for splitting expenses among friends — no more awkward money conversations.**

🔗 **Live API:** [mi-vaquita-api.onrender.com](https://mi-vaquita-api.onrender.com)  
🔗 **Frontend:** [mi-vaquita-app](https://github.com/Bethsyf/mi-vaquita-app)  
🔗 **Demo:** [mi-vaquita-app.vercel.app](https://mi-vaquita-app.vercel.app)

---

## ✨ Features

- 🔐 User authentication with JWT (register & login)
- 👥 Group management with multiple participants
- 💸 Expense tracking — record who paid and how much
- 🧮 Automatic calculation of each person's share
- 📋 Expense history per group
- 🔒 Protected routes via Passport.js

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express | Server framework |
| PostgreSQL | Relational database |
| Neon | Cloud database hosting |
| JWT | Authentication tokens |
| Passport.js | Auth middleware |
| Nodemon | Dev auto-restart |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or cloud)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Bethsyf/mi-vaquita-api.git
cd mi-vaquita-api

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your database credentials and JWT secret

# 4. Run in development mode
npm run dev
```

---

## 🌍 Environment Variables

Create a `.env` file in the root with the following variables:

```env
PGHOST=your_database_host
PGUSER=your_database_user
PGPASSWORD=your_database_password
PGDATABASE=your_database_name
PGPORT=5432
PGSSLMODE=require
PGCHANNELBINDING=require
JWT_SECRET=your_jwt_secret
DB_SSL=true
```

---

## 📡 API Endpoints

Base URL: `https://mi-vaquita-api.onrender.com/api/v1`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register a new user | ✅ |
| POST | `/auth/login` | Login and get token | ✅ |
| GET | `/groups` | Get all user groups | ✅ |
| POST | `/groups` | Create a new group | ✅ |
| GET | `/groups/:id` | Get group details | ✅ |
| POST | `/expenses` | Add an expense | ✅ |
| GET | `/expenses/:groupId` | Get group expenses | ✅ |

---

## 🎯 About This Project

This API was built to learn and practice backend development from scratch — designing a REST API, implementing JWT authentication, and connecting to a real PostgreSQL database.

**Key learnings:**
- REST API design and implementation
- JWT-based authentication flow
- PostgreSQL with SSL connection
- Environment-based configuration
- Deployment on Render with Neon database

---

## 👩‍💻 Author

**Bethsy Falcon** — Frontend Developer  
[LinkedIn](https://www.linkedin.com/in/bethsyfalcon-frontend/) · [GitHub](https://github.com/Bethsyf) · [Portfolio](https://portfolio-bfb.vercel.app)

---

## 📄 License

MIT © [Bethsy Falcon](https://github.com/Bethsyf)
