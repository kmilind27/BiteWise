const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Make sure cors is required
require('dotenv').config();

const app = express();

// --- IMPORTANT: CORS Configuration ---
// This handles the "pre-flight" OPTIONS request for all routes
app.options('*', cors()); 

// This enables CORS for all other requests from any origin
app.use(cors());

// This allows the server to understand JSON data
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

// Endpoint for macro estimation
app.post('/api/estimate-macros', async (req, res) => {
    try {
        const { description } = req.body;
        const systemPrompt = `You are a nutritional information API...`; // Remainder of your logic is the same
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
            throw new Error(errorData.error.message || `API call failed with status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error in /api/estimate-macros:", error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for meal suggestions
app.post('/api/get-suggestion', async (req, res) => {
    try {
        const { ingredientsText, mealType } = req.body;
        const systemPrompt = `You are a helpful culinary assistant...`; // Remainder of your logic is the same
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
            throw new Error(errorData.error.message || `API call failed with status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error in /api/get-suggestion:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
