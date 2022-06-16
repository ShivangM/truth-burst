import React from 'react'
import Question from './Question'
import Scores from './Scores'

function Game() {
    return (
        <div className="flex flex-col p-2 m-5 mt-0 h-full bg-white rounded-2xl">
            <Scores/>
            <Question question={"Whats your name"} number={1}/>
        </div>
    )
}

export default Game