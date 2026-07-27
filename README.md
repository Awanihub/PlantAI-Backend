# 🌱 PlantAI Backend

PlantAI Backend is a REST API server that powers an AI-based plant identification and plant care assistant application.

The backend handles:

- User authentication
- Plant image processing
- AI-based plant identification
- Garden management
- Plant care reminders
- AI plant conversations
- Learning assistant

The backend is built using Node.js, Express.js, TypeScript, MongoDB, and Google Gemini AI.

---

# 🚀 Features

## 🔐 Authentication System

Secure user authentication using JWT.

Features:

- User registration
- User login
- Forgot password
- Password reset
- Protected routes

Authentication flow:

```
User
 |
 |
Login Request
 |
 |
Validate Credentials
 |
 |
Generate JWT Token
 |
 |
Access Protected APIs
```

---

# 🌿 AI Plant Identification

PlantAI uses Google Gemini AI to analyze plant images.

Flow:

```
User Uploads Image
        |
        |
Express API receives image
        |
        |
Image converted to Base64
        |
        |
Gemini AI analyzes image
        |
        |
Plant information returned
```

Generated information:

- Plant name
- Scientific name
- Description
- Watering requirements
- Sunlight requirements
- Fertilizer suggestions
- Common problems
- Care instructions

AI Model:

```
Google Gemini 2.5 Flash
```

---

# 🌱 Garden Management

Users can save identified plants into their personal garden.

Features:

- Add plant to garden
- View saved plants
- Delete plants

Stored information:

- Plant details
- Plant image
- Care information
- User ownership

---

# ⏰ Reminder Management

Users can create plant care reminders.

Supported actions:

- Water
- Fertilize
- Prune
- Repot
- Mist

Features:

- Create reminder
- View reminders
- Mark reminder completed
- Delete reminder

---

# 🤖 Plant AI Chat

Users can ask questions about plants.

Examples:

```
Why are my leaves turning yellow?

How much sunlight does this plant need?

Which fertilizer should I use?
```

The backend sends plant context to Gemini AI and generates personalized responses.

---

# 📚 Learn Assistant

AI-powered learning system that provides plant education.

Topics:

- Plant care basics
- Pest management
- Pruning
- Common plant problems

Users can ask general plant-related questions.

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- MongoDB
- Mongoose ODM

## Authentication

- JWT
- bcrypt

## AI

- Google Gemini API
- Gemini 2.5 Flash

## File Handling

- Multer

## Development Tools

- Git
- GitHub
- Postman
- VS Code

---

# 📂 Project Structure

```
PlantAI-Backend
│
├── src
│
├── controllers
│   ├── auth.controller.ts
│   ├── plant.controller.ts
│   ├── garden.controller.ts
│   ├── reminder.controller.ts
│   ├── learn.controller.ts
│   └── chat.controller.ts
│
├── services
│   ├── gemini.service.ts
│   ├── plant.service.ts
│   ├── garden.service.ts
│   ├── reminder.service.ts
│   ├── learn.service.ts
│   └── chat.service.ts
│
├── models
│   ├── user.model.ts
│   ├── plantScan.model.ts
│   ├── garden.model.ts
│   └── reminder.model.ts
│
├── routes
│   ├── auth.routes.ts
│   ├── plant.routes.ts
│   ├── garden.routes.ts
│   ├── reminder.routes.ts
│   ├── learn.routes.ts
│   └── chat.routes.ts
│
├── middlewares
│   └── auth.middleware.ts
│
├── validators
│
└── server.ts
```

---

# 🗄️ Database Models

## User Model

Stores:

- Name
- Email
- Password
- Authentication data


## PlantScan Model

Stores temporary AI scan results:

- User ID
- Plant image
- Plant information
- Expiry time


## Garden Model

Stores user's saved plants:

- User ID
- Plant details
- Plant image
- Care information


## Reminder Model

Stores plant care tasks:

- User ID
- Plant ID
- Action
- Reminder date
- Completion status

---

# 🔌 API Endpoints

## Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/signup | Register user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/forgot-password | Request password reset |
| POST | /api/auth/reset-password | Reset password |

---

# Plant APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/plants/identify | Identify plant from image |

---

# Garden APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/garden/add | Add plant |
| GET | /api/garden | Get user garden |
| DELETE | /api/garden/:id | Delete plant |

---

# Reminder APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/reminders | Create reminder |
| GET | /api/reminders | Get reminders |
| PATCH | /api/reminders/:id/complete | Complete reminder |
| DELETE | /api/reminders/:id | Delete reminder |

---

# Chat APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/chat/ask | Ask Plant AI |

---

# Learn APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/learn/ask | Ask learning assistant |

---

# ⚙️ Installation

Clone repository:

```bash
git clone https://github.com/Awanihub/PlantAI-Backend.git
```

Navigate:

```bash
cd PlantAI-Backend
```

Install dependencies:

```bash
npm install
```

---

# 🔑 Environment Variables

Create `.env` file:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key
```

---

# ▶️ Run Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server runs:

```
http://localhost:8000
```

---

# 🔒 Security Features

Implemented:

- JWT authentication
- Protected routes
- Password hashing
- User-specific data access
- Input validation
- File upload validation

---

# 🔮 Future Improvements

- Background reminder notifications
- Cloud image storage
- Plant disease detection
- Weather API integration
- Redis caching
- Rate limiting
- Docker deployment
- CI/CD pipeline

---

# 👨‍💻 Author

**Awantika Singh**

---

## License

This project is developed for learning and portfolio purposes.
