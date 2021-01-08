// const querystring = require('querystring')

exports.changePostParam = function(req){
  return new Promise((resolve, reject) => {
    let datastr = ''
    req.on('data', (chunk) => {
      datastr+= chunk;
    })
    req.on('end', () => {
      resolve(JSON.parse(datastr));
    })
    req.on('error', (err) => {
      reject(err)
    })
  })
  
}