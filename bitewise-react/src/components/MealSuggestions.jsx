import { useState } from 'react';
import { marked } from 'marked';
import { BACKEND_URL } from '../config/firebase';

export const MealSuggestions = ({ ingredients }) => {
  const [mealType, setMealType] = useState('Breakfast');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const handleGetSuggestion = async (e) => {
    e.preventDefault();
    
    if (!ingredients.trim()) {
      setSuggestion('<p class="warn">Please save some ingredients first!</p>');
      return;
    }

    setLoading(true);
    setSuggestion('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/get-suggestion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredientsText: ingredients, mealType })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const result = await response.json();
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        setSuggestion(marked.parse(generatedText));
      } else {
        throw new Error("Invalid response structure from server.");
      }
    } catch (error) {
      console.error("Suggestion Error:", error);
      setSuggestion(`<p class="error">Sorry, couldn't get a suggestion. ${error.message}</p>`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <p className="card-title">Need an Idea?</p>
      <p className="card-subtitle">Get a meal suggestion based on your saved ingredients.</p>
      <form onSubmit={handleGetSuggestion}>
        <div className="form-group">
          <label htmlFor="suggestion-meal-type">Which meal?</label>
          <select id="suggestion-meal-type" value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Any</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Get Suggestion
        </button>
      </form>
      <div className={`loader-wrap ${loading ? 'visible' : ''}`}>
        <div className="loader"></div>
      </div>
      {suggestion && (
        <div className="suggestion-output" dangerouslySetInnerHTML={{ __html: suggestion }} />
      )}
    </section>
  );
};
