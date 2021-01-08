const url = require('url');
const get = require('./get');
const post = require('./post');

function handleAction(req,res){
  const {method} = req;
  switch(method){
    case 'GET':
      get(req,res)
      break;
    case 'POST':
      post(req,res);
      break;
    case 'OPTIONS':
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
      })
      res.end();
      break;
    default:
      res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'})
      res.end('not found')
  }

}

module.exports = handleAction;