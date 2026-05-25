const express    = require('express');
const router     = express.Router();
const controller = require('./property.controller');
const { authenticate, authorize } = require('../../shared/middlewares/auth');

router.get('/',       controller.getAll);
router.get('/:id',    controller.getById);
router.post('/',      authenticate, authorize('AGENT', 'ADMIN'), controller.create);
router.put('/:id',    authenticate, authorize('AGENT', 'ADMIN'), controller.update);
router.delete('/:id', authenticate, authorize('AGENT', 'ADMIN'), controller.remove);

module.exports = router;
