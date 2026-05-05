import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, APP_ID } from '../config/firebase';

export const IngredientInventory = ({ userId }) => {
  const [ingredients, setIngredients] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const docRef = doc(db, 'artifacts', APP_ID, 'users', userId, 'pantry', 'ingredients');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIngredients(docSnap.data().list.join(', '));
        }
      } catch (error) {
        console.error("Error loading ingredients:", error);
      }
    };

    if (userId) loadIngredients();
  }, [userId]);

  const handleSave = async () => {
    const ingredientList = ingredients.split(',').map(s => s.trim()).filter(Boolean);
    if (ingredientList.length === 0) {
      alert('Please enter at least one ingredient.');
      return;
    }

    try {
      const docRef = doc(db, 'artifacts', APP_ID, 'users', userId, 'pantry', 'ingredients');
      await setDoc(docRef, { list: ingredientList });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving ingredients:", error);
      alert('Could not save ingredients. Check console for errors.');
    }
  };

  return (
    <section className="card">
      <p className="card-title">What's in Your Kitchen?</p>
      <p className="card-subtitle">List the ingredients you have on hand, separated by commas.</p>
      <div className="form-group">
        <textarea
          rows="4"
          placeholder="e.g., chicken breast, rice, broccoli, garlic, olive oil, lemon"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <button className="btn btn-success" onClick={handleSave}>
        {saved ? '✓ Saved!' : 'Save Ingredients'}
      </button>
    </section>
  );
};
