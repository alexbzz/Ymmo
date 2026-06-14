const { error, success } = require('../../Shared/utils/apiResponse');
const adminService = require('./admin.service');

const ALLOWED_ROLES = ['CLIENT', 'AGENT', 'ADMIN'];

const getOverview = async (req, res) => {
  try {
    const overview = await adminService.getOverview();
    return success(res, overview);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await adminService.listUsers();
    return success(res, users);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!ALLOWED_ROLES.includes(role)) {
      return error(res, 'Rôle invalide.', 400);
    }

    if (req.params.id === req.user.id && role !== 'ADMIN') {
      return error(res, 'Vous ne pouvez pas retirer votre propre rôle admin.', 400);
    }

    const user = await adminService.changeRole(req.params.id, role);
    return success(res, user);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return error(res, 'Vous ne pouvez pas supprimer votre propre compte.', 400);
    }

    const user = await adminService.findUserById(req.params.id);
    if (!user) {
      return error(res, 'Utilisateur introuvable.', 404);
    }

    if (user.role === 'ADMIN') {
      return error(res, 'Un compte admin ne peut pas être supprimé depuis cette interface.', 400);
    }

    if (user._count.transactions > 0) {
      return error(res, 'Impossible de supprimer un compte qui possède des transactions.', 400);
    }

    await adminService.removeUser(req.params.id);
    return success(res, { message: 'Compte supprimé avec succès.' });
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

module.exports = {
  getOverview,
  getUsers,
  updateUserRole,
  deleteUser,
};
