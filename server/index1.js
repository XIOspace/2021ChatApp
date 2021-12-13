var app = require('express')();
var http = require('http').createServer(app);
const options={
	cors:true,
	origins:"*"
}
var io = require('socket.io')(http, options);

app.get('/', function(req, res){
   res.send("server is running...")
});



var userlist= [];
var msglist= [];


function inArrayUser(el,arr){
	let isFind = false

	arr.map(v=>{

		if(v.name == el.name && v.id == el.id)
			isFind = true

	})

	return isFind

}

function inArrayMsg(el,arr){

	let isFind = false

	arr.map(v=>{

		if(v.user == el.user && v.ctn == el.ctn)
			isFind = true

	})

	return isFind

}

io.on('connection', function(socket){

  io.emit('init_user',JSON.stringify(userlist))
  io.emit('init_msg',JSON.stringify(msglist))
  socket.on('toServer',data=>{
	  io.emit('chat',data);
  })
  socket.on('userlist',user=>{

  		const client = JSON.parse(user)

  		let tmp = []

  		userlist.map(v=>{
  			tmp.push(v)
  		})

  		client.map(v=>{
  			

  			if(!inArrayUser(v,tmp))
  				tmp.push(v)

  		})

  		userlist = tmp

  		console.log(userlist)

  		io.emit('init_user',JSON.stringify(userlist))


  })

  socket.on('msglist',msg=>{

  		const client = JSON.parse(msg)

  		let tmp = []

  		msglist.map(v=>{
  			tmp.push(v)
  		})

  		client.map(v=>{

  			if(!inArrayMsg(v,tmp))
  				tmp.push(v)

  		})

  		msglist = tmp

  		console.log(msglist)

  		io.emit('init_msg',JSON.stringify(msglist))


  })



});



http.listen(3000, function(){
  console.log('listening on *:3000');
});