const transactionService = require('./transaction.service');
const { createTransactionSchema } = require('./transaction.validation');
const { success, error } = require('../../Shared/utils/apiResponse');

/*
  Ce fichier contient les contrôleurs pour gérer les transactions.
  Il définit les fonctions pour créer une transaction, récupérer les transactions d'un utilisateur et mettre à jour le statut d'une transaction.
  Chaque fonction utilise le service de transaction pour interagir avec la base de données et renvoie une réponse JSON appropriée.
*/

const create = async (req, res) => {
  const { value, error: validationError } = createTransactionSchema.validate(req.body);
  if (validationError) return error(res, validationError.details[0].message, 400);
  try {
    const transaction = await transactionService.create(req.user.id, value.propertyId, value.offerPrice);
    return success(res, transaction, 201);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const getMyTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.findMyTransactions(req.user.id);
    return success(res, transactions);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const updateStatus = async (req, res) => {
  const { status } = req.body;
  if (!status) return error(res, 'Status requis.', 400);
  try {
    const transaction = await transactionService.updateStatus(req.params.id, req.user.id, status);
    return success(res, transaction);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

module.exports = { create, getMyTransactions, updateStatus };