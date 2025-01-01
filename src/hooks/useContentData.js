import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const useContentData = (type = 'all') => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        let contentData = [];

        if (type === 'movie' || type === 'all') {
          const moviesSnapshot = await getDocs(collection(db, 'movies'));
          const moviesData = moviesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          contentData = [...contentData, ...moviesData];
        }

        if (type === 'serie' || type === 'all') {
          const seriesSnapshot = await getDocs(collection(db, 'series'));
          const seriesData = seriesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          contentData = [...contentData, ...seriesData];
        }

        setContent(contentData);
        setError(null);
      } catch (err) {
        console.error('Erreur lors de la récupération du contenu:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [type]);

  const getBySlug = async (slug) => {
    if (!content.length) return null;
    return content.find(item => item.slug === slug);
  };

  const getByGenre = (genre) => {
    return content.filter(item => 
      Array.isArray(item.genres) && item.genres.includes(genre)
    );
  };

  const getAllGenres = () => {
    const genres = new Set(content.flatMap(item => 
      Array.isArray(item.genres) ? item.genres : []
    ));
    return [...genres];
  };

  return {
    content,
    loading,
    error,
    getBySlug,
    getByGenre,
    getAllGenres
  };
};