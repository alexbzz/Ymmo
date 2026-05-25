const agentService = require('./agent.service');
const { success, error } = require('../../shared/utils/apiResponse');

const getAll = async (req, res) => {
  try {
    const agents = await agentService.findAll();
    return success(res, agents);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const getById = async (req, res) => {
  try {
    const agent = await agentService.findById(req.params.id);
    if (!agent) return error(res, 'Agent introuvable.', 404);
    return success(res, agent);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const getMyStats = async (req, res) => {
  try {
    const stats = await agentService.getStats(req.user.id);
    return success(res, stats);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

const updateMe = async (req, res) => {
  try {
    const agent = await agentService.update(req.user.id, req.body);
    return success(res, agent);
  } catch (err) {
    return error(res, err.message, err.status || 500);
  }
};

module.exports = { getAll, getById, getMyStats, updateMe };
