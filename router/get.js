const url = require('url');
const static = require('./static');
const userController = require('../controller/user');

module.exports = function(req,res){
  // const {url} = req;
  static(req,res, next);
  const {pathname, query} = url.parse(req.url, true);
  function next(req,res){

    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    if(pathname === '/api/list'){
      // res.setHeader('Access-Control-Allow-Origin', '*');
      userController.selectData()
      .then(value => {
        res.writeHead(200, {'Content-Type' : `text/json; charset=utf-8`});
        res.end(JSON.stringify({status: 200, data: value, success: 'ok', url: pathname}));
      })
      .catch(err => {
        res.end(JSON.stringify({status: 500, message: err}));
      })
      
    } else if (pathname === '/api/all'){
      res.writeHead(200, {'Content-Type' : `application/json; charset=utf-8`});
      userController.selectALl()
      .then(value => {
        res.end(JSON.stringify({status: 200, data: value, success: 'ok', url: pathname}));
      })
      .catch(err => {
        res.end(JSON.stringify({status: 500, message: err}));
      })
    } else if(pathname === '/api/red'){
      res.writeHead(302,{
        'Location': 'http://baidu.com'
      })
      res.end();
    } else if(pathname === '/api/req'){
      res.writeHead(200, {'Content-Type' : `text/json; charset=utf-8`});
      res.end("var returnIp = {a: 1,b:2}")
      // res.end(JSON.stringify({status: 200, data: {}, success: 'ok', url: url}));
    } else if(pathname === '/api/menu/list'){
      userController.findItemList(query)
      .then(value => {
        res.writeHead(200, {'Content-Type' : `text/json; charset=utf-8`});
        res.end(JSON.stringify({status: 200, data: {limit: Number(query.limit), start: Number(query.start), ...value}, success: 'ok', url: pathname}));
      })
      .catch(err => {
        res.end(JSON.stringify({status: 500, message: err}));
      })
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({status: 404, method: 'get'}));
    }
  }
  
}