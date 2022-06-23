import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatBox from './ChatBox';
import UserOnline from './UserOnline';
import { TbClipboardText } from 'react-icons/tb'
import { ImClipboard } from 'react-icons/im'
import Game from './Game';
import { userActions } from '../store/userSlice';
import { messageActions } from '../store/messageSlice';
import { roomActions } from '../store/roomSlice';

function Room() {
  const user = useSelector(state => state.user.user)
  const socket = useSelector(state => state.user.socket)
  const room = user.room
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (room === "") navigate("/")
  }, [room, navigate]);


  useEffect(() => {
    if (socket) {
      socket.on('message', message => {
        dispatch(messageActions.setMessage(message))
      });

      socket.on('roomData', roomData => {
        dispatch(roomActions.setRoomData(roomData))
      });

      socket.on('users', users => {
        dispatch(userActions.setActiveUser(users))
      });

      socket.on('question', question => {
        dispatch(roomActions.setQuestion(question))
      });

      socket.on('answers', answers => {
        dispatch(roomActions.setAnswers(answers))
      });

      socket.on('votes', votes => {
        dispatch(roomActions.setVotes(votes))
      });

      socket.on('clearData', users => {
        dispatch(roomActions.setAnswers([]))
        dispatch(roomActions.setVotes([]))
        dispatch(userActions.setActiveUser(users))
        dispatch(userActions.setSelected(""))
        dispatch(userActions.setDisabled(false))
        document.getElementById("answer").value = ""
      });

      socket.on("disconnect", () => {
        navigate("/")
        alert("You were disconnected!")
      });
    }
  });

  const [copied, setCopied] = useState(false);

  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(room)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className="flex flex-col w-full md:w-3/4 md:h-screen min-h-screen">
        <div className="flex flex-col md:flex-row justify-between m-5 h-fit items-center bg-[#FF8C8C] rounded-2xl">
          <a href='/' className='font-semibold text-white pt-4 md:p-4 md:m-4 text-2xl'>Truth Burst</a>
          <div className="bg-white rounded-xl w-3/4 md:w-fit h-fit p-4 m-4 flex items-center justify-around">
            <p className='whitespace-nowrap px-2'>Room Code: <b className='font-semibold'>{room}</b></p>
            {!copied ?
              <TbClipboardText className='text-xl cursor-pointer' onClick={copyRoomCode} />
              : <ImClipboard />
            }
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