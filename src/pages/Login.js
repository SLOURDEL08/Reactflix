import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Échec de la connexion : ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-overlay">
        <div className="login-box">
          <div className="login-logo">
            <img src="/images/nflix.webp" alt="Netflix Logo" className="logo-image" />
          </div>

          <h2 className="login-title">Connexion</h2>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                id="email"
                type="email"
                required
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <input
                id="password"
                type="password"
                required
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>

            <div className="login-footer">
              <span className="login-text">Première visite sur Netflix ?</span>
              <Link to="/register" className="login-link">
                S'inscrire
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;