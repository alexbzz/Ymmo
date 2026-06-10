const favoriteService = require('./favorite.service');
const { success, error } = require('../../shared/utils/apiResponse');

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