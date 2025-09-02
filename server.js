// This is a basic Express server.
// You'll need to install these packages: npm install express dotenv node-fetch
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // Loads variables from .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(__dirname)); // Serve static files like index.html from the current directory

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Endpoint for Macro Estimation
app.post('/api/estimate-macros', async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ error: 'Meal description is required.' });
        }

        const systemPrompt = `You are a nutritional information API. Given a meal description, you must estimate the calories, protein (in grams), carbohydrates (in grams), and fats (in grams). You must respond ONLY with a valid JSON object. The JSON object should have four keys: "calories", "protein", "carbs", and "fats". The values should be numbers. Do not include any units, markdown, or explanatory text in your response.`;
        const userQuery = `Estimate the nutritional information for: ${description}`;

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
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
                        "fats": { "type": "NUMBER" },
                    },
                    required: ["calories", "protein", "carbs", "fats"]
                }
            }
        };

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error("Gemini API Error:", errorData);
            throw new Error(errorData.error.message || `API call failed with status: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        res.json(data);

    } catch (error) {
        console.error("Server Error in /api/estimate-macros:", error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for Meal Suggestions
app.post('/api/get-suggestion', async (req, res) => {
    try {
        const { ingredientsText, mealType } = req.body;
        if (!ingredientsText || !mealType) {
            return res.status(400).json({ error: 'Ingredients and meal type are required.' });
        }
        
        const systemPrompt = `You are a helpful culinary assistant. Your goal is to provide simple, healthy, and creative meal ideas based on the user's available ingredients. Provide 2-3 distinct options. For each option, give it a name, list the required ingredients from the user's list, and provide a short, easy-to-follow recipe. Format your response in Markdown.`;
        const userQuery = `I have the following ingredients: ${ingredientsText}. Can you suggest a recipe for ${mealType}?`;

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
        const payload = {
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ parts: [{ text: userQuery }] }],
        };

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error("Gemini API Error:", errorData);
            throw new Error(errorData.error.message || `API call failed with status: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        res.json(data);

    } catch (error) {
        console.error("Server Error in /api/get-suggestion:", error);
        res.status(500).json({ error: error.message });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Your BiteWise app is now being served securely!");
});
