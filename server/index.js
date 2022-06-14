const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Configure Enviournment Variables
require('dotenv').config()
const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(PORT, () => {
  console.log(`listening on PORT:${PORT}`);
});