const Room = require("../models/RoomModel")
const { getUsersInRoom } = require("./users")

const getRoomData = async (roomCode, name)=>{
    const room = await Room.findOne({code: roomCode}).exec()
    if(name === room.host){
        const activeUsers = await getUsersInRoom(roomCode)
        activeUsers.length > 0?
        await Room.findByIdAndUpdate(room._id, {host: activeUsers[0].name})
        :
        await Room.findByIdAndDelete(room._id)
    }
    
    return await Room.findOne({code: roomCode}).exec()
}

module.exports = {getRoomData}