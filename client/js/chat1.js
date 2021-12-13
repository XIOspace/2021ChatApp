	var socket = io('http://localhost:3000');
	
	const app = new Vue({

		el: '#app',

		data: {

			userList: [],

			msgList: [],
			sendMsg: '',
			islogin: false,
			userName: '',
			userPasswd: '',
			uid : 0

		},
		created: function(){

			


		},
		methods:{

			updateDataUser: function(user){

				this.userList = user

			},

			updateDataMsg: function(msg){

				this.msgList = msg

			},
			sendChat: function(data){
				
				this.msgList.push({

					user: "qq",
					ctn: data

				})
			},

			sentChat: function(){

					let that = this

					//is login or not
					//


					const msg = this.sendMsg

					
					this.$http.post('http://localhost:8000/api/user',{

					},{
						
						headers: {
							'Authorization' : 'Bearer '+localStorage.token
						}


					}).then(function(res){


						const name = res.data.name
						const ids = res.data.id

						
						let isFind = false


						// that.userlist.map(user=>{

						// 	if(user.name == name && user.id == ids)
						// 		isFind = true

						// })

						if(!isFind){

							console.log(that.userList)

							that.userList.push({

								name: name,
								id: ids

							})

						}



						// that.msgList.push({

						// 	user: name,
						// 	ctn: msg

						// })

						socket.emit("userList",JSON.stringify(that.userList))
						socket.emit("msgList",JSON.stringify(that.msgList))
						socket.emit("toServer",msg);

					},err=>{


						that.islogin = true



					})



			},
			startLogin:function(){

				const userName = this.userName
				const userPasswd = this.userPasswd

				let that = this

				this.$http.post('http://localhost:8000/api/userlogin',{

					userName,
					userPasswd

				},{
					
					emulateJSON:true


				}).then(function(res){


					const data = res.data

					if(data.length == 0){


						alert("用户名或密碼錯誤");

					}else{


						localStorage.token = data.api_token

						that.islogin = false

						that.uid = data.id

					}


				})


			}


		}


	})
	socket.on('chat', data=>{
		app.sendChat(data);
	})

	