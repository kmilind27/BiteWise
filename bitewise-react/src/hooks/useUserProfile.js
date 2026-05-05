import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, APP_ID } from '../config/firebase';

export const useUserProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'artifacts', APP_ID, 'users', userId, 'profile', 'info');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading };
};
