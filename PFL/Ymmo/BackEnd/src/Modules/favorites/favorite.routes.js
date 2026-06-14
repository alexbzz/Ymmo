const express    = require('express');
const router     = express.Router();
const controller = require('./favorite.controller');
const { authenticate } = require('../../Shared/middlewares/auth');

// â”€â”€ Routes pour les favoris â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
router.post('/:propertyId',   authenticate, controller.add);
router.delete('/:propertyId', authenticate, controller.remove);
router.get('/',               authenticate, controller.getMyFavorites);

module.exports = router;