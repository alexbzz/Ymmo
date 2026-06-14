const express    = require('express');
const router     = express.Router();
const controller = require('./agent.controller');
const { authenticate, authorize } = require('../../Shared/middlewares/auth');

router.get('/',          controller.getAll);
router.get('/my-stats',  authenticate, authorize('AGENT'), controller.getMyStats);
router.post('/register', authenticate, authorize('AGENT'), controller.register);
router.put('/me',        authenticate, authorize('AGENT'), controller.updateMe);
router.get('/:id',       controller.getById);

module.exports = router;
