import React from 'react'

function LoadingScreen() {
  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center bg-[#FF5D5D]'>
        <div className="dot-pulse"></div>
        <h1 className='font-semibold text-white pt-4 md:p-4 md:m-4 text-2xl'>Truth Burst</h1>
    </div>
  )
}

export default LoadingScreen