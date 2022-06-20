import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { roomActions } from '../store/roomSlice';

function Question() {
    const roundNumber = useSelector(state => state.room.roundNumber)
    const questionStyle = 'bg-[#FFE3A9] h-fit w-[95%] mx-auto rounded-2xl p-4 md:my-2';
    const question = useSelector(state => state.room.question)
    const user = useSelector(state => state.user.user)
    const roomData = useSelector(state => state.room.roomData)
    const votes = useSelector(state => state.room.votes)
    const socket = useSelector(state => state.user.socket)

    const nextRound = async () => {
        const round = (roundNumber + 1) % roomData.rounds
        await socket.emit('changeRound', { round, room: user.room }, () => alert("Error"))
        await socket.emit('generateQuestion', user.room, () => alert("Error"));
    }

    return (
        <div className={questionStyle}>
            <div className="flex justify-between items-center flex-col md:flex-row">
                <div className="">
                    <div className="font-bold">Question No. {roundNumber}</div>
                    <p>{question}</p>
                </div>
                {
                    ((user.name === roomData.host) && (votes.length > 0)) ?
                        <button type="button" className="py-2 px-6 w-full md:w-fit my-4 md:my-0 bg-[#FF5D5D] hover:bg-[#fa5050] text-white transition ease-in duration-200 text-center text-base md:text-2xl font-semibold shadow-md focus:outline-none rounded-lg" onClick={nextRound}>
                            {roundNumber === roomData.rounds - 1 ? "Show Leaderboard" : "Next Round"}
                        </button>
                        : null
                }
            </div>
        </div>
    )
}

export default Question