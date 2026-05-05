# BiteWise - Smart Food Tracker

Modern food tracking app with AI-powered features, dark mode, and authentication.

## 📁 Project Structure

```
BiteWise/
├── bitewise-react/          # React frontend (deploy to GitHub Pages)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/                 # Express backend (deploy to Vercel)
│   ├── server.js
│   ├── package.json
│   ├── vercel.json
│   └── .env                 # Environment variables (Gemini API key)
│
└── README.md
```

## 🚀 Deployment

### Frontend (React App)
**Deploy to:** GitHub Pages
**URL:** https://kmilind27.github.io/BiteWise

```bash
cd bitewise-react
npm run deploy
```

### Backend (Express API)
**Deploy to:** Vercel
**URL:** https://bite-wise-tawny.vercel.app

```bash
# From backend directory
cd backend
vercel --prod
```

## 🔧 Development

### Run Frontend
```bash
cd bitewise-react
npm run dev
```
Opens at: http://localhost:5173

### Run Backend
```bash
cd backend
npm start
```
Runs at: http://localhost:3000

## 📝 Environment Variables

Create `.env` in `backend` directory:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

## ✨ Features

- 🔐 Email/Password Authentication
- 🌓 Dark Mode Toggle
- 🤖 AI Macro Estimation (Gemini API)
- 🥗 Recipe Suggestions
- 📊 Meal Tracking & History
- 🎤 Voice Input
- 📱 Fully Responsive

## 🎨 Tech Stack

**Frontend:**
- React 19 + Vite
- React Router
- Firebase (Auth + Firestore)
- CSS Variables (no framework)

**Backend:**
- Node.js + Express
- Google Gemini API
- CORS enabled for localhost & GitHub Pages

## 📦 Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../bitewise-react
npm install
```

## 🔑 Firebase Setup

1. Enable Email/Password authentication in Firebase Console
2. Update Firebase config in `bitewise-react/src/config/firebase.js`

## 📖 Documentation

- [Frontend README](./bitewise-react/README.md)
- [GitHub Deployment Guide](./bitewise-react/GITHUB_DEPLOY.md)
- [Firebase Setup](./bitewise-react/FIREBASE_SETUP.md)
