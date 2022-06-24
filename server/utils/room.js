const Room = require("../models/RoomModel")
const Round = require("../models/RoundModel")
const Vote = require("../models/VoteModel")
const { getUsersInRoom } = require("./users")

const getRoomData = async (roomCode, name)=>{
    const room = await Room.findOne({code: roomCode}).exec()
    if(name === room.host){
        const activeUsers = await getUsersInRoom(roomCode)
        if (activeUsers.length > 0) {
            await Room.findByIdAndUpdate(room._id, {host: activeUsers[0].name}).exec()
        }
        else{
            await Room.findByIdAndDelete(room._id)
            await Vote.deleteMany({room: roomCode}).exec()
            await Round.findOneAndDelete({room: roomCode})
        }
        
    }
    
    return await Room.findOne({code: roomCode}).exec()
}

module.exports = {getRoomData}