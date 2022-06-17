import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatBox from './ChatBox';
import UserOnline from './UserOnline';
import { TbClipboardText } from 'react-icons/tb'
import Game from './Game';
import { userActions } from '../store/userSlice';
import { messageActions } from '../store/messageSlice';

function Room() {
  const user = useSelector(state => state.user.user)
  const socket = useSelector(state => state.user.socket)
  const { name, room, id } = user
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (room === "") navigate("/")
  }, [room]);

  useEffect(() => {
    if(socket){

      socket.on('message', message => {
        dispatch(messageActions.setMessage(message))
      });
      
      socket.on("roomData", ({ users }) => {
        dispatch(userActions.setActiveUser(users))
      });
    }
  }, []);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(room)
    // alert(`Copied to Clipboard`)
  }

  return (
    <div className='flex flex-col md:flex-row'>

      <div className="flex flex-col w-full md:w-3/4 h-screen">
        <div className="flex flex-col md:flex-row justify-between m-5 h-fit items-center bg-[#FF5D5D] rounded-2xl">
          <h1 className='font-semibold text-white pt-4 md:p-4 md:m-4 text-2xl'>Truth Burst</h1>
          <div className="bg-white rounded-xl w-3/4 md:w-fit md:h-fit p-4 m-4 flex items-center justify-around">
            <p className='whitespace-nowrap px-2'>Room Code: <b className='font-semibold'>{room}</b></p>
            <TbClipboardText className='text-xl cursor-pointer' onClick={copyRoomCode} />
          </div>
        </div>
        <Game />
      </div>

      <div className="h-screen w-full md:w-1/4">
        <div className="h-1/3 md:h-1/4 p-5 pb-0">
          <UserOnline />
        </div>
        <div className="h-2/3 md:h-3/4 p-5">
          <ChatBox />
        </div>
      </div>
    </div>
  )
}

export default Room