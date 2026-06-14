const jwt = require('jsonwebtoken');
const { error } = require('../utils/apiResponse');

/*
  Ce fichier contient les middlewares d'authentification et d'autorisation pour l'application.
  Le middleware "authenticate" vérifie la présence et la validité du token JWT dans l'en-tête Authorization.
  Le middleware "authorize" vérifie si l'utilisateur a le rôle requis pour accéder à une route spécifique.
*/

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'Token manquant ou invalide.', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, email }
    next();
  } catch (err) {
    return error(res, 'Token expiré ou invalide.', 401);
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return error(res, 'Accès interdit — permissions insuffisantes.', 403);
  }
  next();
};

module.exports = { authenticate, authorize };