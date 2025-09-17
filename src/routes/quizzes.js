const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getQuiz, submitAttempt } = require('../controllers/quizzes');

router.get('/:id', getQuiz);
router.post('/:id/attempt', auth, submitAttempt);

module.exports = router;