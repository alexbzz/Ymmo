const userService = require('./user.service');
const { success, error } = require('../../shared/utils/apiResponse');

const getMe = async (req, res) => {
  try {
    const user = await userService.findById(req.user.id);
    if (!user) return error(res, 'Utilisateur introuvable.', 404);
    return success(res, user);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const updateMe = async (req, res) => {
  try {
    const user = await userService.update(req.user.id, req.body);
    return success(res, user);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const deleteMe = async (req, res) => {
  try {
    await userService.remove(req.user.id);
    return success(res, { message: 'Compte supprimé avec succès.' });
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

module.exports = { getMe, updateMe, deleteMe };