require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./shared/middlewares/errorHandler');

const app = express();

// ── Sécurité ──────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));

// ── Rate Limiting ─────────────────────────────────────
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes, réessaie dans 15 minutes.'
}));

// ── Body Parser ───────────────────────────────────────
app.use(express.json());

// ── Routes ────────────────────────────────────────────
app.use('/api/auth',         require('./modules/auth/auth.routes'));
app.use('/api/users',        require('./modules/users/user.routes'));
app.use('/api/properties',   require('./modules/properties/property.routes'));
app.use('/api/agents',       require('./modules/agents/agent.routes'));
app.use('/api/transactions', require('./modules/transactions/transaction.routes'));
app.use('/api/favorites',    require('./modules/favorites/favorite.routes'));
app.use('/api/analytics',    require('./modules/analytics/analytics.routes'));

// ── Route protégée de test ────────────────────────────
const { authenticate } = require('./shared/middlewares/auth');
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ success: true, message: `Bonjour ${req.user.email} !`, role: req.user.role });
});

// ── Health check ──────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// ── Gestion des erreurs ───────────────────────────────
app.use(errorHandler);

module.exports = app;