const fs = require('fs');
const path = require('path');
const moduleInfo = require('../util/restype');

module.exports = function(req,res,next){
  const {url} = req;
  // const urlInfo = url === '/' ? 'index.html' : url;
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
    } else {
      next(req,res);
    }
  })
}