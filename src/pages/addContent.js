import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';

const AddContent = () => {
  const navigate = useNavigate();
  // États existants
  const [type, setType] = useState('movie');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState('');
  const [rating, setRating] = useState('');
  const [duration, setDuration] = useState('');
  const [genres, setGenres] = useState([]);
  const [maturityRating, setMaturityRating] = useState('');
  const [language, setLanguage] = useState('');
  const [productionCompany, setProductionCompany] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [creator, setCreator] = useState('');
  const [seasons, setSeasons] = useState('');
  const [episodes, setEpisodes] = useState('');
  const [network, setNetwork] = useState('');
  const [status, setStatus] = useState('');
  const [episodeLength, setEpisodeLength] = useState('');
  const [error, setError] = useState('');

  // Nouveaux états pour la gestion des fichiers
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);

const availableGenres = [
    "Action", "Aventure", "Animation", "Comédie", "Crime", "Documentaire",
    "Drame", "Famille", "Fantaisie", "Histoire", "Horreur", "Musique",
    "Mystère", "Romance", "Science Fiction", "Thriller", "Guerre", "Western"
  ];

  const languages = [
    "Français", "Anglais", "Espagnol", "Allemand", "Italien", "Japonais",
    "Coréen", "Mandarin", "Hindi", "Arabe", "Portugais", "Russe"
  ];

  const maturityRatings = type === 'movie' 
    ? ["G", "PG", "PG-13", "R", "NC-17"] 
    : ["TV-Y", "TV-Y7", "TV-G", "TV-PG", "TV-14", "TV-MA"];

  const statusOptions = ["En cours", "Terminée", "Annulée"];

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[ùûü]/g, 'u')
      .replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setSlug(generateSlug(e.target.value));
  };

  const handleGenreChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setGenres(value);
  };

  const handleUploadComplete = (files) => {
    setUploadedFiles(files);
    setIsFormComplete(true);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!uploadedFiles) {
    setError('Veuillez télécharger tous les fichiers médias');
    return;
  }

  try {
    // Vérifier si un contenu avec ce slug existe déjà
    const collectionRef = collection(db, `${type}s`);
    const q = query(collectionRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setError('Un contenu avec ce titre existe déjà');
      return;
    }

    const commonData = {
      title,
      slug,
      type,
      description,
      cast: cast.split(',').map(item => item.trim()),
      rating: Number(rating),
      genres,
      maturityRating,
      language,
      ...uploadedFiles,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let contentData;
    if (type === 'movie') {
      contentData = {
        ...commonData,
        director,
        duration,
        releaseDate,
        productionCompany
      };
    } else {
      contentData = {
        ...commonData,
        creator,
        seasons: Number(seasons),
        episodes: Number(episodes),
        episodeLength,
        network,
        status,
        startYear: new Date(releaseDate).getFullYear(),
        endYear: status === 'Terminée' ? new Date().getFullYear() : null
      };
    }

    await addDoc(collectionRef, contentData);
    alert('Contenu ajouté avec succès !');
    navigate(`/${type}/${slug}`);

  } catch (err) {
    setError(`Erreur lors de l'ajout : ${err.message}`);
    console.error('Erreur:', err);
  }
};

  return (
    <div className="add-content-box">
      <h1 className="add-content-title">Ajouter un nouveau contenu</h1>

      {error && <div className="add-content-error">{error}</div>}

      <form onSubmit={handleSubmit} className="add-content-form">
        <div className="content-type-toggle">
          <button
            type="button"
            className={`type-button ${type === 'movie' ? 'active' : ''}`}
            onClick={() => {
              setType('movie');
              setUploadedFiles(null);
              setIsFormComplete(false);
            }}
          >
            Film
          </button>
          <button
            type="button"
            className={`type-button ${type === 'serie' ? 'active' : ''}`}
            onClick={() => {
              setType('serie');
              setUploadedFiles(null);
              setIsFormComplete(false);
            }}
          >
            Série
          </button>
        </div>

        {/* Section titre et slug */}
        <div className='flex-champ'>
          <div className="add-form-group">
            <input
              type="text"
              className="add-form-input"
              value={title}
              onChange={handleTitleChange}
              placeholder="Titre"
              required
            />
          </div>

          <div className="add-form-group">
            <input
              type="text"
              className="add-form-input"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Slug (url-format)"
              required
              readOnly
            />
          </div>
        </div>

        {/* Description */}
        <div className="add-form-group">
          <textarea
            className="add-form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>

        {/* Note IMDb */}
        <div className="add-form-group">
          <input
            type="number"
            className="add-form-input"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Note IMDb (1-10)"
            min="1"
            max="10"
            step="0.1"
            required
          />
        </div>

        {/* Champs conditionnels selon le type */}
        {type === 'movie' ? (
          <>
            <div className='flex-champ'>
              <div className="add-form-group">
                <input
                  type="text"
                  className="add-form-input"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                  placeholder="Réalisateur"
                  required
                />
              </div>
              <div className="add-form-group">
                <input
                  type="text"
                  className="add-form-input"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Durée (ex: 2h 30min)"
                  required
                />
              </div>
              <div className="add-form-group">
                <input
                  type="text"
                  className="add-form-input"
                  value={productionCompany}
                  onChange={(e) => setProductionCompany(e.target.value)}
                  placeholder="Société de production"
                  required
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='flex-champ'>
              <div className="add-form-group">
                <input
                  type="text"
                  className="add-form-input"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  placeholder="Créateur"
                  required
                />
              </div>
              <div className="add-form-group">
                <input
                  type="number"
                  className="add-form-input"
                  value={seasons}
                  onChange={(e) => setSeasons(e.target.value)}
                  placeholder="Nombre de saisons"
                  required
                />
              </div>
              <div className="add-form-group">
                <input
                  type="number"
                  className="add-form-input"
                  value={episodes}
                  onChange={(e) => setEpisodes(e.target.value)}
                  placeholder="Nombre d'épisodes"
                  required
                />
              </div>
            </div>
            <div className='flex-champ'>
              <div className="add-form-group">
                <input
                  type="text"
                  className="add-form-input"
                  value={episodeLength}
                  onChange={(e) => setEpisodeLength(e.target.value)}
                  placeholder="Durée par épisode (ex: 45min)"
                  required
                />
              </div>
              <div className="add-form-group">
                <input
                  type="text"
                  className="add-form-input"
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  placeholder="Chaîne/Network"
                  required
                />
              </div>
              <div className="add-form-group">
                <select
                  className="add-form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Statut de la série</option>
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {/* Casting */}
        <div className="add-form-group">
          <input
            type="text"
            className="add-form-input"
            value={cast}
            onChange={(e) => setCast(e.target.value)}
            placeholder="Casting (séparé par des virgules)"
            required
          />
        </div>

        {/* Genres */}
        <div className="add-form-group">
          <select
            className="add-form-select"
            multiple
            value={genres}
            onChange={handleGenreChange}
            required
          >
            {availableGenres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Informations supplémentaires */}
        <div className='flex-champ'>
          <div className="add-form-group">
            <select
              className="add-form-select"
              value={maturityRating}
              onChange={(e) => setMaturityRating(e.target.value)}
              required
            >
              <option value="">Classification d'âge</option>
              {maturityRatings.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="add-form-group">
            <select
              className="add-form-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            >
              <option value="">Langue</option>
              {languages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="add-form-group">
            <input
              type="date"
              className="add-form-input"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Upload de fichiers */}
          <FileUpload 
            type={type} 
            slug={slug}
            onUploadComplete={handleUploadComplete}
          />

        <button 
          type="submit" 
          className="add-form-button"
          disabled={!isFormComplete}
        >
          {!isFormComplete 
            ? 'Uploadez tous les fichiers médias' 
            : `Ajouter ${type === 'movie' ? 'le film' : 'la série'}`}
        </button>
      </form>
    </div>
  );
};

export default AddContent;