const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
const connectToMongo = require("./db")

const router = require("./utils/router")
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');
const Room = require('./models/RoomModel');
const { getRoomData } = require('./utils/room');
const Question = require('./models/QuestionModel');
const Answer = require('./models/AnswerModel');
const Vote = require('./models/VoteModel');
const User = require('./models/UserModel');

const io = new Server(server, {
  cors: {
    origin: ["https://truth-burst.netlify.app"],
    // origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(router)
connectToMongo()

//Configure Enviournment Variables
require('dotenv').config()
const PORT = process.env.PORT || 5000
const NAME_REPLACER = process.env.NAME_REPLACER

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

io.on('connection', (socket) => {

  socket.on('createRoom', async ({ host, code, rounds }, callback) => {
    try {
      const newRoom = new Room({ host, code, rounds })
      await newRoom.save()

      const { error } = await addUser({ id: socket.id, name: host, room: code });
      if (error) return callback(error);
      await socket.join(code);

      const roomData = await getRoomData(code, host)
      const users = await getUsersInRoom(code)

      io.to(code).emit('roomData', roomData);
      io.to(code).emit('users', users);

    } catch (error) {
      return callback("An Error has Occured");
    }
    callback();
  });

  socket.on('join', async ({ name, room }, callback) => {
    const existingRoom = await Room.findOne({ code: room }).exec()
    if (!existingRoom) return callback("Please join with valid room code")
    const { error } = await addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    await socket.join(room);
    socket.broadcast.to(room).emit('message', { userName: 'Game Room', text: `${name} joined the room!` });

    const roomData = await getRoomData(room, name)
    const users = await getUsersInRoom(room)

    io.to(room).emit('roomData', roomData);
    io.to(room).emit('users', users);

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    let error = false;
    io.to(message.room).emit('message', message);
    if (error) callback();
  });

  socket.on('sendAnswer', async (answer, callback) => {
    const { user, text } = answer
    const ans = new Answer({
      text: text,
      name: user.name,
      room: user.room,
    })

    try {
      await ans.save()
    } catch (error) {
      callback()
    }

    const currUsers = await getUsersInRoom(user.room)
    const currAnswers = await Answer.find({ room: user.room })

    currUsers.length === currAnswers.length ?
      io.to(user.room).emit('answers', shuffle(currAnswers)) : null
  });

  socket.on('changeRound', async ({ round, room }, callback) => {
    let error = false;
    if (round === 0) {
      const currUsers = await getUsersInRoom(room)
      io.to(room).emit('leaderboards', currUsers)
      io.to(room).emit('setRound', round)
      await User.updateMany({ score: 0 }).exec()
    }
    else {
      await Answer.deleteMany({ room: room }).exec()
      await Vote.deleteMany({ room: room }).exec()
      io.to(room).emit('setRound', round)
      socket.broadcast.to(room).emit('message', { userName: 'Game Room', text: `Starting Round ${round}` });
      const currUsers = await getUsersInRoom(room)
      io.to(room).emit('clearData', currUsers)
    }
    if (error) callback();
  });

  socket.on('vote', async ({ selected, voter, room }, callback) => {
    const vote = new Vote({
      selected: selected,
      voter: voter,
      room: room
    })

    try {
      await vote.save()
    } catch (error) {
      callback();
    }

    await User.findOneAndUpdate({ name: selected }, { $inc: { score: 100 } })

    const currUsers = await getUsersInRoom(room)
    const currVotes = await Vote.find({ room: room })
    currUsers.length === currVotes.length ?
      io.to(room).emit('votes', currVotes) : null
  });

  socket.on('generateQuestion', async (room, callback) => {
    let error = false;
    const questions = await Question.find()
    let randomQuestion = questions[Math.floor(Math.random() * questions.length)].question
    const users = await getUsersInRoom(room)
    const randomUser = users[Math.floor(Math.random() * users.length)].name

    randomQuestion = randomQuestion.replaceAll(NAME_REPLACER, randomUser)

    io.to(room).emit('question', randomQuestion);

    if (error) callback();
  });

  socket.on('disconnect', async () => {
    const user = await getUser(socket.id);
    if (user) {
      removeUser(socket.id)
      io.to(user.room).emit('message', { user: 'Game Room', text: `${user.name} has left.` });
      const roomData = await getRoomData(user.room, user.name)
      const users = await getUsersInRoom(user.room)

      io.to(user.room).emit('roomData', roomData);
      io.to(user.room).emit('users', users);

      try {
        await Answer.findOneAndDelete({ $and: [{ name: user.name }, { room: user.room }] }).exec()
      } catch (error) {

      }
    }
  })

});

server.listen(PORT, () => {
  console.log(`listening on PORT:${PORT}`);
});