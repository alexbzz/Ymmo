const favoriteService = require('./favorite.service');
const { success, error } = require('../../Shared/utils/apiResponse');

/*
  Ce fichier contient les contrôleurs pour gérer les favoris.
  Il définit les fonctions pour ajouter un favori, supprimer un favori et récupérer les favoris d'un utilisateur.
  Chaque fonction utilise le service de favoris pour interagir avec la base de données et renvoie une réponse JSON appropriée.
*/

const add = async (req, res) => {
  try {
    const favorite = await favoriteService.add(req.user.id, req.params.propertyId);
    return success(res, favorite, 201);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const remove = async (req, res) => {
  try {
    await favoriteService.remove(req.user.id, req.params.propertyId);
    return success(res, { message: 'Retiré des favoris.' });
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const getMyFavorites = async (req, res) => {
  try {
    const favorites = await favoriteService.findMyFavorites(req.user.id);
    return success(res, favorites);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

module.exports = { add, remove, getMyFavorites };