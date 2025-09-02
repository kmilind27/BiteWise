const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- CORS Configuration ---
app.options('*', cors()); 
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// --- STARTUP DEBUGGING LOG ---
console.log("Server starting...");
console.log("GEMINI_API_KEY loaded:", GEMINI_API_KEY ? "Yes, key is present." : "No, key is MISSING or empty.");

// --- HEALTH CHECK ENDPOINT ---
// A simple endpoint to verify that the server is alive.
app.get('/api/health', (req, res) => {
    console.log("Health check endpoint was hit.");
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

// Endpoint for macro estimation
app.post('/api/estimate-macros', async (req, res) => {
    console.log("Received request for /api/estimate-macros");
    try {
        const { description } = req.body;
        const systemPrompt = `You are a nutritional information API. Given a meal description, you must estimate the calories, protein (in grams), carbohydrates (in grams), and fats (in grams). You must respond ONLY with a valid JSON object. The JSON object should have four keys: "calories", "protein", "carbs", and "fats". The values should be numbers. Do not include any units, markdown, or explanatory text in your response.`;
        const userQuery = `Estimate the nutritional information for: ${description}`;
        const payload = {
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ parts: [{ text: userQuery }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: { "calories": { "type": "NUMBER" }, "protein": { "type": "NUMBER" }, "carbs": { "type": "NUMBER" }, "fats": { "type": "NUMBER" } },
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
            throw new Error(errorData.error.message);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("ERROR in /api/estimate-macros:", error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for meal suggestions
app.post('/api/get-suggestion', async (req, res) => {
    console.log("Received request for /api/get-suggestion");
    try {
        const { ingredientsText, mealType } = req.body;
        const systemPrompt = `You are a helpful culinary assistant. Your goal is to provide simple, healthy, and creative meal ideas based on the user's available ingredients. Provide 2-3 distinct options. For each option, give it a name, list the required ingredients from the user's list, and provide a short, easy-to-follow recipe. Format your response in Markdown.`;
        const userQuery = `I have the following ingredients: ${ingredientsText}. Can you suggest a recipe for ${mealType}?`;
        const payload = {
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ parts: [{ text: userQuery }] }],
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
        console.error("ERROR in /api/get-suggestion:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

