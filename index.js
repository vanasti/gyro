const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

const users = {};

app.use(express.static('public'))
server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

io.on('connection', socket => {
    console.log('Connection:', socket.id);
    users[socket.id] = {
        id: socket.id,
    };

    socket.on('gyroUpdate', (targetSocketId, data) => {
        console.log(data);
        socket.to(targetSocketId).emit('gyroUpdate', data);
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id}: Disconnected`);
        delete users[socket.id];
    });
})