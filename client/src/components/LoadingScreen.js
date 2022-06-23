import React from 'react'
import loader from "../assets/loader.gif"

function LoadingScreen() {
  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center bg-[#FF5D5D]'>
        {/* <div className="dot-pulse"></div>
        <h1 className='font-semibold text-white pt-4 md:p-4 md:m-4 text-2xl'>Truth Burst</h1> */}
        <img src={loader} alt="loader" />
    </div>
  )
}

export default LoadingScreen