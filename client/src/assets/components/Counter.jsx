import React from 'react'
import Tag from './Tag';

const Counter = ({ title, desc, solved, issued, shadow, border, tags }) => {

    const percentage = issued > 0 ? (solved / issued) * 100 : 0;
    const coverPercentage = 100 - percentage;
    return (
        <div>
            <div className={`flex flex-col md:flex-row mt-10 h-fit ${shadow} items-center w-full border ${border} shadow-md rounded-2xl p-4`}>
                <div className="flex flex-col gap-5 w-full md:w-1/2 ">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        {title}
                    </h2>
                    <p className="text-sm mt-1">
                        {desc}
                    </p>
                    {tags}
                 </div>

                <div className='w-full md:w-1/2 flex flex-col justify-around items-center'>
                    {/* Solved and Issued */}
                    <div className='mt-10 flex w-full justify-around'>
                        {/* Solved */}
                        <div className="w-1/2 items-center text-center">
                            <div className="flex flex-col text-5xl gap-5 font-bold text-green-600 leading-tight">
                                <span className='text-lg text-text'>Solved</span>
                                {solved}
                            </div>
                        </div>

                        {/* Issued */}
                        <div className="w-1/2 items-center text-center">
                            <div className="flex flex-col text-5xl gap-5 font-bold text-red-600 leading-tight">
                                <span className='text-lg text-text'>Issued</span>
                                {issued}
                            </div>
                        </div>
                    </div>

                    {/* Bar */}
                    <div className='w-3/4 mt-3 relative h-4 rounded-full overflow-hidden'>
                        {/* Gradient Background Bar */}
                        <div className='absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500'></div>

                        {/* Overlay Cover */}
                        <div
                            className='absolute top-0 right-0 h-full bg-gray-300 transition-all duration-500'
                            style={{ width: `${coverPercentage}%` }}
                        ></div>

                        {/* Optional Label */}
                        <p className='text-sm text-gray-600 mt-2'>
                            {Math.round(percentage)}% of issues resolved
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Counter
