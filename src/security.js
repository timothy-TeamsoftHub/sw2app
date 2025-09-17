
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

function security(app){
  app.use(helmet());
  app.set('trust proxy', 1);
  app.use(rateLimit({ windowMs: 1*60*1000, max: 120 })); // 120 req per minute per IP
}

function validate(rules){
  return async (req,res,next)=>{
    await Promise.all(rules.map(rule=>rule.run(req)));
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    next();
  };
}

module.exports = { security, validate };
