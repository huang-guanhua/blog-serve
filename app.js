const https = require('https');
const http = require('http');
const routers = require('./router');
const fs = require('fs');
// const httpport = 8080;
const httpsport = 443;

const options = {
  key: fs.readFileSync('./keys/4964770_huangguanhua.cn.key'),
  cert: fs.readFileSync('./keys/4964770_huangguanhua.cn.pem')
};


const handle = (request, response) => {
  routers(request, response);
}

// http.createServer(handle).listen(httpport, () => {
//   console.log(`http server is success，listen on ${httpport}`)
// })
https.createServer(options, handle).listen(httpsport, () => {
  console.log(`server is success，listen on ${httpsport}`)
})
