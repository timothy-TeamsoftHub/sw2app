const jwt = require('jsonwebtoken');
module.exports = function(req, res, next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({error:'Missing authorization header'});
  const token = auth.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  }catch(e){ return res.status(401).json({error:'Invalid token'}); }
};