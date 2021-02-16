const url = require('url');
const even = require('./event');
const messageData = []

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
      // even().on('update', (value) => {
      //   ws.send(JSON.stringify(value))
      // })
      ws.on('message', function incoming(message) {
        const msg = JSON.parse(message);
        if(msg.name){
          messageData.push(msg);
        }
        if(msg.name === 'root'){
          messageData = []
        }
        ws.send(JSON.stringify({
          list: messageData
        }))
        socket.clients.forEach(function each(client) {
          if (client !== ws) {
            client.send(JSON.stringify({
              list: messageData
            }));
          }
        });
      });
    }

  });
}

function wssfun(socket){
  socket.on('connection', function connection(ws, request) {

    const {pathname, query} = url.parse(request.url, true);

    if(pathname === '/api/ws'){
      // even().on('update', (value) => {
      //   ws.send(JSON.stringify(value))
      // })
      ws.on('message', function incoming(message) {
        const msg = JSON.parse(message);
        if(msg.name){
          messageData.push(msg);
        }
        if(msg.name === 'root'){
          messageData = []
        }
        ws.send(JSON.stringify({
          list: messageData
        }))
        socket.clients.forEach(function each(client) {
          if (client !== ws) {
            client.send(JSON.stringify({
              list: messageData
            }));
          }
        });
      });
    }

  });
}


module.exports = socket;