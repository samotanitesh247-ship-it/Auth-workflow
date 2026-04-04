<div align="center">

<!-- Animated Header Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0D1117,50:161B22,100:6E40C9&height=250&section=header&text=🔐%20Auth%20Workflow&fontSize=60&fontColor=E6EDF3&fontAlignY=35&desc=Production-Grade%20Authentication%20System&descSize=18&descColor=8B949E&descAlignY=55&animation=fadeIn" width="100%" />

<!-- Typing Animation -->
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&duration=3000&pause=1000&color=6E40C9&center=true&vCenter=true&multiline=true&repeat=true&width=700&height=100&lines=Secure+%E2%80%A2+Scalable+%E2%80%A2+Session-Based;JWT+Access+%2B+Refresh+Tokens+%F0%9F%94%91;OTP+Email+Verification+%E2%9C%89%EF%B8%8F;Built+with+Node.js+%2B+Express+%2B+MongoDB" alt="Typing SVG" /></a>

<br/>

<!-- Animated Badges -->
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-0078D4?style=for-the-badge&logo=maildotru&logoColor=white)](https://nodemailer.com/)

<br/>

<!-- Stats Badges -->
![GitHub stars](https://img.shields.io/github/stars/samotanitesh247-ship-it/Auth-workflow?style=social)
![GitHub forks](https://img.shields.io/github/forks/samotanitesh247-ship-it/Auth-workflow?style=social)
![GitHub issues](https://img.shields.io/github/issues/samotanitesh247-ship-it/Auth-workflow?color=6E40C9)
![GitHub license](https://img.shields.io/github/license/samotanitesh247-ship-it/Auth-workflow?color=6E40C9)

</div>

<br/>

<!-- Animated Divider -->
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## 🌟 Overview

> **Auth Workflow** is a **production-grade**, **session-based authentication system** built with modern Node.js best practices. It implements the full auth lifecycle — registration, email verification via OTP, login with dual JWT tokens, session management, and secure logout — all wrapped in a clean, modular architecture.

<br/>

<!-- Architecture Animation -->
<div align="center">

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║   ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐   ║
║   │  Client  │────▶│  Express │────▶│Controllers│────▶│  MongoDB │   ║
║   │  (API)   │◀────│  Router  │◀────│ + Services│◀────│  Models  │   ║
║   └──────────┘     └──────────┘     └──────────┘     └──────────┘   ║
║        │                                    │                        ║
║        │            ┌──────────┐            │                        ║
║        └───────────▶│   JWT    │◀───────────┘                        ║
║                     │  Tokens  │                                     ║
║                     └──────────┘                                     ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## ✨ Features

<div align="center">
<table>
<tr>
<td align="center" width="25%">

### 🔐
### Secure Registration
SHA-256 password hashing with duplicate user detection

</td>
<td align="center" width="25%">

### ✉️
### Email Verification
6-digit OTP sent via Gmail OAuth2 with Nodemailer

</td>
<td align="center" width="25%">

### 🎟️
### Dual JWT Tokens
15min Access Token + 7-day Refresh Token rotation

</td>
<td align="center" width="25%">

### 🛡️
### Session Management
Per-device sessions with IP & User-Agent tracking

</td>
</tr>
<tr>
<td align="center" width="25%">

### 🔄
### Token Refresh
Automatic refresh token rotation for enhanced security

</td>
<td align="center" width="25%">

### 🚪
### Smart Logout
Single device & all-device logout support

</td>
<td align="center" width="25%">

### 🍪
### Secure Cookies
HttpOnly, Secure, SameSite=Strict cookie config

</td>
<td align="center" width="25%">

### 📦
### Modular Code
Clean MVC architecture with service layer

</td>
</tr>
</table>
</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🔄 Authentication Flow

<div align="center">

### 📝 Registration Flow

```mermaid
sequenceDiagram
    participant C as 🖥️ Client
    participant S as ⚡ Server
    participant DB as 🗄️ MongoDB
    participant E as ✉️ Email

    C->>S: POST /api/auth/register
    Note over C,S: { username, email, password }
    S->>DB: Check duplicate user
    alt User Exists
        DB-->>S: User found
        S-->>C: 409 Conflict
    else New User
        S->>S: SHA-256 hash password
        S->>DB: Create user (verified: false)
        S->>S: Generate 6-digit OTP
        S->>S: SHA-256 hash OTP
        S->>DB: Store OTP record
        S->>E: Send OTP email
        S-->>C: 201 Created ✅
    end
```

<br/>

### ✉️ Email Verification Flow

```mermaid
sequenceDiagram
    participant C as 🖥️ Client
    participant S as ⚡ Server
    participant DB as 🗄️ MongoDB

    C->>S: GET /api/auth/verify-email
    Note over C,S: ?email=...&otp=123456
    S->>S: SHA-256 hash received OTP
    S->>DB: Find matching OTP record
    alt Valid OTP
        S->>DB: Set user.emailVerified = true
        S->>DB: Delete all OTP records for email
        S-->>C: 200 OK ✅ Email Verified!
    else Invalid OTP
        S-->>C: 400 Bad Request ❌
    end
```

<br/>

### 🔑 Login Flow

```mermaid
sequenceDiagram
    participant C as 🖥️ Client
    participant S as ⚡ Server
    participant DB as 🗄️ MongoDB

    C->>S: POST /api/auth/login
    Note over C,S: { email, password }
    S->>DB: Find user by email
    alt User Not Found
        S-->>C: 404 Not Found
    else User Not Verified
        S-->>C: 403 Forbidden
    else Valid User
        S->>S: Hash & compare password
        alt Wrong Password
            S-->>C: 401 Unauthorized
        else Correct Password
            S->>S: Generate Refresh Token (7d)
            S->>S: Hash refresh token
            S->>DB: Create session record
            Note over DB: Stores: userId, tokenHash, IP, userAgent
            S->>S: Generate Access Token (15m)
            Note over S: Contains: userId + sessionId
            S-->>C: Set-Cookie: refreshToken (HttpOnly)
            S-->>C: 200 OK + accessToken 🎟️
        end
    end
```

<br/>

### 🔄 Token Refresh Flow

```mermaid
sequenceDiagram
    participant C as 🖥️ Client
    participant S as ⚡ Server
    participant DB as 🗄️ MongoDB

    C->>S: GET /api/auth/refresh-token
    Note over C,S: Cookie: refreshToken=...
    S->>S: Verify JWT signature
    S->>S: Hash refresh token
    S->>DB: Find active session
    alt Session Not Found
        S-->>C: 401 Unauthorized ❌
    else Valid Session
        S->>S: Generate new Access Token (15m)
        S->>S: Generate new Refresh Token (7d)
        S->>S: Hash new refresh token
        S->>DB: Update session with new hash
        Note over S,DB: 🔄 Token Rotation!
        S-->>C: Set-Cookie: new refreshToken
        S-->>C: 200 OK + new accessToken 🎟️
    end
```

<br/>

### 🚪 Logout Flow

```mermaid
sequenceDiagram
    participant C as 🖥️ Client
    participant S as ⚡ Server
    participant DB as 🗄️ MongoDB

    rect rgb(40, 20, 60)
        Note over C,DB: Single Device Logout
        C->>S: GET /api/auth/logout
        S->>S: Hash refresh token from cookie
        S->>DB: Find & revoke session
        S-->>C: Clear cookie + 200 OK ✅
    end

    rect rgb(20, 40, 60)
        Note over C,DB: All Devices Logout
        C->>S: GET /api/auth/logout-all
        S->>S: Decode refresh token
        S->>DB: Revoke ALL user sessions
        S-->>C: Clear cookie + 200 OK ✅
    end
```

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🏗️ Project Architecture

```
auth-workflow/
│
├── 📄 server.js                  # Entry point — starts Express & connects DB
├── 📄 package.json               # Dependencies & scripts
├── 📄 .env                       # Environment variables (secrets)
├── 📄 .gitignore
│
└── 📁 src/
    ├── 📄 app.js                 # Express app configuration & middleware
    │
    ├── 📁 config/
    │   ├── 📄 config.js          # Environment variable validation & export
    │   └── 📄 database.js        # MongoDB connection via Mongoose
    │
    ├── 📁 controllers/
    │   └── 📄 auth.controller.js # All auth logic (register, login, etc.)
    │
    ├── 📁 models/
    │   ├── 📄 user.schema.js     # User model (username, email, password, verified)
    │   ├── 📄 session.model.js   # Session model (tokenHash, IP, userAgent, revoked)
    │   └── 📄 otp.model.js       # OTP model (email, user ref, otpHash)
    │
    ├── 📁 routes/
    │   └── 📄 auth.route.js      # Route definitions → controller mapping
    │
    ├── 📁 services/
    │   └── 📄 email.service.js   # Nodemailer transporter (Gmail OAuth2)
    │
    └── 📁 utils/
        └── 📄 utils.js           # OTP generator & email HTML template
```

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🚀 API Endpoints

<div align="center">

| Method | Endpoint | Description | Auth Required |
|:------:|:---------|:------------|:-------------:|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `GET` | `/api/auth/verify-email` | Verify email with OTP | ❌ |
| `POST` | `/api/auth/login` | Login & get tokens | ❌ |
| `GET` | `/api/auth/getme` | Get current user profile | ✅ Bearer Token |
| `GET` | `/api/auth/refresh-token` | Refresh access token | 🍪 Cookie |
| `GET` | `/api/auth/logout` | Logout current device | 🍪 Cookie |
| `GET` | `/api/auth/logout-all` | Logout all devices | 🍪 Cookie |

</div>

<br/>

<details>
<summary><b>📋 Detailed API Reference (click to expand)</b></summary>

<br/>

### `POST` /api/auth/register

**Request Body:**
```json
{
  "username": "nitesh",
  "email": "nitesh@example.com",
  "password": "securePassword123"
}
```

**Success Response** `201`:
```json
{
  "message": "user registered successfully",
  "newUser": {
    "username": "nitesh",
    "email": "nitesh@example.com",
    "verified": false
  }
}
```

**Error Response** `409`:
```json
{
  "message": "user already exists"
}
```

---

### `GET` /api/auth/verify-email

**Query Parameters:** `?email=nitesh@example.com&otp=123456`

**Success Response** `200`:
```json
{
  "message": "email verified successfully",
  "user": {
    "username": "nitesh",
    "email": "nitesh@example.com",
    "verified": true
  }
}
```

---

### `POST` /api/auth/login

**Request Body:**
```json
{
  "email": "nitesh@example.com",
  "password": "securePassword123"
}
```

**Success Response** `200`:
```json
{
  "message": "user login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```
> 🍪 Also sets `refreshToken` as an HttpOnly cookie

---

### `GET` /api/auth/getme

**Headers:** `Authorization: Bearer <accessToken>`

**Success Response** `200`:
```json
{
  "message": "user fetched successfully",
  "user": {
    "username": "nitesh",
    "email": "nitesh@example.com"
  }
}
```

---

### `GET` /api/auth/refresh-token

> 🍪 Requires `refreshToken` cookie

**Success Response** `200`:
```json
{
  "message": "access token refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### `GET` /api/auth/logout

> 🍪 Requires `refreshToken` cookie

**Success Response** `200`:
```json
{
  "message": "user logged out successfully"
}
```

---

### `GET` /api/auth/logout-all

> 🍪 Requires `refreshToken` cookie

**Success Response** `200`:
```json
{
  "message": "user logged out from all devices successfully"
}
```

</details>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🔒 Security Highlights

<div align="center">

```
   ┌─────────────────────────────────────────────────────────────┐
   │                    🛡️  SECURITY LAYERS                      │
   │                                                             │
   │  ┌─────────────────────────────────────────────────────┐   │
   │  │  Layer 1: Password Hashing                          │   │
   │  │  └── SHA-256 cryptographic hash                     │   │
   │  │      └── Never store plaintext passwords            │   │
   │  └─────────────────────────────────────────────────────┘   │
   │                         ▼                                   │
   │  ┌─────────────────────────────────────────────────────┐   │
   │  │  Layer 2: Dual Token Strategy                       │   │
   │  │  ├── Access Token  → 15 min lifespan (in response)  │   │
   │  │  └── Refresh Token → 7 day lifespan (HttpOnly cookie│   │
   │  └─────────────────────────────────────────────────────┘   │
   │                         ▼                                   │
   │  ┌─────────────────────────────────────────────────────┐   │
   │  │  Layer 3: Refresh Token Rotation                    │   │
   │  │  └── New refresh token issued on each refresh       │   │
   │  │      └── Old token invalidated (replay protection)  │   │
   │  └─────────────────────────────────────────────────────┘   │
   │                         ▼                                   │
   │  ┌─────────────────────────────────────────────────────┐   │
   │  │  Layer 4: Session Tracking                          │   │
   │  │  ├── Per-device session records                     │   │
   │  │  ├── IP address logging                             │   │
   │  │  ├── User-Agent fingerprinting                      │   │
   │  │  └── Revocation support (single & all devices)      │   │
   │  └─────────────────────────────────────────────────────┘   │
   │                         ▼                                   │
   │  ┌─────────────────────────────────────────────────────┐   │
   │  │  Layer 5: Cookie Hardening                          │   │
   │  │  ├── HttpOnly  → No JavaScript access               │   │
   │  │  ├── Secure    → HTTPS only                         │   │
   │  │  └── SameSite  → Strict (CSRF protection)           │   │
   │  └─────────────────────────────────────────────────────┘   │
   │                         ▼                                   │
   │  ┌─────────────────────────────────────────────────────┐   │
   │  │  Layer 6: Email Verification                        │   │
   │  │  ├── 6-digit OTP via Gmail OAuth2                   │   │
   │  │  └── OTP stored as SHA-256 hash                     │   │
   │  └─────────────────────────────────────────────────────┘   │
   │                                                             │
   └─────────────────────────────────────────────────────────────┘
```

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## ⚡ Quick Start

### Prerequisites

<div align="center">

| Requirement | Version |
|:-----------:|:-------:|
| Node.js | `18+` |
| MongoDB | `6+` |
| Gmail Account | With OAuth2 |

</div>

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/samotanitesh247-ship-it/Auth-workflow.git
cd Auth-workflow
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
# 🗄️ Database
MONGO_URI=mongodb://localhost:27017/auth-workflow

# 🔑 JWT
JWT_SECRET=your-super-secret-jwt-key

# ✉️ Gmail OAuth2 (for email verification)
GOOGLE_USER_ID=your-email@gmail.com
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REFRESH_TOKEN=your-google-refresh-token
```

<details>
<summary>📖 <b>How to get Gmail OAuth2 credentials</b></summary>

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the **Gmail API**
4. Create **OAuth 2.0 credentials** (Web Application type)
5. Set the redirect URI to `https://developers.google.com/oauthplayground`
6. Go to [OAuth Playground](https://developers.google.com/oauthplayground/)
7. Click ⚙️ → Check **"Use your own OAuth credentials"**
8. Enter your Client ID & Secret
9. Select `https://mail.google.com/` scope → Authorize → Exchange for tokens
10. Copy the **refresh token** to your `.env`

</details>

### 4️⃣ Start the Server

```bash
npm run dev
```

<div align="center">

```
🚀 Server is running on port 3000
🗄️ Database connected successfully
✉️ Email transporter is ready to send messages
```

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🧪 Testing with cURL

```bash
# 📝 Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"nitesh","email":"nitesh@example.com","password":"test123"}'

# ✉️ Verify Email (use OTP received via email)
curl "http://localhost:3000/api/auth/verify-email?email=nitesh@example.com&otp=123456"

# 🔑 Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nitesh@example.com","password":"test123"}' \
  -c cookies.txt

# 👤 Get Profile
curl http://localhost:3000/api/auth/getme \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# 🔄 Refresh Token
curl http://localhost:3000/api/auth/refresh-token \
  -b cookies.txt -c cookies.txt

# 🚪 Logout
curl http://localhost:3000/api/auth/logout \
  -b cookies.txt

# 🚪 Logout All Devices
curl http://localhost:3000/api/auth/logout-all \
  -b cookies.txt
```

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🗃️ Database Models

<div align="center">

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        String username UK
        String email UK
        String password
        Boolean verified
    }

    SESSION {
        ObjectId _id PK
        ObjectId user FK
        String refreshTokenHash
        String ip
        String userAgent
        Boolean revoked
        DateTime createdAt
        DateTime updatedAt
    }

    OTP {
        ObjectId _id PK
        String email
        ObjectId user FK
        String otpHash
        DateTime createdAt
        DateTime updatedAt
    }

    USER ||--o{ SESSION : "has many"
    USER ||--o{ OTP : "has many"
```

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|:----------:|:--------|
| <img src="https://img.shields.io/badge/Express%205-000?style=flat-square&logo=express&logoColor=white" /> | Web framework & routing |
| <img src="https://img.shields.io/badge/Mongoose%209-880000?style=flat-square&logo=mongoose&logoColor=white" /> | MongoDB ODM |
| <img src="https://img.shields.io/badge/JWT-000?style=flat-square&logo=jsonwebtokens&logoColor=white" /> | Access & Refresh tokens |
| <img src="https://img.shields.io/badge/Nodemailer-0078D4?style=flat-square&logo=maildotru&logoColor=white" /> | OTP email delivery |
| <img src="https://img.shields.io/badge/Morgan-5C2D91?style=flat-square" /> | HTTP request logging |
| <img src="https://img.shields.io/badge/Cookie--Parser-FF6F00?style=flat-square" /> | Secure cookie handling |
| <img src="https://img.shields.io/badge/dotenv-ECD53F?style=flat-square&logo=dotenv&logoColor=black" /> | Environment variable management |
| <img src="https://img.shields.io/badge/Crypto-333?style=flat-square&logo=gnuprivacyguard&logoColor=white" /> | SHA-256 hashing |

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🤝 Contributing

Contributions are always welcome! Here's how:

```bash
# Fork the repo, then:
git checkout -b feature/amazing-feature
git commit -m "✨ Add amazing feature"
git push origin feature/amazing-feature
# Open a Pull Request 🎉
```

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 📄 License

This project is licensed under the **ISC License**.

<br/>

<div align="center">

### ⭐ Star this repo if you found it useful!

<br/>

<!-- Animated Footer -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6E40C9,50:161B22,100:0D1117&height=120&section=footer&animation=fadeIn" width="100%" />

</div>
