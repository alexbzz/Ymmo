const express = require('express');
const axios = require('axios');
const { error } = require('../../Shared/utils/apiResponse');

const router = express.Router();
const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';

const analyticsService = axios.create({
  baseURL: PYTHON_SERVICE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

const proxyAnalyticsRequest = async (req, res, path) => {
  try {
    const response = await analyticsService.request({
      method: req.method,
      url: path,
      data: req.body,
    });

    return res.json(response.data);
  } catch (err) {
    if (!err.response) {
      return error(res, "Le service d'analyse est temporairement indisponible.", 503);
    }

    const statusCode = err.response.status || 500;
    const payload = err.response.data || {};
    const message = payload.message || payload.detail || err.message;

    return error(res, message, statusCode);
  }
};

router.get('/market', (req, res) => proxyAnalyticsRequest(req, res, '/analytics/market'));
router.get('/popular', (req, res) => proxyAnalyticsRequest(req, res, '/analytics/popular'));
router.get('/predictions', (req, res) => proxyAnalyticsRequest(req, res, '/analytics/predictions'));
router.post('/predict', (req, res) => proxyAnalyticsRequest(req, res, '/analytics/predict'));

module.exports = router;
