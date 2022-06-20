import React from 'react'
import { useSelector } from 'react-redux'

function Leaderboards() {
    const leaderboards = useSelector(state => state.room.leaderboards)

    return (
        <div className='w-full md:w-5/6 flex item-center flex-col'>
            <h1 className='text-2xl font-semibold p-4 text-center'>Leaderboards</h1>

            <table className="max-h-[70vh] overflow-y-scroll">
                <thead className="text-base uppercase dark:bg-[#FF5D5D] dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Position
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Score
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        leaderboards.map((value, index) => {
                            return (
                                <tr className="odd:bg-white even:bg-gray-50 text-center odd:dark:bg-[#FFC3C3] even:dark:bg-[#FF8C8C]">
                                    <th scope="row" className="px-6 py-4 font-normal whitespace-nowrap">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {value.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {value.score}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboards