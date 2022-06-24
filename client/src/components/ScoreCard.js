import React from 'react'
import { useSelector } from 'react-redux'

function ScoreCard(props) {
    const roomData = useSelector(state => state.room.roomData)
    return (
        <div className="max-w-sm bg-[#FF8C8C] h-full rounded-lg border border-gray-200 shadow-md">
            <div className="flex flex-col items-center py-2 md:py-4 lg:py-6">
                {/* <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" /> */}
                <h5 className="mb-1 text-center text-base md:text-lg font-medium dark:text-white">{props.name}</h5>
                {!roomData.anonymousMode? <span className="text-sm text-white"><b className='font-semibold'>Score:</b> {props.score}</span> : null}
            </div>
        </div>

    )
}

export default ScoreCard