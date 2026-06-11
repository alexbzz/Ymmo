import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navLinkStyle = ({ isActive }) => ({
  color: '#fff',
  textDecoration: 'none',
  fontSize: '0.95rem',
  opacity: isActive ? 1 : 0.85,
  fontWeight: isActive ? 600 : 400,
});

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav style={styles.navbar} role="navigation" aria-label="Navigation principale">
      <div className="navbar-container" style={styles.container}>
        <Link to="/" style={styles.logo} aria-label="YMMO — Accueil" onClick={closeMenu}>
          YMMO
        </Link>

        <button
          type="button"
          className="navbar-toggle btn"
          style={styles.toggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>

        <div
          id="navbar-menu"
          className={`navbar-menu${menuOpen ? ' navbar-menu--open' : ''}`}
        >
          <div className="navbar-links" style={styles.links} role="menubar">
            <NavLink to="/" style={navLinkStyle} role="menuitem" onClick={closeMenu}>Accueil</NavLink>
            <NavLink to="/properties" style={navLinkStyle} role="menuitem" onClick={closeMenu}>Propriétés</NavLink>
            <NavLink to="/analytics" style={navLinkStyle} role="menuitem" onClick={closeMenu}>Analytics</NavLink>
            {user && (
              <NavLink to="/favorites" style={navLinkStyle} role="menuitem" onClick={closeMenu}>Favoris</NavLink>
            )}
            {user && (user.role === 'CLIENT' || user.role === 'ADMIN') && (
              <NavLink to="/transactions" style={navLinkStyle} role="menuitem" onClick={closeMenu}>Mes offres</NavLink>
            )}
            {user && (user.role === 'AGENT' || user.role === 'ADMIN') && (
              <NavLink to="/dashboard" style={navLinkStyle} role="menuitem" onClick={closeMenu}>Dashboard</NavLink>
            )}
          </div>

          <div className="navbar-auth" style={styles.auth}>
            {user ? (
              <>
                <span style={styles.username} aria-label={`Connecté en tant que ${user.firstName}`}>
                  {user.firstName}
                </span>
                <button
                  type="button"
                  onClick={() => { logout(); closeMenu(); }}
                  style={styles.button}
                  aria-label="Se déconnecter"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" style={navLinkStyle} onClick={closeMenu}>Connexion</NavLink>
                <Link to="/register" style={styles.button} onClick={closeMenu}>Inscription</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: '#2c3e50',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
  },
  toggle: {
    background: 'transparent',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '0.4rem 0.75rem',
    fontSize: '1.25rem',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  auth: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  username: {
    color: '#fff',
  },
  button: {
    background: '#e74c3c',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '0.95rem',
    display: 'inline-block',
  },
};
