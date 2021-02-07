const url = require('url');
const even = require('./event');

/**
 * websocket 消息推送
 * 可根据某接口跟新实时推送全部
 */
function socket(wss, type){
  if(type === 'http'){
    wsfun(wss)
  }

  if(type === 'https'){
    wssfun(wss)
  }
}

function wsfun(socket){
  socket.on('connection', function connection(ws, request) {

    const {pathname, query} = url.parse(request.url, true);

    if(pathname === '/api/ws'){
      even().on('update', (value) => {
        ws.send(JSON.stringify(value))
      })
    }

  });
}

function wssfun(socket){
  socket.on('connection', function connection(ws, request) {

    const {pathname, query} = url.parse(request.url, true);

    if(pathname === '/api/ws'){
      even().on('update', (value) => {
        ws.send(JSON.stringify(value))
      })
    }

  });
}


module.exports = socket;