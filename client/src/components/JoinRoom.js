import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userSlice';
import { useNavigate } from 'react-router-dom'
import { roomActions } from '../store/roomSlice';

function JoinRoom() {

    const socket = useSelector(state => state.user.socket)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const joinRoom = async () => {
        const name = document.getElementById("nick-name").value
        const room = document.getElementById("room-code").value
        if (!name || !room) { alert("Please Enter Valid Values!"); return }

        dispatch(roomActions.setLoading(true))

        await socket.emit('join', { name: name, room: room }, ({ error, user, roomData, users }) => {
            if (error) {
                dispatch(roomActions.setLoading(false))
                alert(error);
            }
            else {
                dispatch(userActions.setUser(user))
                dispatch(roomActions.setRoomData(roomData))
                dispatch(userActions.setActiveUser(users))
                setTimeout(() => {
                    dispatch(roomActions.setLoading(false))
                    navigate('/room')
                }, 2500);
            }
        });
    }

    return (
        <div className="flex justify-center items-center flex-col bg-[#FF8C8C] m-3 xl:m-5 p-4 rounded-xl md:my-0">
            <div className=" relative w-60 md:w-72">
                <input type="text" id="nick-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full my-4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#FF5D5D] focus:border-transparent" placeholder="Nick Name" />
                <input type="text" id="room-code" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full my-4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#FF5D5D] focus:border-transparent" placeholder="Room Code" />
            </div>
            <button type="button" className="py-1 px-4 w-full  bg-[#FF5D5D] hover:bg-[#fa5050] text-white transition ease-in duration-200 text-center text-xl md:text-4xl font-semibold shadow-md focus:outline-none rounded-lg" onClick={joinRoom}>
                JOIN ROOM
            </button>
        </div>
    )
}

export default JoinRoom