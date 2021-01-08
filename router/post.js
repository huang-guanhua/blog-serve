const url = require('url');
const userController = require('../controller/user');
const tool = require('../util');

module.exports = function(req,res){
  const {pathname, query} = url.parse(req.url, true);

  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Content-Type": "text/json; charset=utf-8"
  })

  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

  if(pathname === '/api/register'){
    tool.changePostParam(req).then(value => {
      if(value.name && value.account && value.password){
        userController.addUser(value)
        .then((respones) => {
          if(respones){
            res.end(JSON.stringify({status: 200, reg: 1, message: '注册成功'}));
          } else {
            res.end(JSON.stringify({status: 200, message: '注册失败'}));
          }
        }).catch(err => {
          res.end(JSON.stringify({status: 200, message: err}));
        })
      } else {
        res.end(JSON.stringify({status: 200, message: '参数不足-注册'}));
      }   
    }).catch(err => {
      res.end(JSON.stringify({status: 200, message: err}));
    });
  } else if (pathname === '/api/login'){
    tool.changePostParam(req).then(value => {
      if(value.account && value.password){
        userController.login(value)
        .then(respones => {
          if(respones){
            res.end(JSON.stringify({status: 200, auth: 1, user: value.account, message: '验证成功'}));
          }else {
            res.end(JSON.stringify({status: 200, auth: 0, message: `验证失败`}));
          }
        })
        .catch(err => {
          res.end(JSON.stringify({status: 200, message: err}));
        })
      } else {
        res.end(JSON.stringify({status: 200, message: '参数不足-登录'}));
      }
    })
  } else {
    res.statusCode = 404
    res.end(JSON.stringify({status: 404, method: 'post'}));
  }
}