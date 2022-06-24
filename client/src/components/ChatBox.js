import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Chat from './Chat'
import { AiOutlineSend } from 'react-icons/ai';
import ScrollToBottom from 'react-scroll-to-bottom';
import { messageActions } from '../store/messageSlice';

function ChatBox() {
  const messages = useSelector(state => state.messages.messages)
  const user = useSelector(state => state.user.user)
  const socket = useSelector(state => state.user.socket)
  const dispatch = useDispatch()

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

  useEffect(() => {
    if (socket) {
      socket.on('message', message => {
        dispatch(messageActions.setMessages(message))
      });
    }
  }, [])

  return (
    <div className='h-full w-full p-2 bg-[#FFC3C3] rounded-2xl flex flex-col'>
      <ScrollToBottom className="h-5/6">
        {
          messages ?
            messages.map((value, index) => {
              return (
                <Chat message={value} key={index} />
              )
            }) :
            null
        }
      </ScrollToBottom>
      <div className="h-1/6 p-2 w-full flex justify-between items-center">
        <input type="text" className='w-5/6 px-5 py-3 rounded-2xl' placeholder='Enter Your Message' id='message' 
        onKeyPress={event => event.key === 'Enter' ? sendMessage() : null}/>
        <AiOutlineSend onClick={sendMessage} className="w-1/6 text-xl cursor-pointer"/>
      </div>
    </div>
  )
}

export default ChatBox