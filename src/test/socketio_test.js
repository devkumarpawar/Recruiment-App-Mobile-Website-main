import io from 'socket.io-client'
//连接服务器, 得到与服务器连接对象
const socket = io('ws://localhost:4000')
//发送消息
socket.emit('sendMsg', {name: 'abc'})
console.log('Client sent msg to server', {name: 'abc'})
//接收服务器发送的消息
socket.on('receiveMsg', function(data) {
    console.log('Client received msg from server', data)
})