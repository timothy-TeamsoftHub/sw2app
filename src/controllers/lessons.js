const db = require('../db');
async function listLessons(req,res){
  try{ const r = await db.query('SELECT id,title,subject,grade_level AS grade,duration_seconds AS duration,media_url FROM lessons'); res.json({ok:true, lessons: r.rows}); }
  catch(e){ res.status(500).json({error:'Failed to list lessons'}); }
}
async function createLesson(req,res){
  // simple auth role check
  if(!req.user || req.user.role !== 'teacher') return res.status(403).json({error:'Only teachers can create lessons'});
  const { title, subject, grade, duration, media_url, content } = req.body;
  try{
    const q = 'INSERT INTO lessons (title,subject,grade_level,duration_seconds,media_url,content,created_by) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id,title';
    const r = await db.query(q, [title,subject,grade,duration,media_url,content, req.user.userId]);
    res.json({ok:true, lesson: r.rows[0]});
  }catch(e){ console.error(e); res.status(500).json({error:'Failed to create lesson'}); }
}
module.exports = { listLessons, createLesson };