const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- CORS Configuration ---
// Handles the "pre-flight" OPTIONS request for all routes and enables CORS
app.options('*', cors()); 
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

// Endpoint for macro estimation
app.post('/api/estimate-macros', async (req, res) => {
    try {
        const { description } = req.body;
        // --- THIS IS THE CORRECTED PROMPT ---
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
        // --- THIS IS THE CORRECTED PROMPT ---
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
    
