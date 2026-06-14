const express    = require('express'); 
const router     = express.Router();
const controller = require('./transaction.controller');
const { authenticate, authorize } = require('../../Shared/middlewares/auth');

// â”€â”€ Routes pour les transactions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

router.post('/',     authenticate, authorize('CLIENT', 'ADMIN'), controller.create);
router.get('/me',    authenticate, controller.getMyTransactions);
router.patch('/:id', authenticate, authorize('AGENT', 'ADMIN'), controller.updateStatus);

module.exports = router;
