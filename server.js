const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const app = express();

// --- IMPORTANT: CORS Configuration ---
// This tells your server to only accept requests from your live frontend.
const allowedOrigins = ['https://kmilind27.github.io'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

// Endpoint for macro estimation
app.post('/api/estimate-macros', async (req, res) => {
    // ... (The rest of your endpoint logic remains the same)
});

// Endpoint for meal suggestions
app.post('/api/get-suggestion', async (req, res) => {
    // ... (The rest of your endpoint logic remains the same)
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
