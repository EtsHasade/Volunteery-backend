module.exports = connectSockets

var sockets = [];

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg => {
            console.log(msg)
                // io.emit('chat addMsg', msg)
                // emits only to sockets in the same room
                // sockets.forEach(item => {
                //     if (item.topic === socket.myTopic) {
                //         item.msgs.push(msg)
                //     }
                // })
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('chat topic', topic => {
                if (socket.myTopic) {
                    socket.leave(socket.myTopic)
                }
                socket.join(topic)
                socket.myTopic = topic;
                // const item = sockets.find(item => item.topic === topic)
                // if (item) {
                //     item.msgs.forEach(msg => io.to(socket.myTopic).emit('chat addMsg', msg))
                // } else sockets.push({ topic: topic, msgs: [] })
            })
            // socket.on('msg history', () => {
            //     msgs.forEach(msg => {
            //         io.to(socket.myTopic).emit('chat addMsg', msg)
            //     })
            // })

    })
}