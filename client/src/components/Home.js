import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { userActions } from '../store/userSlice';
import { useNavigate } from 'react-router-dom'
import { roomActions } from '../store/roomSlice';
const { io } = require("socket.io-client");
const ENDPOINT = "https://truth-burst.herokuapp.com/"

function Home() {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const generateRoomCode = () => {
    var string = 'abcdefghijklmnopqrstuvwxyz';
    let room = '';

    // Find the length of string
    var len = string.length;
    for (let i = 1; i <= 9; i++) {
      room += string[Math.floor(Math.random() * len)];
      if (i % 3 === 0 && i < 9) room += "-"
    }
    return room;
  }

  useEffect(() => {
    const getSocket = async () => {
      if (socket === null) {
        const socketTmp = await io(ENDPOINT)
        setSocket(socketTmp)
        dispatch(userActions.setSocket(socketTmp))
      }
    }
    getSocket()
  }, [socket]);

  const createRoom = async () => {
    const name = document.getElementById("name").value
    if (!name) { alert("Please Enter Your Name!"); return }
    const rounds = parseInt(document.getElementById("rounds").value)
    if (!rounds) { alert("Please Enter Number Of Rounds!"); return }
    if (rounds < 1 || rounds > 10) { alert("Rounds must be in 1-10"); return }
    
    dispatch(roomActions.setLoading(true))
    const room = generateRoomCode();
    dispatch(userActions.setUser({ name: name, room: room, id: socket.id }))

    await socket.emit('createRoom', { host: name, code: room, rounds: rounds }, (error) => {
      if (error) {
        navigate("/")
        alert(error);
      }
      else {
        dispatch(roomActions.setLoading(false))
      }
    });
    navigate(`/room/${room}`)
  }

  const joinRoom = async () => {
    const name = document.getElementById("nick-name").value
    const room = document.getElementById("room-code").value
    if (!name || !room) { alert("Please Enter Valid Values!"); return }

    dispatch(roomActions.setLoading(true))
    dispatch(userActions.setUser({ name: name, room: room, id: socket.id }))

    await socket.emit('join', { name: name, room: room }, (error) => {
      if (error) {
        navigate("/")
        alert(error);
      }
      else {
        dispatch(roomActions.setLoading(false))
      }
    });

    navigate(`/room/${room}`)
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full min-h-screen">

      <div className='md:py-10'>
        <h1 className='text-6xl md:text-7xl text-center font-sans font-medium'>Truth Burst</h1>
        <h1 className='text-2xl text-center font-serif pt-4'>Play Online with Friends</h1>
      </div>

      <div className="flex flex-col justify-around md:flex-row md:w-1/2">
        <div className="flex justify-center items-center flex-col bg-[#FF8C8C] my-4 p-4 rounded-xl md:my-0">
          <div className=" relative w-72">
            <input type="text" id="name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full my-4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#FF5D5D] focus:border-transparent" placeholder="Your Name" />
            <input type="number" min={"1"} max={"10"} id="rounds" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full my-4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#FF5D5D] focus:border-transparent" placeholder="Number Of Rounds" />
          </div>

          <button type="button" className="py-1 px-4 w-full bg-[#FF5D5D] hover:bg-[#fa5050] text-white transition ease-in duration-200 text-center text-4xl font-semibold shadow-md focus:outline-none rounded-lg" onClick={createRoom}>
            CREATE ROOM
          </button>
        </div>

        <div className="flex justify-center items-center flex-col bg-[#FF8C8C] my-4 p-4 rounded-xl md:my-0">
          <div className=" relative w-72">
            <input type="text" id="nick-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full my-4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#FF5D5D] focus:border-transparent" placeholder="Nick Name" />
            <input type="text" id="room-code" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full my-4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#FF5D5D] focus:border-transparent" placeholder="Room Code" />
          </div>

          <button type="button" className="py-1 px-4 w-full  bg-[#FF5D5D] hover:bg-[#fa5050] text-white transition ease-in duration-200 text-center text-4xl font-semibold shadow-md focus:outline-none rounded-lg" onClick={joinRoom}>
            JOIN ROOM
          </button>
        </div>

      </div>
    </div>
  )
}

export default Home