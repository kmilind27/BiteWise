import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, APP_ID, BACKEND_URL } from '../config/firebase';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export const MealLogger = ({ userId }) => {
  const [mealType, setMealType] = useState('Breakfast');
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [estimating, setEstimating] = useState(false);

  const { isListening, isSupported, toggleListening } = useSpeechRecognition();

  const handleVoiceInput = (transcript) => {
    setDescription(prev => prev ? `${prev} ${transcript}` : transcript);
  };

  const handleEstimateMacros = async () => {
    if (!description.trim()) {
      alert("Please describe your meal first.");
      return;
    }

    setEstimating(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/estimate-macros`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const result = await response.json();
      const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (jsonText) {
        const nutritionData = JSON.parse(jsonText);
        setCalories(Math.round(nutritionData.calories));
        setProtein(Math.round(nutritionData.protein));
        setCarbs(Math.round(nutritionData.carbs));
        setFats(Math.round(nutritionData.fats));
      }
    } catch (error) {
      console.error("Macro Estimation Error:", error);
      alert(`Sorry, couldn't estimate macros. ${error.message}`);
    } finally {
      setEstimating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please describe what you ate.');
      return;
    }

    try {
      await addDoc(collection(db, 'artifacts', APP_ID, 'users', userId, 'meals'), {
        mealType,
        description,
        calories: parseFloat(calories) || 0,
        protein: parseFloat(protein) || 0,
        carbs: parseFloat(carbs) || 0,
        fats: parseFloat(fats) || 0,
        createdAt: serverTimestamp()
      });

      setDescription('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
    } catch (error) {
      console.error("Error logging meal:", error);
      alert('Could not log meal. Check console for errors.');
    }
  };

  return (
    <section className="card">
      <p className="card-title">Log Your Meal</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="meal-type">Meal Type</label>
          <select id="meal-type" value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="food-description">What did you eat?</label>
          <div className="textarea-wrap">
            <textarea
              id="food-description"
              rows="3"
              placeholder="e.g., Oatmeal with berries and nuts"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {isSupported && (
              <button
                type="button"
                className={`mic-btn ${isListening ? 'listening' : ''}`}
                onClick={() => toggleListening(handleVoiceInput)}
                aria-label="Voice input"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="macro-grid">
          <div className="form-group">
            <label htmlFor="calories">Calories</label>
            <input type="number" id="calories" placeholder="350" value={calories} onChange={(e) => setCalories(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="protein">Protein (g)</label>
            <input type="number" id="protein" placeholder="15" value={protein} onChange={(e) => setProtein(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="carbs">Carbs (g)</label>
            <input type="number" id="carbs" placeholder="45" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="fats">Fats (g)</label>
            <input type="number" id="fats" placeholder="12" value={fats} onChange={(e) => setFats(e.target.value)} />
          </div>
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleEstimateMacros} disabled={estimating}>
          {estimating ? <div className="loader-sm" /> : '✨ Estimate Macros with AI'}
        </button>
        <button type="submit" className="btn btn-primary">Log Meal</button>
      </form>
    </section>
  );
};
