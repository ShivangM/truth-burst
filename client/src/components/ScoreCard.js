import React from 'react'

function ScoreCard() {
    return (

        <div className="max-w-sm bg-[#FF8C8C] rounded-lg border border-gray-200 shadow-md">
            <div className="flex flex-col items-center py-2 md:py-10">
                {/* <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" /> */}
                <h5 className="mb-1 text-center text-base md:text-lg font-medium dark:text-white">Bonnie Green</h5>
                <span className="text-sm text-white">Socre: 500</span>
            </div>
        </div>

    )
}

export default ScoreCard