const transactionService = require('./transaction.service');
const { success, error } = require('../../shared/utils/apiResponse');

const create = async (req, res) => {
  const { propertyId, offerPrice } = req.body;
  if (!propertyId || !offerPrice) return error(res, 'propertyId et offerPrice requis.', 400);
  try {
    const transaction = await transactionService.create(req.user.id, propertyId, offerPrice);
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