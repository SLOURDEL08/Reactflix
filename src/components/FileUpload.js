import React, { useState } from 'react';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const FileUpload = ({ type, slug, onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    poster: null,
    wallpaper1: null,
    wallpaper2: null,
    titleImage: null,
    videoSrc: null
  });

  const uploadFile = async (file, fileType) => {
    if (!file) return null;

    try {
      // Créer une référence unique pour le fichier
      const storageRef = ref(storage, `content/${type}s/${slug}/${fileType}`);
      
      // Upload le fichier
      const snapshot = await uploadBytes(storageRef, file);
      
      // Obtenir l'URL de téléchargement
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Erreur upload:', error);
      throw error;
    }
  };

  const handleFileChange = async (e, fileType, stateKey) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadFile(file, fileType);
      
      setUploadedFiles(prev => {
        const updated = {
          ...prev,
          [stateKey]: url // Utiliser la clé d'état correcte
        };

        // Vérifier si tous les fichiers sont uploadés
        const allUploaded = Object.entries(updated).every(([key, value]) => value !== null);
        
        if (allUploaded) {
          console.log('Tous les fichiers uploadés:', updated);
          onUploadComplete(updated);
        }

        return updated;
      });
    } catch (error) {
      console.error(`Erreur upload ${fileType}:`, error);
    } finally {
      setUploading(false);
    }
  };

  const uploadConfig = [
    { key: 'poster', label: 'Poster', file: 'poster.webp', stateKey: 'poster' },
    { key: 'wallpaper1', label: 'Wallpaper 1', file: 'wallpaper1.webp', stateKey: 'wallpaper1' },
    { key: 'wallpaper2', label: 'Wallpaper 2', file: 'wallpaper2.webp', stateKey: 'wallpaper2' },
    { key: 'title', label: 'Image du titre', file: 'title.webp', stateKey: 'titleImage' },
    { key: 'trailer', label: 'Trailer vidéo', file: 'trailer.mp4', stateKey: 'videoSrc' }
  ];

  return (
    <div className="file-upload-container">
      <h3>Télécharger les fichiers médias</h3>
      
      <div className="upload-grid">
        {uploadConfig.map((item) => (
          <div key={item.key} className="upload-item">
            <label className={`upload-label ${uploadedFiles[item.stateKey] ? 'completed' : ''}`}>
              <span>{item.label}</span>
              <input
                type="file"
                accept={item.file.endsWith('mp4') ? 'video/mp4' : 'image/webp'}
                onChange={(e) => handleFileChange(e, item.file, item.stateKey)}
                disabled={uploading}
              />
              {uploadedFiles[item.stateKey] ? (
                <span className="upload-success">✓ Uploadé</span>
              ) : (
                <span>Choisir un fichier</span>
              )}
            </label>
          </div>
        ))}
      </div>

     

     
    </div>
  );
};

export default FileUpload;