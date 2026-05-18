# Authentication Tasks Project

This project contains three separate backend authentication implementations using Express.js.

---

## 📦 1. Basic Auth Task

- Implements HTTP Basic Authentication
- Credentials are sent via Authorization header (Base64 encoded)
- Middleware verifies username and password
- Only protected routes require authentication

---

## 🔑 2. API Key Task

- Uses API keys for authentication
- Each key has associated permissions
- Middleware checks:
  - key exists
  - key is valid
  - permissions match route requirements

---

## 🔐 3. JWT Task

- Full authentication system using JSON Web Tokens
- Features:
  - User registration (hashed passwords)
  - Login with JWT token generation
  - Protected routes using middleware
  - Frontend served from public folder

---

## 🚀 General Notes

- All secrets are stored in environment variables (.env)
- Passwords are hashed using bcrypt
- JWT tokens expire in 1 hour
- Frontend communicates with backend via fetch API
- No database used (in-memory storage only)

---

## ▶️ How to run

Each task has its own folder:

```bash
cd basic-auth-task
npm install
node server.js



---

# 📘 BASIC-AUTH README

```md id="r2"
# Basic Auth Task

## Description
Implements HTTP Basic Authentication using Express middleware.

## How it works
- Client sends username:password encoded in Base64
- Server decodes and verifies credentials

## Run
npm install
node server.js

## Test
curl -u admin:1234 http://localhost:3000/protected

# API Key Task

## Description
Authentication using API keys + permissions system.

## Features
- API key validation
- Permission-based access control

## Example Header
x-api-key: your_key_here

## Run
npm install
node server.js

## Example request
curl -H "x-api-key: abc123" http://localhost:3000/products

# JWT Task

## Description
Full authentication system using JWT.

## Features
- Register user (hashed password)
- Login user (JWT token)
- Protected routes
- Frontend (HTML/CSS/JS)

## Environment variables
Create .env file:

PORT=3000
JWT_SECRET=your_secret

## Run
npm install
node server.js

## Frontend
Open:
http://localhost:3000/login.html

## Flow
Register → Login → Token stored → Dashboard → Protected API

PORT=3000
JWT_SECRET=your_secret_key