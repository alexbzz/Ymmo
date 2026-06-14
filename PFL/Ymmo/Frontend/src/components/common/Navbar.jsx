import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const linkClassName = ({ isActive }) => `navbar-link${isActive ? ' navbar-link--active' : ''}`;

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Navigation principale">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label="YMMO — Accueil" onClick={closeMenu}>
          <img src="/ymmo-logo.svg" alt="YMMO" className="navbar-logo-image" />
        </Link>

        <button
          type="button"
          className="navbar-toggle btn"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>

        <div id="navbar-menu" className={`navbar-menu${menuOpen ? ' navbar-menu--open' : ''}`}>
          <div className="navbar-links" role="menubar">
            <NavLink to="/" className={linkClassName} role="menuitem" onClick={closeMenu}>Accueil</NavLink>
            <NavLink to="/properties" className={linkClassName} role="menuitem" onClick={closeMenu}>Propriétés</NavLink>
            <NavLink to="/analytics" className={linkClassName} role="menuitem" onClick={closeMenu}>Analytics</NavLink>
            {user && <NavLink to="/favorites" className={linkClassName} role="menuitem" onClick={closeMenu}>Favoris</NavLink>}
            {user && (user.role === 'CLIENT' || user.role === 'ADMIN') && (
              <NavLink to="/transactions" className={linkClassName} role="menuitem" onClick={closeMenu}>Mes offres</NavLink>
            )}
            {user && (user.role === 'AGENT' || user.role === 'ADMIN') && (
              <NavLink to="/dashboard" className={linkClassName} role="menuitem" onClick={closeMenu}>Dashboard</NavLink>
            )}
            {user && user.role === 'ADMIN' && (
              <NavLink to="/admin" className={linkClassName} role="menuitem" onClick={closeMenu}>Administration</NavLink>
            )}
          </div>

          <div className="navbar-auth">
            {user ? (
              <>
                <span className="navbar-username" aria-label={`Connecté en tant que ${user.firstName}`}>
                  {user.firstName}
                </span>
                <button
                  type="button"
                  onClick={() => { logout(); closeMenu(); }}
                  className="btn btn-primary"
                  aria-label="Se déconnecter"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClassName} onClick={closeMenu}>Connexion</NavLink>
                <Link to="/register" className="btn btn-primary" onClick={closeMenu}>Inscription</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
