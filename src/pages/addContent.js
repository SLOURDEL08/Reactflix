import React, { useState } from 'react';

const AddContent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [rating, setRating] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !releaseDate || !genre || !language || !rating || !coverImage) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    const newContent = {
      id: Date.now(),
      title,
      description,
      releaseDate,
      genre,
      language,
      rating,
      coverImage,
    };

    // Stocker dans le localStorage
    const existingContent = JSON.parse(localStorage.getItem('content')) || [];
    existingContent.push(newContent);
    localStorage.setItem('content', JSON.stringify(existingContent));

    // Réinitialiser le formulaire
    setTitle('');
    setDescription('');
    setReleaseDate('');
    setGenre('');
    setLanguage('');
    setRating('');
    setCoverImage('');
    setError('');
  };

  return (
    <div className="add-content-container">
      <h1>Ajouter un Film ou une Série</h1>
      <form onSubmit={handleSubmit} className="add-content-form">
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Entrez le titre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Entrez une description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Date de Sortie</label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            placeholder="Entrez le genre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="language">Langue</label>
          <input
            type="text"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            placeholder="Entrez la langue"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Note</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            placeholder="Entrez la note (1-10)"
            min="1"
            max="10"
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverImage">URL de l'image de couverture</label>
          <input
            type="text"
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            required
            placeholder="Entrez l'URL de l'image"
          />
        </div>
        <button type="submit" className="submit-button">Ajouter</button>
      </form>
    </div>
  );
};

export default AddContent;
