#  PingO AI (LearnEdge)

An AI-powered full-stack learning platform that helps students practice, get real-time feedback, and track progress through gamification and intelligent systems.

---

##  Overview

PingO AI is designed to make learning interactive and efficient by combining:

* 💻 AI Code Review
* 🧠 Personalized Prep Planner
* 📝 Quiz System
* 🏆 Real-time Leaderboard

The platform integrates a custom-built **LLM service** (developed by an ML Engineer) to provide intelligent feedback and planning.

---

##  Tech Stack

### 🔹 Frontend

* React (Vite)
* Tailwind CSS
* React Router

### 🔹 Backend

* Node.js
* Express.js

### 🔹 Database

* MongoDB Atlas
* Mongoose

### 🔹 Realtime

* Socket.IO

### 🔹 AI Integration

* External LLM Service (Code Review + Prep Planner)

---

## 📁 Project Structure

```id="readme-struct"
root/
├── frontend/        # React application
├── backend/         # Node.js + Express server
```

---

##  Features

* 🔐 User Authentication (JWT-based)
* 💻 AI-powered Code Review
* ⚡ Code Execution (Judge0 API)
* 🏆 Real-time Leaderboard (Socket.IO)
* 🎮 Gamification (XP, Levels)
* 📝 Quiz System with Timer & Hints
* 📅 AI-based Prep Planner

---

##  Authentication

* Passwords are securely hashed using **bcrypt**
* JWT tokens are used for protected routes
* User sessions stored on frontend (localStorage)

---

##  AI Integration

The platform integrates an external **LLM service** developed by an ML Engineer, which provides:

* Code analysis and feedback
* Error detection and suggestions
* Concept explanations
* Personalized preparation plans

---

##  API Endpoints (Backend)

### Auth

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user

### Leaderboard

* `GET /api/leaderboard` → Fetch leaderboard
* `POST /api/leaderboard/update-score` → Update score

---

##  Getting Started

### 1. Clone Repository

```bash id="clone"
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Setup Backend

```bash id="backend-setup"
cd backend
npm install
```

Create `.env` file:

```env id="env"
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run server:

```bash id="backend-run"
npm start
```

---

### 3. Setup Frontend

```bash id="frontend-setup"
cd frontend
npm install
npm run dev
```

---

##  Deployment

* Frontend → Netlify
* Backend → Render

---

##  Testing

* API tested using Postman
* UI tested manually
* End-to-end functionality verified

---

##  Future Improvements

* More learning domains
* Advanced AI tutoring
* Mobile app version
* Analytics dashboard

---


## 📌 License

This project is for educational and demonstration purposes.

---


