const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'analytics ok' }));
module.exports = router;
