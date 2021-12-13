// const app = require('express')();
// const http = require('http').createServer(app);

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

// http.listen(3000, () => {
//   console.log('listening on *:3000');
// });

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
    res.send("server is running.....")
});

var userList= [];
var msgList= [];

io.on('connection', (socket) => {
  // console.log('a user connected');

  // socket.emit('chat message',1);
  socket.emit('init_user',JSONStringify(userList))
  socket.emit('init_msg',JSONStringify(msgList))

  socket.on('userList', user=>{
    const client = JSON.parse(user)
    userList = {...userList,...client}
  })
  socket.on('msgList', msg=>{
    const client = JSON.parse(msg)
    msgList = {...msgList,...client}
  })
});



http.listen(3000, () => {
  console.log('listening on *:3000');
});