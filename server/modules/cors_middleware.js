const fixCors = (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
  };
  
  module.exports = { fixCors };
  