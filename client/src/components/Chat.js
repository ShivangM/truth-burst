import React from 'react'
import { useSelector } from 'react-redux';

function Chat(props) {
    const user = useSelector(state => state.user.user)
    const message = props.message
    
    const currentUser = 'bg-[#FF8C8C] text-white rounded-2xl p-4 m-2';
    const otherUsers = 'bg-[#ffffff] rounded-2xl p-4 m-2';

    return (
        message.userName === user.name ?
            <div className={currentUser}>
                <div className="font-medium">{message.userName}</div>
                <p>{message.text}</p>
            </div>
            :
            <div className={otherUsers}>
                <div className="font-medium">{message.userName}</div>
                <p>{message.text}</p>
            </div>
    )
}

export default Chat