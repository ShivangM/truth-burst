import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userSlice';
import { useNavigate } from 'react-router-dom'
import { roomActions } from '../store/roomSlice';

function CreateRoom() {

    const socket = useSelector(state => state.user.socket)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const createRoom = async () => {
        const name = document.getElementById("name").value
        const rounds = parseInt(document.getElementById("rounds").value) + 1

        if (!name) { alert("Please Enter Your Name!"); return }
        if (!rounds) { alert("Please Enter Number Of Rounds!"); return }
        if (rounds < 1 || rounds > 10) { alert("Rounds must be in 1-10"); return }

        dispatch(roomActions.setLoading(true))

        await socket.emit('createRoom', { host: name, rounds: rounds }, ({ error, user, roomData, users }) => {
            if (error) {
                dispatch(roomActions.setLoading(false))
                alert(error);
            }
            else {
                dispatch(userActions.setActiveUser(users))
                dispatch(userActions.setUser(user))
                dispatch(roomActions.setRoomData(roomData))
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
                <input type="text" id="name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full my-4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#FF5D5D] focus:border-transparent" placeholder="Your Name" />
                <input type="number" min={"1"} max={"10"} id="rounds" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full my-4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#FF5D5D] focus:border-transparent" placeholder="Number Of Rounds" />
            </div>
            <button type="button" className="py-1 px-4 w-full bg-[#FF5D5D] hover:bg-[#fa5050] text-white transition ease-in duration-200 text-center text-xl md:text-4xl font-semibold shadow-md focus:outline-none rounded-lg" onClick={createRoom}>
                CREATE ROOM
            </button>
        </div>
    )
}

export default CreateRoom