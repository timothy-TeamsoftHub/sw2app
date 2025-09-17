const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const lessonRoutes = require('./lessons');
const quizRoutes = require('./quizzes');
const userRoutes = require('./users');

router.use('/auth', authRoutes);
router.use('/lessons', lessonRoutes);
router.use('/quizzes', quizRoutes);
router.use('/users', userRoutes);

router.get('/', (req,res)=>res.json({ok:true, msg:'SW2 API'}));

module.exports = router;