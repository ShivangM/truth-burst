import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { messageActions } from '../store/messageSlice';
import { userActions } from '../store/userSlice';
import ChatBox from './ChatBox';
import UserOnline from './UserOnline';
import {TbClipboardText} from 'react-icons/tb'

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
    socket.on('message', message => {
      dispatch(messageActions.setMessage(message))
    });

    socket.on("roomData", ({ users }) => {
      console.log(users)
      dispatch(userActions.setActiveUser(users))
    });
  }, []);

  const copyRoomCode = ()=>{
    navigator.clipboard.writeText(room)
    alert(`Copied to Clipboard`)
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className="bg-white rounded-xl w-full md:w-1/6 md:h-fit p-4 m-4 flex items-center justify-around">
        <p className='whitespace-nowrap'>Room Code: <b className='font-semibold'>{room}</b></p>
        <TbClipboardText className='text-xl cursor-pointer' onClick={copyRoomCode}/>
      </div>

      <div className="md:w-3/4"></div>
      <div className="h-screen w-full md:w-1/4">
        <div className="h-1/4 p-5 pb-0">
          <UserOnline/>
        </div>
        <div className="h-3/4 p-5">
          <ChatBox/>
        </div>
      </div>
    </div>
  )
}

export default Room