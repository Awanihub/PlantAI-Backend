# PlantIdentifier
# 🌿 PlantAI Backend

Backend API for the PlantAI application. It provides authentication, AI-powered plant identification using Google Gemini, plant chat functionality, and MongoDB database integration.

---

# 🚀 Features

- User Registration & Login
- JWT Authentication
- Protected Routes
- Plant Image Upload
- AI Plant Identification using Google Gemini
- AI Chat about Identified Plants
- MongoDB Atlas Integration
- Image Validation with Multer
- Automatic Expiry of Plant Scans (24 Hours)
- TypeScript + Express.js

---

# 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT
- Multer
- Google Gemini API
- bcrypt
- dotenv

---

# Project Structure

```
Backend
│
├── src
│   ├── controllers
│   │     auth.controller.ts
│   │     chat.controller.ts
│   │     plant.controller.ts
│   │     user.controller.ts
│   │
│   ├── middlewares
│   │     auth.middleware.ts
│   │     upload.middleware.ts
│   │
│   ├── models
│   │     user.model.ts
│   │     chat.model.ts
│   │     plantScan.model.ts
│   │
│   ├── routes
│   │     auth.routes.ts
│   │     chat.routes.ts
│   │     plant.routes.ts
│   │     user.routes.ts
│   │
│   ├── services
│   │     gemini.service.ts
│   │     chat.service.ts
│   │     plant.service.ts
│   │
│   ├── validators
│   │
│   ├── interfaces
│   │
│   ├── config
│   │
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/your-username/PlantAI.git
```

Move into backend

```bash
cd Backend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key
```

---

# Running the Server

Development

```bash
npm run dev
```

Production

```bash
npm run build

npm start
```

Server starts at

```
http://localhost:5000
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

### Verify OTP

```
POST /api/auth/verify-otp
```

---

## User

### Get Profile

```
GET /api/user/profile
```

Authorization Required

```
Bearer Token
```

---

## Plant

### Identify Plant

```
POST /api/plant/identify
```

Headers

```
Authorization: Bearer <token>
```

Body

```
form-data

image : File
```

Returns

```json
{
  "success": true,
  "plantName": "...",
  "scientificName": "...",
  "description": "...",
  "wateringTips": "...",
  "sunlightRequirements": "...",
  "fertilizerSuggestions": "...",
  "commonProblems": "...",
  "careInstructions": "..."
}
```

---

## Chat

### Ask Plant AI

```
POST /api/chat/ask
```

Headers

```
Authorization: Bearer <token>
```

Body

```json
{
  "plantInfo": {
    "plantName": "...",
    "scientificName": "...",
    "description": "...",
    "wateringTips": "...",
    "sunlightRequirements": "...",
    "fertilizerSuggestions": "..."
  },
  "question": "How often should I water this plant?"
}
```

Response

```json
{
  "success": true,
  "answer": "Water this plant once every 5–7 days depending on the soil moisture."
}
```

---

# Authentication

All protected routes require a JWT token.

Example Header

```
Authorization: Bearer <JWT_TOKEN>
```

---

# AI Integration

Google Gemini 2.5 Flash is used for

- Plant Identification
- Plant Care Information
- AI Plant Chat

---

# Image Upload

Handled using Multer.

Supported Formats

- JPG
- JPEG
- PNG
- WEBP

Maximum Size

```
5 MB
```

---

# Database Collections

## Users

Stores

- Name
- Email
- Password
- OTP

---

## Plant Scans

Stores

- User ID
- Plant Image
- Plant Details
- Care Information
- Expiry Time

---

## Chats

Stores

- User
- Plant
- Conversation History

---

# Security

- Password Hashing using bcrypt
- JWT Authentication
- Protected APIs
- Image Type Validation
- File Size Validation
- Environment Variables

---

# Future Improvements

- Disease Detection
- Weather-based Suggestions
- Watering Reminder
- Scan History
- Voice Chat
- Multi-language Support

---

# Author

Awantika Singh
