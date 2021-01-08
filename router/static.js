const fs = require('fs');
const path = require('path');
const moduleInfo = require('../util/restype');

module.exports = function(req,res,next){
  const {url} = req;
  const urlInfo = url === '/' ? 'index.html' : url;
  const ext = path.extname(urlInfo);
  
  fs.readFile(path.resolve(process.cwd(), `./public/build/${urlInfo}`), async (err, data) => {
    if(!err){
      const resType = await moduleInfo.contentTypeinfo(ext);
      res.writeHead(200, {'Content-Type' : `${resType}; charset=utf-8`});
      res.end(data);
    } else {
      next(req,res);
    }
  })
}