/*
  Ce fichier contient le middleware de gestion des erreurs pour l'application.
  Il intercepte les erreurs générées dans les routes et renvoie une réponse JSON avec le statut HTTP approprié et un message d'erreur.
*/
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Erreur interne du serveur'
  });
};

module.exports = errorHandler;