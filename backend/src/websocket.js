const socketio=require('socket.io')

exports.setupWebsocket=(server)=>{
    const io=socketio(server)

    io.on('connection', socker=>{
        console.log(socker.id)
    })
}