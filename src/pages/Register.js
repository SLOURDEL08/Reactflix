import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [error, setError] = useState('');
 const [loading, setLoading] = useState(false);
 const { signup } = useAuth();
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   
   if (password !== confirmPassword) {
     return setError('Les mots de passe ne correspondent pas');
   }
   
   try {
     setError('');
     setLoading(true);
     await signup(email, password);
     navigate('/');
   } catch (error) {
     setError('Échec de la création du compte : ' + error.message);
   }
   
   setLoading(false);
 };

 return (
   <div className="register-container">
     <div className="register-overlay">
       <div className="register-box">
         <div className="register-logo">
           <img src="/images/nflix.webp" alt="Netflix Logo" className="logo-image" />
         </div>

         <h2 className="register-title">Inscription</h2>

         {error && (
           <div className="register-error">
             {error}
           </div>
         )}

         <form onSubmit={handleSubmit} className="register-form">
           <div className="form-group">
             <input
               id="email"
               type="email"
               required
               className="register-input"
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
               className="register-input"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Mot de passe"
             />
           </div>

           <div className="form-group">
             <input
               id="confirm-password"
               type="password"
               required
               className="register-input"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               placeholder="Confirmer le mot de passe"
             />
           </div>

           <button
             type="submit"
             disabled={loading}
             className="register-button"
           >
             {loading ? 'Inscription...' : 'S\'inscrire'}
           </button>

           <div className="register-footer">
             <span className="register-text">Déjà sur Netflix ?</span>
             <Link to="/login" className="register-link">
               Se connecter
             </Link>
           </div>
         </form>
       </div>
     </div>
   </div>
 );
};

export default Register;