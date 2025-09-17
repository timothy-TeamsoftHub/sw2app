const db = require('../db');

async function getQuiz(req,res){
  const id = req.params.id;
  try{
    const r = await db.query('SELECT id,lesson_id,title,passing,time_limit_seconds AS timeLimit,questions FROM quizzes WHERE id=$1', [id]);
    if(r.rowCount===0) return res.status(404).json({error:'Quiz not found'});
    res.json({ok:true, quiz: r.rows[0]});
  }catch(e){ console.error(e); res.status(500).json({error:'Failed to fetch quiz'}); }
}

async function submitAttempt(req,res){
  const id = req.params.id;
  const { answers } = req.body;
  if(!req.user) return res.status(401).json({error:'Unauthorized'});
  try{
    const r = await db.query('SELECT id,questions,passing FROM quizzes WHERE id=$1', [id]);
    if(r.rowCount===0) return res.status(404).json({error:'Quiz not found'});
    const quiz = r.rows[0];
    // grade: assume questions is json array with answer field for mcq/tf/sa
    let scoreTotal = 0;
    const questions = quiz.questions;
    for(let i=0;i<questions.length;i++){
      const q = questions[i];
      const a = answers[i];
      if(q.type==='mcq'){ if(Number(a) === Number(q.answer)) scoreTotal++; }
      else if(q.type==='tf'){ if(Boolean(a) === Boolean(q.answer)) scoreTotal++; }
      else { if(String(a).trim().toLowerCase() === String(q.answer).trim().toLowerCase()) scoreTotal++; }
    }
    const score = Math.round((scoreTotal / questions.length) * 100);
    await db.query('INSERT INTO attempts (quiz_id, student_id, score, answers) VALUES ($1,$2,$3,$4)', [id, req.user.userId, score, JSON.stringify(answers)]);
    res.json({ok:true, score});
  }catch(e){ console.error(e); res.status(500).json({error:'Failed to submit attempt'}); }
}

module.exports = { getQuiz, submitAttempt };