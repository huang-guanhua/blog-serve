const https = require('https');
const routers = require('./router');
const fs = require('fs');
const port = 443;

const options = {
  key: fs.readFileSync('./keys/4964770_huangguanhua.cn.key'),
  cert: fs.readFileSync('./keys/4964770_huangguanhua.cn.pem')
};


const handle = (request, response) => {
  routers(request, response);
}

https.createServer(options, handle).listen(port, () => {
  console.log(`server is success，listen on ${port}`)
})
