import React, { useEffect } from 'react'
import Question from './Question'
import Scores from './Scores'
import AnswerInput from './AnswerInput';
import Answers from './Answers';
import { useDispatch, useSelector } from 'react-redux';
import { roomActions } from '../store/roomSlice';
import Spinner from './Spinner';

function Game() {
    const roundNumber = useSelector(state => state.room.roundNumber)
    const activeUsers = useSelector(state => state.user.activeUsers)
    const roomData = useSelector(state => state.room.roomData)
    const user = useSelector(state => state.user.user)
    const socket = useSelector(state => state.user.socket)
    const dispatch = useDispatch()

    const startGame = () => {
        if(activeUsers.length < 3) {
            alert("Atleast three players required to start Game!")
            return;
        }

        const message = {
            room: user.room,
            text: "Starting The Game!",
            userName: "Game Room"
        }

        const round = (roundNumber + 1) % roomData.rounds

        socket.emit('sendMessage', message, () => alert("Error"));
        socket.emit('changeRound', { round, room: user.room }, () => alert("Error"))
        socket.emit('generateQuestion', user.room, () => alert("Error"));
    }

    useEffect(() => {
        socket.on('setRound', roundNumber => {
            dispatch(roomActions.setRoundNumber(roundNumber))
        })

        socket.on('leaderboards', leaderboards => {
            // dispatch(roomActions.setRoundNumber(roundNumber))
        })
    }, [roundNumber]);

    return (
        roundNumber === 0 ?
            <div className="flex flex-col justify-center items-center p-2 m-5 mt-0 h-full bg-white rounded-2xl min-h-screen md:min-h-0">
                {
                    roomData.host === user.name ?
                        <div className="flex flex-col justify-center items-center">
                            <button type="button" className="py-2 px-6 bg-[#FF5D5D] hover:bg-[#fa5050] text-white transition ease-in duration-200 text-center text-4xl font-semibold shadow-md focus:outline-none rounded-lg" onClick={startGame}>
                                Start game
                            </button>
                        </div>
                        :
                        <div className="flex flex-col justify-center items-center">
                            <Spinner />
                            Waiting for host to start Game!
                        </div>
                }
            </div>
            :
            <div className="flex flex-col p-2 m-5 mt-0 h-full bg-white rounded-2xl">
                <Scores />
                <Question />
                <Answers />
                <AnswerInput />
            </div>
    )
}

export default Game