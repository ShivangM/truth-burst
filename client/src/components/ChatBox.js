import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chat from './Chat'
import { AiOutlineSend } from 'react-icons/ai';
import { messageActions } from '../store/messageSlice';

function ChatBox() {
  const messages = useSelector(state => state.messages.messages)
  const user = useSelector(state => state.user.user)
  const socket = useSelector(state => state.user.socket)

  const sendMessage = ()=>{
    const text = document.getElementById("message").value
    const message = {
      room: user.room,
      text: text,
      userName: user.name
    }

    socket.emit('sendMessage', message, () => alert("Error"));
    document.getElementById("message").value = ""
  }

  return (
    <div className='h-full w-full p-2 bg-[#FFC3C3] rounded-2xl flex flex-col'>
      <div className="h-5/6 overflow-y-scroll">
        {
          messages ?
            messages.map((value, index) => {
              return (
                <Chat message={value} key={index} />
              )
            }) :
            null
        }
      </div>
      <div className="h-1/6 p-2 w-full flex justify-between items-center">
        <input type="text" className='w-5/6 px-5 py-3 rounded-2xl' placeholder='Enter Your Message' id='message'/>
        <AiOutlineSend onClick={sendMessage} className="w-1/6 text-xl cursor-pointer"/>
      </div>
    </div>
  )
}

export default ChatBox