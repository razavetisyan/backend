# 📘 Basic Authentication Task

## 📌 Overview

This project demonstrates HTTP Basic Authentication using Node.js and Express.

The server includes:

* Public routes
* Protected routes
* Basic Authentication middleware
* User credential validation
* Fake protected data

---

# 🚀 How to Run the Project

## 1️⃣ Install dependencies

```bash id="j9gh2a"
npm install
```

---

## 2️⃣ Create `.env` file

```env id="6i8x0t"
PORT=3000
HOST=localhost
```

---

## 3️⃣ Start the server

```bash id="jlwmu4"
node server.js
```

Server will run on:

```text id="7s4s8z"
http://localhost:3000
```

---

# 👥 Hardcoded Users

```js id="z1a6uz"
[
  {
    username: "armen",
    password: "1234"
  },
  {
    username: "ani",
    password: "5678"
  },
  {
    username: "david",
    password: "9999"
  }
]
```

---

# 🌐 Routes

---

# 🟢 Public Route

Accessible without authentication.

```http id="2r49nn"
GET /api/public
```

---

## ✅ Successful Request

```bash id="s9c8vl"
curl http://localhost:3000/api/public
```

### Response

```json id="8jzjef"
{
  "message": "Public route"
}
```

---

# 🔐 Protected User Route

Returns authenticated user information.

```http id="0a83eh"
GET /api/me
```

---

## ✅ Successful Request

```bash id="sc0k1t"
curl -u armen:1234 \
http://localhost:3000/api/me
```

### Response

```json id="7qjlwm"
{
  "message": "Welcome armen",
  "username": "armen"
}
```

---

## ❌ Missing Credentials

```bash id="6pt0cq"
curl http://localhost:3000/api/me
```

### Response

```json id="1m55ca"
{
  "error": "No authorization header"
}
```

---

## ❌ Invalid Credentials

```bash id="cx66lc"
curl -u armen:wrongpassword \
http://localhost:3000/api/me
```

### Response

```json id="j7s8d6"
{
  "error": "Invalid credentials"
}
```

---

# 🔐 Protected Items Route

Returns fake protected items.

```http id="1d4gn5"
GET /api/items
```

---

## ✅ Successful Request

```bash id="bq4h9d"
curl -u ani:5678 \
http://localhost:3000/api/items
```

### Response

```json id="vj94s5"
{
  "user": "ani",
  "items": [
    {
      "id": 1,
      "name": "Laptop"
    },
    {
      "id": 2,
      "name": "Phone"
    },
    {
      "id": 3,
      "name": "Headphones"
    }
  ]
}
```

---

## ❌ Unauthorized Request

```bash id="w6r7k1"
curl http://localhost:3000/api/items
```

### Response

```json id="8t8c8d"
{
  "error": "No authorization header"
}
```

---

# 🔐 Authentication

This project uses HTTP Basic Authentication.

Credentials are sent in the `Authorization` header encoded with Base64.

Example:

```text id="e8e3b8"
Authorization: Basic YXJtZW46MTIzNA==
```

---

# ⚠️ Important Notes

* Base64 is NOT encryption
* Basic Auth should only be used over HTTPS
* This project stores users in memory for simplicity

---

# 🧠 Reflection Questions

## ❓ Why is Base64 not considered a security measure?

Base64 is only an encoding method, not encryption. Anyone can decode it and view the original credentials.

---

## ❓ What is the purpose of the WWW-Authenticate header?

The `WWW-Authenticate` header tells the client that authentication is required and specifies the authentication method.

---

## ❓ In what situations is Basic Auth acceptable?

Basic Auth is acceptable for:

* Internal tools
* Development/testing
* Simple internal APIs over HTTPS

---

# 🎯 Summary

| Route       | Method | Access    |
| ----------- | ------ | --------- |
| /api/public | GET    | Public    |
| /api/me     | GET    | Protected |
| /api/items  | GET    | Protected |

---
