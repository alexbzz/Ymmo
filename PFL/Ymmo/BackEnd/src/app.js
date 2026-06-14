require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./Shared/middlewares/errorHandler');

const app = express();

// Sécurité
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes, réessaie dans 15 minutes.'
}));

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth',         require('./Modules/auth/auth.routes'));
app.use('/api/users',        require('./Modules/users/user.routes'));
app.use('/api/properties',   require('./Modules/properties/property.routes'));
app.use('/api/agents',       require('./Modules/agents/agent.routes'));
app.use('/api/transactions', require('./Modules/transactions/transaction.routes'));
app.use('/api/favorites',    require('./Modules/favorites/favorite.routes'));
app.use('/api/analytics',    require('./Modules/analytics/analytics.routes'));
app.use('/api/admin',        require('./Modules/admin/admin.routes'));

// Route protégée de test
const { authenticate } = require('./Shared/middlewares/auth');

app.get('/api/protected', authenticate, (req, res) => {
  res.json({ success: true, message: `Bonjour ${req.user.email} !`, role: req.user.role });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Gestion des erreurs
app.use(errorHandler);

module.exports = app;
