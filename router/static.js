const fs = require('fs');
const path = require('path');
const moduleInfo = require('../util/restype');

module.exports = function(req,res,next){
  const {url} = req;
  // const urlInfo = url === '/' ? 'index.html' : url;
  const projectListName = ['blog']; //TODO 本应该fs模块读取文件夹下面所有文件名返回数组
  const isProjectrRoot = projectListName.filter(item => url.indexOf(item) !== -1);
  const urlLength = url.length;
  const urlInfo = url[urlLength - 1] === '/' ? url + 'index.html' : url;
  const ext = path.extname(urlInfo);
  
  fs.readFile(path.resolve(process.cwd(), `/home/deploy${urlInfo}`), async (err, data) => {
    if(!err){
      const resType = await moduleInfo.contentTypeinfo(ext);
      res.writeHead(200, {'Content-Type' : `${resType}; charset=utf-8`});
      res.end(data);
    }else if(url === '/'){
      res.writeHead(200, {'Content-Type' : `text/html; charset=utf-8`});
      res.end('访问地址路径不正确，需要具体到项目地址');
    }else if(isProjectrRoot.length){
      fs.readFile(path.resolve(process.cwd(), `/home/deploy/${isProjectrRoot[0]}/index.html`), async (err, data) => {
        if(!err){
          const resType = await moduleInfo.contentTypeinfo(ext);
          res.writeHead(200, {'Content-Type' : `${resType}; charset=utf-8`});
          res.end(data);
        } else {
          res.writeHead(404, {'Content-Type' : `${resType}; charset=utf-8`});
          res.end('no found');
        }
      })
    } else {
      next(req,res);
    }
  })
}