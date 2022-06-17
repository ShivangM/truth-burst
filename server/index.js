const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
const connectToMongo = require("./db")

const router = require("./router")
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const Room = require('./models/RoomModel');

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"]
  }
});

app.use(cors());
app.use(router)
connectToMongo()

//Configure Enviournment Variables
require('dotenv').config()
const PORT = process.env.PORT || 5000

io.on('connection', (socket) => {

  socket.on('createRoom', async ({ host, code }, callback) => {
    try {
      const newRoom = new Room({host, code})
      await newRoom.save()
    } catch (error) {
      return callback("An Error has Occured");
    }
    callback();
  });

  socket.on('join', async ({ name, room }, callback) => {
    const { error } = await addUser({ id: socket.id, name, room });
    if (error) return callback("An Error has Occured");
    socket.join(room);

    socket.broadcast.to(room).emit('message', { userName: 'Game Room', text: `${name} joined the room!` });
    io.to(room).emit('roomData', { room: room, users: await getUsersInRoom(room) });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    let error = false;
    io.to(message.room).emit('message', message);
    if(error) callback();
  });

  socket.on('disconnect', () => {
    const user = getUser(socket.id);

    if(user) {
      removeUser(socket.id)
      io.to(user.room).emit('message', { user: 'Game Room', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })

});

server.listen(PORT, () => {
  console.log(`listening on PORT:${PORT}`);
});