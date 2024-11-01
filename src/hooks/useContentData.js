import { useMemo } from 'react';
import data from '../data/data.json';

export const useContentData = (type = 'all') => {
  const content = useMemo(() => {
    switch(type) {
      case 'movie':
        return data.movies;
      case 'series':
        return data.series;
      case 'all':
      default:
        return [...data.movies, ...data.series];
    }
  }, [type]);

  const getBySlug = (slug) => {
    if (type === 'all') {
      return [...data.movies, ...data.series].find(item => item.slug === slug);
    }
    return content.find(item => item.slug === slug);
  };

  const getByGenre = (genre) => {
    return content.filter(item => item.genres.includes(genre));
  };

  const getAllGenres = () => {
    const genres = new Set(content.flatMap(item => item.genres));
    return [...genres];
  };

  return {
    content,
    getBySlug,
    getByGenre,
    getAllGenres
  };
};