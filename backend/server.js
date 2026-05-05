const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

// --- CORS MIDDLEWARE ---
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://kmilind27.github.io',
    'https://kmilind27.github.io/BiteWise',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
  ];
  
  const origin = req.headers.origin;
  console.log('Request origin:', origin);

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Suppress favicon warning
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

app.post('/api/estimate-macros', async (req, res) => {
  try {
    const { description } = req.body;
    console.log('Estimating macros for:', description);
    
    const systemPrompt = `You are a nutritional information API. Given a meal description, you must estimate the calories, protein (in grams), carbohydrates (in grams), and fats (in grams). You must respond ONLY with a valid JSON object. The JSON object should have four keys: "calories", "protein", "carbs", and "fats". The values should be numbers. Do not include any units, markdown, or explanatory text in your response.`;
    const userQuery = `Estimate the nutritional information for: ${description}`;
    const payload = {
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ parts: [{ text: userQuery }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: { 
            "calories": { "type": "NUMBER" }, 
            "protein": { "type": "NUMBER" }, 
            "carbs": { "type": "NUMBER" }, 
            "fats": { "type": "NUMBER" } 
          },
          required: ["calories", "protein", "carbs", "fats"]
        }
      }
    };
    
    const response = await fetch(API_URL_BASE, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(payload) 
    });
    
    if (!response.ok) { 
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      throw new Error(errorData.error.message); 
    }
    
    const data = await response.json();
    console.log('Macro estimation successful');
    res.json(data);
  } catch (error) {
    console.error('Macro estimation error:', error.message);
    res.status(500).json({ error: error.message }); 
  }
});

app.post('/api/get-suggestion', async (req, res) => {
  try {
    const { ingredientsText, mealType } = req.body;
    const systemPrompt = `You are a helpful culinary assistant. Your goal is to provide simple, healthy, and creative meal ideas based on the user's available ingredients. Provide 2-3 distinct options. For each option, give it a name, list the required ingredients from the user's list, and provide a short, easy-to-follow recipe. Format your response in Markdown.`;
    const userQuery = `I have the following ingredients: ${ingredientsText}. Can you suggest a recipe for ${mealType}?`;
    const payload = { 
      systemInstruction: { parts: [{ text: systemPrompt }] }, 
      contents: [{ parts: [{ text: userQuery }] }] 
    };
    const response = await fetch(API_URL_BASE, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(payload) 
    });
    if (!response.ok) { 
      const errorData = await response.json(); 
      throw new Error(errorData.error.message); 
    }
    const data = await response.json();
    res.json(data);
  } catch (error) { 
    res.status(500).json({ error: error.message }); 
  }
});

const PORT = 3000;
app.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`); 
});
