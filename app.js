const http = require('http');
const routers = require('./router');
const port = 80;

const handle = (request, response) => {
  routers(request, response);
}

http.createServer(handle).listen(port, () => {
  console.log(`server is success，listen on ${port}`)
})
