// const users = [];

const User = require("./models/UserModel");

const addUser = async ({ id, name, room }) => {
  if(!name || !room) return { error: 'Username and room are required.' };
  username = name.trim()
  userroom = room.trim().toLowerCase();

  // const existingUser = users.find((user) => user.room === room && user.name === name);
  const existingUser = await User.find({name: username, room: userroom}).exec()
  if(existingUser.length > 0) return true;

  const user = new User({ socketID: id, name:username, room:userroom });
  await user.save();
  return false
}

const removeUser = async (id) => {await User.findOneAndDelete({socketId: id})}

const getUser = async (id) => await User.findOne({socketId: id});

const getUsersInRoom = async (userRoom) => await User.find({room: userRoom}).exec()

module.exports = { addUser, removeUser, getUser, getUsersInRoom };