const axios = require('axios');
const { success, error } = require('../../shared/utils/apiResponse');

const PYTHON_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';

const predictPrice = async (req, res) => {
  try {
    const { city, surface, rooms } = req.query;
    if (!city || !surface || !rooms) {
      return error(res, 'city, surface et rooms sont requis.', 400);
    }
    const response = await axios.get(`${PYTHON_URL}/predict`, {
      params: { city, surface: Number(surface), rooms: Number(rooms) }
    });
    return success(res, response.data);
  } catch (err) {
    return error(res, 'Service IA indisponible.', 503);
  }
};

const getTrends = async (req, res) => {
  try {
    const response = await axios.get(`${PYTHON_URL}/trends`, {
      params: req.query
    });
    return success(res, response.data);
  } catch (err) {
    return error(res, 'Service IA indisponible.', 503);
  }
};

const getPopular = async (req, res) => {
  try {
    const response = await axios.get(`${PYTHON_URL}/popular`);
    return success(res, response.data);
  } catch (err) {
    return error(res, 'Service IA indisponible.', 503);
  }
};

const getHealth = async (req, res) => {
  try {
    const response = await axios.get(`${PYTHON_URL}/health`);
    return success(res, response.data);
  } catch (err) {
    return error(res, 'Service IA indisponible.', 503);
  }
};

module.exports = { predictPrice, getTrends, getPopular, getHealth };