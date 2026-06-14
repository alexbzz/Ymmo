const express    = require('express');
const router     = express.Router();
const controller = require('./user.controller');
const { authenticate } = require('../../Shared/middlewares/auth');

router.get('/',    authenticate, controller.getMe);
router.put('/',    authenticate, controller.updateMe);
router.delete('/', authenticate, controller.deleteMe);

module.exports = router;
