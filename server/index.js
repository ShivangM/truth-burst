const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');

const router = require("./router")
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"]
  }
});

app.use(cors());
app.use(router)

//Configure Enviournment Variables
require('dotenv').config()
const PORT = process.env.PORT


io.on('connection', (socket) => {
  socket.on('join', ({ name, room, role }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, role });

    if (error) return callback(error);
    socket.join(user.room);
    socket.broadcast.to(user.room).emit('message', { userName: 'Game Room', text: `${user.name} joined the room!` });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    let error = false;
    io.to(message.room).emit('message', message);
    if(error) callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Game Room', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })

});

server.listen(PORT, () => {
  console.log(`listening on PORT:${PORT}`);
});