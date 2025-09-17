const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { me, allUsers } = require('../controllers/users');

router.get('/me', auth, me);
router.get('/', auth, allUsers);

module.exports = router;