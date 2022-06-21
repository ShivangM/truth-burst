import React from 'react'
import { useSelector } from 'react-redux'
import { RiRadioButtonLine } from 'react-icons/ri'
import { FaCrown } from 'react-icons/fa'

function UserOnline() {
    const activeUsers = useSelector(state => state.user.activeUsers)
    const roomData = useSelector(state => state.room.roomData)

    return (
        <div className='h-full w-full bg-[#FFC3C3] rounded-2xl flex flex-col overflow-y-scroll'>
            <div className="flex flex-col justify-center items-center">
                <h1 className='text-2xl text-white font-medium text-center p-4'>Users In Room</h1>
                <div className="flex flex-wrap justify-center items-center pt-0 py-2 px-1 md:w-5/6">
                    {
                        activeUsers ?
                            activeUsers.map((value, index) => {
                                return (
                                    <div className="bg-[#FF5D5D] flex justify-center items-center p-2 m-1 rounded-xl text-white" key={index}>
                                        <RiRadioButtonLine className='text-white' />
                                        <p className='text-white px-2'>{value.name}</p>
                                        {value.name === roomData.host ? <FaCrown className='text-yellow-300' /> : null}
                                    </div>
                                )
                            })
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
}

export default UserOnline