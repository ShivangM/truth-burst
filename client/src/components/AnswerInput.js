import React from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userSlice';

function AnswerInput() {

    const socket = useSelector(state => state.user.socket)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const sendAnswer = ()=>{
        const textField = document.getElementById("answer")
        const answer = {user, text: textField.value} 
        socket.emit('sendAnswer', answer, () => alert("Error"));
        dispatch(userActions.setDisabled(true))
    }

    const disabled = useSelector(state => state.user.disabled)

    return (
        disabled?
        <div className="h-1/6 p-4 w-full bottom-0 flex md:justify-between items-center">
            <input type="text" className=' px-5 py-3 w-[90%] rounded-2xl border-black border' placeholder='Enter Your Answer' disabled/>
            {/* <AiOutlineSend className="text-xl w-[10%] cursor-pointer" disabled/> */}
        </div>
        :
        <div className="h-1/6 p-4 w-full bottom-0 flex md:justify-between items-center">
            <input type="text" className=' px-5 py-3 w-[90%] rounded-2xl border-black border' placeholder='Enter Your Answer' id='answer'
                onKeyPress={event => event.key === 'Enter' ? sendAnswer() : null}
            />
            <AiOutlineSend className="text-xl w-[10%] cursor-pointer" onClick={sendAnswer}/>
        </div>
    )
}

export default AnswerInput