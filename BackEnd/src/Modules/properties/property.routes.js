const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'properties ok' }));
module.exports = router;
