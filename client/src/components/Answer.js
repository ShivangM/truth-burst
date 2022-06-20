import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userSlice';
import ReactEmoji from 'react-emoji';

function Answer(props) {
    const user = useSelector(state => state.user.user)
    const answer = props.answer
    const currentUser = 'bg-[#FF5D5D] text-white rounded-2xl p-4 m-2 border-none';
    const otherUsers = 'bg-[#FFC3C3] rounded-2xl p-4 m-2 border-none cursor-pointer hover:bg-[#FF8C8C]';
    const otherUsersDiv = 'bg-[#FFC3C3] rounded-2xl p-4 m-2 border-none';
    const otherUsersAnswerDiv = 'bg-[#FFC3C3] rounded-2xl p-4 m-2 border-none text-center';
    const selectedClass = 'bg-green-400 rounded-2xl p-4 m-2 border-none text-center';
    const socket = useSelector(state => state.user.socket)
    const votes = useSelector(state => state.room.votes)
    const selected = useSelector(state => state.user.selected)
    const dispatch = useDispatch()

    const vote = (name) => {
        dispatch(userActions.setSelected(name))
        socket.emit('vote', { selected: name, voter: user.name, room: user.room }, (error) => {
            if (error) {
                alert(error);
            }
        })
    }

    const votesOnAnswer = votes.filter((value) => answer.name === value.selected)
    let voters = ""
    votesOnAnswer.forEach(element => {
        voters += element.voter + ", "
    });

    return (
        votes.length > 0 ?
            answer.name === user.name ?
                <div className={currentUser} key={props.key}>
                    <p><b className='font-semibold'>{answer.name}:</b> {ReactEmoji.emojify(answer.text)}</p>
                    <p><b className='font-semibold'>Vote Count:</b> {votesOnAnswer.length}</p>
                    <p><b className='font-semibold'>Voters:</b> {voters === "" ? "None" : voters}</p>
                </div>
                :
                <div className={otherUsersDiv} key={props.key}>
                    <p><b className='font-semibold'>{answer.name}:</b> {ReactEmoji.emojify(answer.text)}</p>
                    <p><b className='font-semibold'>Vote Count:</b> {votesOnAnswer.length}</p>
                    <p><b className='font-semibold'>Voters:</b> {voters === "" ? "None" : voters}</p>
                </div>
            :
            answer.name === user.name ?
                <button type='button' disabled className={currentUser} key={props.key}>
                    {ReactEmoji.emojify(answer.text)}
                </button>
                :
                selected === ""?
                    <button type='button' className={otherUsers} key={props.key} onClick={() => { vote(answer.name) }}>
                        {ReactEmoji.emojify(answer.text)}
                    </button>
                    :
                    selected === answer.name?
                    <div disabled className={selectedClass} key={props.key}>
                        {ReactEmoji.emojify(answer.text)}
                    </div>
                    :
                    <div disabled className={otherUsersAnswerDiv} key={props.key}>
                        {ReactEmoji.emojify(answer.text)}
                    </div>
    )
}

export default Answer