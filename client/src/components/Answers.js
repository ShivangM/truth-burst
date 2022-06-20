import React from 'react'
import { useSelector } from 'react-redux'
import Answer from './Answer'
import Spinner from './Spinner'

function Answers() {
  let answers = useSelector(state => state.room.answers)

  return (
    answers.length > 0?
    <div className='h-full p-4 overflow-y-sroll flex flex-col '>
      {
        answers.map((value, index)=>{
          return <Answer answer={value} key={index}/>
        })
      }
    </div>
    :
    <div className='h-full p-4 flex flex-col justify-center items-center'>
      <Spinner />
      Waiting For Everyone Answer
    </div>
  )
}

export default Answers