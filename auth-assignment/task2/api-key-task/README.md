# 📘 API Key Authentication Task

## 📌 Overview

This project demonstrates API Key Authentication using Node.js and Express.

The server protects routes using a custom `X-API-Key` header and permission-based authorization.

Features:

* API Key authentication
* Permission-based authorization (`read`, `write`)
* Public route
* Protected GET and POST routes
* Middleware architecture

---

# 🚀 How to Run the Project

## 1️⃣ Install dependencies

```bash
npm install
```

---

## 2️⃣ Create `.env` file

```env
PORT=3000
HOST=localhost
```

---

## 3️⃣ Start the server

```bash
node server.js
```

Server runs on:

```text
http://localhost:3000
```

---

# 👥 API Clients

```js
[
  {
    name: "Client A",
    apiKey: "a1b2c3d4",
    permissions: ["read"]
  },
  {
    name: "Client B",
    apiKey: "e5f6g7h8",
    permissions: ["read", "write"]
  },
  {
    name: "Client C",
    apiKey: "i9j0k1l2",
    permissions: ["read"]
  }
]
```

---

# 🌐 API Routes

---

## 🟢 Public Route

No API key required.

```http
GET /api/status
```

### Example

```bash
curl http://localhost:3000/api/status
```

### Response

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

# 🔐 Protected GET Route (Read Permission)

Returns a list of products.

```http
GET /api/products
```

---

## ✅ Successful Request

```bash
curl -H "X-API-Key: a1b2c3d4" \
http://localhost:3000/api/products
```

### Response

```json
{
  "client": "Client A",
  "products": [
    { "id": 1, "name": "Laptop" },
    { "id": 2, "name": "Phone" }
  ]
}
```

---

## ❌ Missing Header

```bash
curl http://localhost:3000/api/products
```

### Response

```json
{
  "error": "X-API-Key header is missing"
}
```

---

## ❌ Invalid API Key

```bash
curl -H "X-API-Key: wrongkey" \
http://localhost:3000/api/products
```

### Response

```json
{
  "error": "Invalid API key"
}
```

---

## ❌ Missing Permission

```bash
curl -H "X-API-Key: invalid-read-client" \
http://localhost:3000/api/products
```

### Response

```json
{
  "error": "Missing 'read' permission"
}
```

---

# 🔐 Protected POST Route (Write Permission)

Creates a new product.

```http
POST /api/products
```

---

## ✅ Successful Request

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "X-API-Key: e5f6g7h8" \
-d '{"name":"Mouse"}' \
http://localhost:3000/api/products
```

### Response

```json
{
  "message": "Product created successfully",
  "product": {
    "id": 3,
    "name": "Mouse"
  }
}
```

---

## ❌ Missing Write Permission

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "X-API-Key: a1b2c3d4" \
-d '{"name":"Mouse"}' \
http://localhost:3000/api/products
```

### Response

```json
{
  "error": "Missing 'write' permission"
}
```

---

# ⚠️ Notes

* API keys are sent using the `X-API-Key` header
* Authentication identifies the client
* Authorization checks permissions
* Routes use middleware for security

---

# 🧠 What You Learn

* API Key authentication
* Express middleware
* Permission-based authorization
* Protected API routes
* Request validation

---

# 🎯 Summary

| Route         | Method | Access                      |
| ------------- | ------ | --------------------------- |
| /api/status   | GET    | Public                      |
| /api/products | GET    | Requires `read` permission  |
| /api/products | POST   | Requires `write` permission |

---
