# Internship Management Platform

A simple microservices-based Internship Management Platform with React, Node.js, Express, MongoDB, JWT authentication, and REST API communication.

## Architecture

```text
project/
├── frontend/              React application
├── auth-service/          Registration, login, password hashing, JWT generation
└── dashboard-service/     Protected dashboard APIs and JWT verification
```

Both backend services use MongoDB Atlas. For simplicity, the dashboard service reads the user profile from the same `internship_platform` database and `users` collection created by the auth service.

## Installation Commands

Run these commands from the project root:

```bash
cd auth-service
npm install

cd ../dashboard-service
npm install

cd ../frontend
npm install
```

## Environment Setup

Create `.env` files from the examples:

```bash
cp auth-service/.env.example auth-service/.env
cp dashboard-service/.env.example dashboard-service/.env
cp frontend/.env.example frontend/.env
```

Use the same `MONGO_URI` and `JWT_SECRET` in both backend services.

## MongoDB Atlas Setup

1. Create or open a MongoDB Atlas account.
2. Create a free cluster.
3. Go to **Database Access** and create a database user with a username and password.
4. Go to **Network Access** and add your current IP address. For classroom/demo use only, you can allow access from anywhere with `0.0.0.0/0`.
5. Go to **Database > Connect > Drivers** and copy the Node.js connection string.
6. Replace `<db_user>`, `<db_password>`, and `<cluster-url>` in the `.env` files.
7. Keep `/internship_platform` in the URI so both services use the same database.

Atlas URI format:

```env
MONGO_URI=mongodb+srv://<db_user>:<db_password>@<cluster-url>/internship_platform?retryWrites=true&w=majority
```

If your password has special characters like `@`, `#`, `/`, or `:`, URL-encode them before pasting the password into the URI.

### Auth Service `.env`

```env
PORT=5002
MONGO_URI=mongodb+srv://<db_user>:<db_password>@<cluster-url>/internship_platform?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

### Dashboard Service `.env`

```env
PORT=5003
MONGO_URI=mongodb+srv://<db_user>:<db_password>@<cluster-url>/internship_platform?retryWrites=true&w=majority
JWT_SECRET=replace_with_the_same_secret_as_auth_service
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_AUTH_API_URL=http://localhost:5002/api/auth
VITE_DASHBOARD_API_URL=http://localhost:5003/api/dashboard
```

## Running the Project

Make sure your MongoDB Atlas cluster is active and your IP address is allowed in Atlas Network Access.

Then open three terminals:

```bash
cd auth-service
npm run dev
```

```bash
cd dashboard-service
npm run dev
```

```bash
cd frontend
npm run dev
```

Open the frontend at:

```text
http://localhost:5173
```

## API Documentation

### Register User

`POST http://localhost:5002/api/auth/register`

Request:

```json
{
  "fullName": "Aarav Sharma",
  "email": "aarav@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Success response:

```json
{
  "message": "Registration successful.",
  "user": {
    "id": "665f1bfc5e9c7b52cf98f123",
    "fullName": "Aarav Sharma",
    "email": "aarav@example.com",
    "createdAt": "2026-06-04T08:00:00.000Z"
  }
}
```

Validation response:

```json
{
  "message": "Email is already registered."
}
```

### Login User

`POST http://localhost:5002/api/auth/login`

Request:

```json
{
  "email": "aarav@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "message": "Login successful.",
  "token": "jwt_token_here",
  "user": {
    "id": "665f1bfc5e9c7b52cf98f123",
    "fullName": "Aarav Sharma",
    "email": "aarav@example.com",
    "createdAt": "2026-06-04T08:00:00.000Z"
  }
}
```

Invalid credentials response:

```json
{
  "message": "Invalid email or password."
}
```

### Get Dashboard

`GET http://localhost:5001/api/dashboard`

Headers:

```text
Authorization: Bearer jwt_token_here
```

Success response:

```json
{
  "message": "Welcome back, Aarav Sharma!",
  "userName": "Aarav Sharma",
  "email": "aarav@example.com",
  "registrationDate": "2026-06-04T08:00:00.000Z"
}
```

Unauthorized response:

```json
{
  "message": "Authorization token is required."
}
```

## Frontend Features

- Register page with input validation feedback from the auth service
- Login page that stores the JWT and user data in `localStorage`
- Protected dashboard route using React Router
- Axios clients for service-specific REST APIs
- Logout button that clears local authentication state

## Security Features

- Passwords are hashed with bcrypt before saving
- JWTs are signed by the auth service and verified by the dashboard service
- Secrets and database URLs are read from environment variables
- Basic input validation and duplicate email checks
- Central not-found responses and controller-level error handling

## Project Notes

- Keep the `JWT_SECRET` identical in `auth-service/.env` and `dashboard-service/.env`.
- Keep the `MONGO_URI` identical in `auth-service/.env` and `dashboard-service/.env`.
- The dashboard service intentionally selects only public user fields and never returns the password hash.
- In production, use HTTPS, a stronger secret management approach, stricter CORS origins, request rate limiting, and a dedicated validation library such as Joi or Zod.
