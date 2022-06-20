const User = require("../models/UserModel");

const addUser = async ({ id, name, room }) => {
  if(!name || !room) return { error: 'Username and room are required.' };
  username = name.trim()
  userroom = room.trim().toLowerCase();

  const existingUser = await User.findOne({$and: [{name: username}, {room: userroom}]}).exec()
  if(existingUser !== null) return { error: 'A user with this Nick Name is already joined!' };

  const user = new User({ socketID: id, name:username, room:userroom });
  await user.save();
  return false
}

const removeUser = async (id) => {
  return await User.findOneAndDelete({socketID: id}).exec()
}

const getUser = async (id) => {
  return await User.findOne({socketID: id}).exec()
}

const getUsersInRoom = async (userRoom) => await User.find({room: userRoom}).exec()

module.exports = { addUser, removeUser, getUser, getUsersInRoom };