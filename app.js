const https = require('https');
const http = require('http');
const routers = require('./router');
const fs = require('fs');
const WebSocket = require('ws');
const socket = require('./router/ws');
const httpport = 80;
const httpsport = 443;

const options = {
  key: fs.readFileSync('./keys/4964770_huangguanhua.cn.key'),
  cert: fs.readFileSync('./keys/4964770_huangguanhua.cn.pem')
};


const handle = (request, response) => {
  routers(request, response);
}

const serverhttp = http.createServer(handle);
const serverhttps = https.createServer(options, handle);

const ws = new WebSocket.Server({ server: serverhttp });
const wss = new WebSocket.Server({ server: serverhttps });
socket(ws, 'http')
socket(wss, 'https')

serverhttp.listen(httpport, () => {
  console.log(`http server is success，listen on ${httpport}`)
})
serverhttps.listen(httpsport, () => {
  console.log(`https server is success，listen on ${httpsport}`)
})
