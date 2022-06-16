import React from 'react'

function Question({question, number}) {
    const questionStyle = 'bg-[#FFE3A9] h-fit w-[95%] mx-auto rounded-2xl p-4 md:my-2';
    return (
        <div className={questionStyle}>
            <div className="font-bold">Question No. {number}</div>
            <p>{question}</p>
        </div>
    )
}

export default Question