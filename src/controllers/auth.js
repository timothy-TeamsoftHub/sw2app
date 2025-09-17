const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

async function register(req, res){
  const { name, email, phone, password, role } = req.body;
  if(!email || !password) return res.status(400).json({error:'email and password required'});
  const hashed = await bcrypt.hash(password, 10);
  const q = 'INSERT INTO users (name,email,phone,password_hash,role) VALUES ($1,$2,$3,$4,$5) RETURNING id,name,email,role';
  try{
    const r = await db.query(q, [name,email,phone,hashed,role||'student']);
    const user = r.rows[0];
    const token = jwt.sign({userId: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn:'30d'});
    res.json({ok:true, user, token});
  }catch(e){ console.error(e); res.status(500).json({error:'Registration failed'}); }
}

async function login(req,res){
  const { identifier, password } = req.body;
  if(!identifier || !password) return res.status(400).json({error:'identifier and password required'});
  const q = 'SELECT id,name,email,password_hash,role FROM users WHERE email=$1 OR phone=$1 LIMIT 1';
  try{
    const r = await db.query(q, [identifier]);
    if(r.rowCount===0) return res.status(401).json({error:'Invalid credentials'});
    const user = r.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if(!ok) return res.status(401).json({error:'Invalid credentials'});
    const token = jwt.sign({userId:user.id,role:user.role}, process.env.JWT_SECRET, {expiresIn:'30d'});
    res.json({ok:true, user:{id:user.id,name:user.name,email:user.email,role:user.role}, token});
  }catch(e){ console.error(e); res.status(500).json({error:'Login failed'}); }
}

module.exports = { register, login };