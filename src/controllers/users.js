const db = require('../db');
async function me(req,res){
  try{
    const q = 'SELECT id,name,email,role FROM users WHERE id=$1';
    const r = await db.query(q, [req.user.userId]);
    res.json({ok:true, user: r.rows[0]});
  }catch(e){ res.status(500).json({error:'Failed to fetch user'}); }
}
async function allUsers(req,res){
  try{ const r = await db.query('SELECT id,name,email,role FROM users'); res.json({ok:true, users:r.rows}); }
  catch(e){ res.status(500).json({error:'Failed to fetch users'}); }
}
module.exports = { me, allUsers };