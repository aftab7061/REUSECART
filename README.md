# ReUseCart 🛍️

A full-stack MERN marketplace for buying and selling used items.

**Stack:** React (Vite) · Node.js/Express · MongoDB · JWT Auth · Cloudinary · Context API · Axios

---

## 📁 Project Structure

```
reusecart/
├── server/                  # Express + MongoDB backend
│   ├── config/               # DB & Cloudinary config
│   ├── controllers/          # Route handler logic (MVC "C")
│   ├── models/                # Mongoose schemas (MVC "M")
│   ├── routes/                # Express routers
│   ├── middleware/            # Auth, upload, error handling
│   ├── utils/                  # Helpers (JWT signing)
│   ├── server.js              # App entry point
│   └── .env.example
│
└── client/                   # React + Vite frontend
    ├── src/
    │   ├── components/        # Reusable UI components
    │   ├── pages/              # Route-level pages
    │   ├── context/            # Auth, Theme, Toast Context API providers
    │   ├── hooks/               # Custom hooks (useAuth, useToast, useDebounce...)
    │   ├── services/            # Axios API call wrappers
    │   ├── App.jsx
    │   └── main.jsx
    └── .env.example
```

---

## ⚙️ Prerequisites

- Node.js v18+
- A MongoDB database (local install or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier)
- A free [Cloudinary](https://cloudinary.com/) account (for image uploads)

---

## 🚀 Backend Setup (`/server`)

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` with your own values:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/resellhub
# or your Atlas connection string

JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

Run the server:

```bash
npm run dev      # nodemon (auto-restart on changes)
# or
npm start        # plain node
```

The API will be running at `http://localhost:5000/api`.
Health check: `GET http://localhost:5000/api/health`

---

## 💻 Frontend Setup (`/client`)

```bash
cd client
npm install
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:5173`.

---

## 🔑 API Endpoints Overview

### Auth (`/api/auth`)
| Method | Endpoint        | Access  | Description          |
|--------|------------------|---------|------------------------|
| POST   | `/register`     | Public  | Register new user     |
| POST   | `/login`        | Public  | Login, returns JWT    |
| GET    | `/me`           | Private | Get logged-in user     |

### Products (`/api/products`)
| Method | Endpoint              | Access  | Description                          |
|--------|------------------------|---------|----------------------------------------|
| GET    | `/`                    | Public  | List products (search/filter/paginate) |
| GET    | `/:id`                 | Public  | Get single product                     |
| GET    | `/my-listings`         | Private | Get logged-in user's listings          |
| POST   | `/`                    | Private | Create product (multipart, up to 6 images) |
| PUT    | `/:id`                 | Private | Update product (owner only)            |
| DELETE | `/:id`                 | Private | Delete product (owner only)            |
| PATCH  | `/:id/sold`            | Private | Mark product as Sold                   |
| DELETE | `/:id/images`         | Private | Remove a single image from a product   |

Query params for `GET /api/products`: `search`, `category`, `condition`, `minPrice`, `maxPrice`, `page`, `limit`, `status`

### Wishlist (`/api/wishlist`) — all private
| Method | Endpoint              | Description                  |
|--------|------------------------|--------------------------------|
| GET    | `/`                    | Get user's wishlist (populated)|
| POST   | `/`                    | Add product (`{ productId }`)  |
| DELETE | `/:productId`         | Remove product from wishlist   |
| GET    | `/check/:productId`   | Check if product is wishlisted |

### Users (`/api/users`) — all private
| Method | Endpoint              | Description                       |
|--------|------------------------|-------------------------------------|
| PUT    | `/profile`            | Update name/phone/location/avatar  |
| PUT    | `/change-password`   | Change password                     |

All private routes require header: `Authorization: Bearer <token>`

---

## 🗄️ Database Collections

**User**: `name, email, password (hashed), avatar, phone, location, timestamps`

**Product**: `title, description, price, images[], category, condition, location, sellerId (ref User), status (Available/Sold), timestamps`

**Wishlist**: `userId (ref User), productId (ref Product), timestamps` — unique compound index prevents duplicates

---

## ✨ Features Implemented

- JWT authentication with bcrypt password hashing
- Protected routes (frontend `ProtectedRoute` + backend `protect` middleware)
- Full CRUD for product listings with multi-image upload via Cloudinary
- Category & condition enums (New / Like New / Good / Fair)
- Search by title, filter by category & price range, server-side pagination
- Wishlist add/remove/check
- Mark listing as Sold
- Profile editing with avatar upload, password change
- Context API for Auth, Theme (dark mode), and Toast notifications
- Mobile-first, fully responsive UI with reusable components
- Loading states (spinners) and empty states throughout
- Centralized error handling & validation on the backend

---

## 🛠️ Notes for Production

- Replace `JWT_SECRET` with a strong, random value.
- Set `NODE_ENV=production` to suppress stack traces in API error responses.
- Configure CORS `CLIENT_URL` to your deployed frontend domain.
- Consider adding rate limiting (e.g. `express-rate-limit`) on auth routes.
- Add server-side request validation library (e.g. `express-validator`, already in `package.json`) for stricter input checks if desired.
