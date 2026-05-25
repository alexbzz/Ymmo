const express    = require('express');
const router     = express.Router();
const controller = require('./favorite.controller');
const { authenticate } = require('../../shared/middlewares/auth');

router.post('/:propertyId',   authenticate, controller.add);
router.delete('/:propertyId', authenticate, controller.remove);
router.get('/',               authenticate, controller.getMyFavorites);

module.exports = router;