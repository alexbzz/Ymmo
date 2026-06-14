const express = require('express');
const controller = require('./admin.controller');
const { authenticate, authorize } = require('../../Shared/middlewares/auth');

const router = express.Router();

router.get('/overview', authenticate, authorize('ADMIN'), controller.getOverview);
router.get('/users', authenticate, authorize('ADMIN'), controller.getUsers);
router.patch('/users/:id/role', authenticate, authorize('ADMIN'), controller.updateUserRole);
router.delete('/users/:id', authenticate, authorize('ADMIN'), controller.deleteUser);

module.exports = router;
