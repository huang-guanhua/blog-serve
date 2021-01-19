// const querystring = require('querystring')
const auth = require('./auth');

exports.changePostParam = function(req){
  return new Promise((resolve, reject) => {
    let datastr = ''
    req.on('data', (chunk) => {
      datastr+= chunk;
    })
    req.on('end', () => {
      if(datastr){
        resolve(JSON.parse(datastr));
      }else{
        const cook = req.headers.cookie || '';
        if(cook){
          let obj =  cook.split("; ").map(item => {const value = item.split('='); return {[value[0]]:value[1]}});
          obj = obj.reduce((total, item) => ({...total, ...item}), {});
          if(obj.auth){
            return resolve(auth.decoded(obj.auth));
          }
        }else{
          resolve('')
        }
      }
    })
    req.on('error', (err) => {
      resolve('')
    })
  })

  
}