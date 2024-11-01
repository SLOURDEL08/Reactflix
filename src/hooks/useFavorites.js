import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext'; // Assurez-vous d'avoir ce hook

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const userFavRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userFavRef);

        if (docSnap.exists()) {
          setFavorites(docSnap.data().favorites || []);
        } else {
          // Créer un document pour les favoris de l'utilisateur s'il n'existe pas
          await setDoc(userFavRef, { favorites: [] });
          setFavorites([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (contentId) => {
    if (!user) return;

    try {
      const newFavorites = favorites.includes(contentId)
        ? favorites.filter(id => id !== contentId)
        : [...favorites, contentId];

      const userFavRef = doc(db, 'users', user.uid);
      await setDoc(userFavRef, { favorites: newFavorites }, { merge: true });
      
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des favoris:', error);
    }
  };

  return { favorites, toggleFavorite, loading };
};

export default useFavorites;