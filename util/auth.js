const jwt= require('jsonwebtoken');

const secret = 'huangguanhuablog';

exports.sign = function (user){
  return jwt.sign(user, secret, { expiresIn: 1000 * 10 })
}

exports.decoded = function (token){
  return jwt.verify(token, secret, function(err, decoded){
    if(err){
      return '';
    }else{
      return decoded;
    }
  })  
}