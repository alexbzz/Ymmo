import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          YMMO
        </Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Accueil</Link>
          <Link to="/properties" style={styles.link}>Propriétés</Link>
          {user && user.role === 'AGENT' && (
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          )}
        </div>
        <div style={styles.auth}>
          {user ? (
            <>
              <span style={styles.username}>{user.firstName}</span>
              <button onClick={logout} style={styles.button}>Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Connexion</Link>
              <Link to="/register" style={styles.button}>Inscription</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: '#2c3e50',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none'
  },
  links: {
    display: 'flex',
    gap: '2rem'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.95rem'
  },
  auth: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  username: {
    color: '#fff'
  },
  button: {
    background: '#e74c3c',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
