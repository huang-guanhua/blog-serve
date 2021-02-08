const url = require('url');
const userController = require('../controller/user');
const email = require('../controller/email');
const tool = require('../util');
const auth = require('../util/auth');
const cookie = require('cookie');

module.exports = function(req,res){
  const {pathname, query} = url.parse(req.url, true);

  // const corsHead = {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
  //   "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
  //   "Content-Type": "text/json; charset=utf-8"
  // }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials",true);
  res.setHeader("Content-Type","text/json; charset=utf-8");

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
            const token = auth.sign({account:value.account, password: value.password});
            // console.log(token, 'token');
            // res.setHeader('Set-Cookie', `auth=${token}; path=/api`);
            res.setHeader('Set-Cookie', cookie.serialize('auth', `${token}` ,{
              // httpOnly: true,
              maxAge: 60 * 1,
              path: '/'
            }) );
            res.end(JSON.stringify({status: 200, auth: 1, user: value.account, message: '验证成功'}));
          }else {
            res.end(JSON.stringify({status: 200, auth: 0, message: `验证失败`}));
          }
        })
        .catch(err => {
          console.log('err',err)
          res.end(JSON.stringify({status: 200, message: err}));
        })
      } else {
        res.end(JSON.stringify({status: 200, message: '参数不足-登录'}));
      }
    })
  } else if (pathname === '/api/email'){
    tool.changePostParam(req).then(data => {
      if(data.url && data.type){
        email.sendEmail(data).then(value => {
          if(value){
            res.end(JSON.stringify({status: 200, message: '邮件发送成功'}));
          }else{
            res.end(JSON.stringify({status: 500, message: '邮件发送异常'}));
          }
        }).catch(err => {
          res.end(JSON.stringify({status: 500, message: '邮件发送失败', err:err}));
        })

      }else{
        res.end(JSON.stringify({status: 200, message: '失败，参数有误或不足'}))
      }
    })
  } else {
    res.statusCode = 404
    res.end(JSON.stringify({status: 404, method: 'post'}));
  }
}