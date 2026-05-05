# BiteWise React - Modern Food Tracker

Modern React app with dark mode, authentication, and AI-powered features.

## ✨ Features

- 🌓 **Dark Mode Toggle** - Seamless light/dark theme switching
- 🔐 **Authentication** - Email/password login and signup
- 🎨 **Modern UI** - Clean design with light accent colors (purple & cyan)
- 🤖 **AI-Powered** - Macro estimation & recipe suggestions via Gemini API
- 🎤 **Voice Input** - Speak your meals using Web Speech API
- 📊 **Meal Tracking** - Log meals with nutritional info
- 🥗 **Ingredient Management** - Track your pantry
- 📅 **History View** - Browse meals by date with daily totals
- 📱 **Fully Responsive** - Works on all devices

## 🎨 Design

- **Light Colors**: Purple (#8b5cf6) & Cyan (#06b6d4) accents
- **Dark Mode**: Automatic theme persistence
- **Modern Gradients**: Smooth color transitions
- **Glassmorphism**: Elevated surfaces with shadows
- **Smooth Animations**: Micro-interactions throughout

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.jsx              # Login page
│   ├── Signup.jsx             # Signup page
│   ├── Dashboard.jsx          # Main app page
│   ├── Header.jsx             # Header with theme toggle & user menu
│   ├── ProtectedRoute.jsx     # Route guard
│   ├── MealLogger.jsx         # Log meals
│   ├── IngredientInventory.jsx
│   ├── MealSuggestions.jsx
│   └── MealHistory.jsx
├── context/
│   └── ThemeContext.jsx       # Dark mode context
├── hooks/
│   ├── useAuth.js             # Auth hook
│   └── useSpeechRecognition.js
├── config/
│   └── firebase.js
├── styles/
│   └── global.css             # All styles with dark mode
└── App.jsx                    # Router setup
```

## 🔑 Authentication

Uses Firebase Email/Password authentication:
- Sign up with email & password
- Login with existing account
- Protected routes (redirect to login if not authenticated)
- User menu with logout

## 🌓 Dark Mode

- Toggle button in header
- Persists to localStorage
- Smooth transitions
- Optimized color palette for both themes

## 🎨 Color Palette

### Light Mode
- Background: `#fafafa`
- Surface: `#ffffff`
- Accent: `#8b5cf6` (Purple)
- Secondary: `#06b6d4` (Cyan)
- Success: `#10b981` (Green)

### Dark Mode
- Background: `#0f172a`
- Surface: `#1e293b`
- Accent: `#a78bfa` (Light Purple)
- Secondary: `#22d3ee` (Light Cyan)
- Success: `#34d399` (Light Green)

## 🔧 Tech Stack

- React 19 + Vite
- React Router v6
- Firebase (Auth + Firestore)
- Google Gemini API
- Marked.js
- Web Speech API

## 🌐 Backend

Backend URL: `https://bite-wise-tawny.vercel.app`

Endpoints:
- `POST /api/estimate-macros` - AI macro estimation
- `POST /api/get-suggestion` - AI recipe suggestions

## 📝 Notes

- Theme preference saved to localStorage
- User data persists across sessions
- Voice input requires microphone permissions
- All data stored in Firestore per user
