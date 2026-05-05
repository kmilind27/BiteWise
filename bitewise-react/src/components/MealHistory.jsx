import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db, APP_ID } from '../config/firebase';

export const MealHistory = ({ userId }) => {
  const [meals, setMeals] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [showTotals, setShowTotals] = useState(false);
  const [title, setTitle] = useState("Today's Log");

  useEffect(() => {
    if (!userId) return;

    const date = selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date();
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const q = query(
      collection(db, 'artifacts', APP_ID, 'users', userId, 'meals'),
      where("createdAt", ">=", Timestamp.fromDate(startOfDay)),
      where("createdAt", "<=", Timestamp.fromDate(endOfDay))
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mealData = [];
      snapshot.forEach((doc) => {
        mealData.push({ id: doc.id, ...doc.data() });
      });
      mealData.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
      setMeals(mealData);
      setShowTotals(false);
    });

    return () => unsubscribe();
  }, [userId, selectedDate]);

  const handleDelete = async (mealId) => {
    try {
      await deleteDoc(doc(db, 'artifacts', APP_ID, 'users', userId, 'meals', mealId));
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    setTitle(value ? `Log for ${value}` : "Today's Log");
  };

  const handleViewToday = () => {
    setSelectedDate('');
    setTitle("Today's Log");
  };

  const totals = meals.reduce((acc, meal) => {
    acc.calories += meal.calories || 0;
    acc.protein += meal.protein || 0;
    acc.carbs += meal.carbs || 0;
    acc.fats += meal.fats || 0;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

  return (
    <section className="card">
      <div className="history-header">
        <p className="card-title">{title}</p>
        <div className="history-controls">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          <button className="btn btn-outline" onClick={handleViewToday}>Today</button>
        </div>
      </div>
      {meals.length > 0 && (
        <div className="totals-bar">
          <button className="btn btn-outline" onClick={() => setShowTotals(!showTotals)}>
            {showTotals ? 'Hide Totals' : 'Show Totals'}
          </button>
        </div>
      )}
      {showTotals && meals.length > 0 && (
        <div className="totals-display visible">
          <p className="totals-label">Daily Totals</p>
          <div className="stat"><span>Calories</span><strong>{Math.round(totals.calories)} kcal</strong></div>
          <div className="stat"><span>Protein</span><strong>{Math.round(totals.protein)} g</strong></div>
          <div className="stat"><span>Carbs</span><strong>{Math.round(totals.carbs)} g</strong></div>
          <div className="stat"><span>Fats</span><strong>{Math.round(totals.fats)} g</strong></div>
        </div>
      )}
      <div>
        {meals.length === 0 ? (
          <p className="empty-state">No meals logged yet for this day.</p>
        ) : (
          meals.map(meal => (
            <div key={meal.id} className="meal-card">
              <div className="meal-card-body">
                <div className="meal-card-top">
                  <span className="meal-type-badge">{meal.mealType}</span>
                  <span className="meal-kcal">{meal.calories || 0} kcal</span>
                </div>
                <p className="meal-desc">{meal.description}</p>
                <div className="meal-macros">
                  <span>Protein <strong>{meal.protein || 0}g</strong></span>
                  <span>Carbs <strong>{meal.carbs || 0}g</strong></span>
                  <span>Fats <strong>{meal.fats || 0}g</strong></span>
                </div>
              </div>
              <button className="btn-ghost-sm" onClick={() => handleDelete(meal.id)} aria-label="Delete meal">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
