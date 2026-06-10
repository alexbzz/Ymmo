const express    = require('express');
const router     = express.Router();
const controller = require('./agent.controller');
const { authenticate, authorize } = require('../../shared/middlewares/auth');

router.get('/',          controller.getAll);
router.get('/my-stats',  authenticate, authorize('AGENT'), controller.getMyStats);
router.get('/:id',       controller.getById);
router.put('/me',        authenticate, authorize('AGENT'), controller.updateMe);

module.exports = router;
