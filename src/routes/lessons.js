const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { listLessons, createLesson } = require('../controllers/lessons');

router.get('/', listLessons);
router.post('/', auth, createLesson); // teacher only - auth check in controller

module.exports = router;