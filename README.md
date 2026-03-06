# Role-Based Product Management System - Simple

A full-stack application for managing products with **JWT authentication** and **role-based access control**.

---

## Backend Setup

### 1. Navigate to backend

```
cd backend
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
MONGO_URL=
PORT=8000
FRONTEND_URL=http://localhost:5173

NODE_ENV=development
API_ENDPOINT=localhost:8000

REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_SECRET=
```

### 4. Run backend

```
npm run dev
```

Backend runs at:

```
http://localhost:8000
```

---

# Frontend Setup

### 1. Navigate to frontend

```
cd frontend
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
VITE_API_URL=http://localhost:8000/api
```

### 4. Run frontend

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# API Endpoints

### Auth

```
POST /auth/register
POST /auth/login
```

### Products

```
GET    /products
GET    /products/:id
POST   /products        (Admin only)
PUT    /products/:id    (Admin only)
DELETE /products/:id    (Admin only)
```

---

# Author

Amal Jose
