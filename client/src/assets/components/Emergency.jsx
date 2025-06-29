import React from 'react'

const Emergency = ({reported, shadow, tags}) => {
    return (
        <div>
            <div className={`flex flex-col md:flex-row mt-10 h-fit ${shadow} items-center w-full border border-blue-500 shadow-md rounded-2xl p-4`}>
                <div className="flex flex-col gap-5 w-full md:w-1/2 ">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        🚨 Emergency Response Overview

                    </h2>
                    <p className="text-sm mt-1">
                        This section provides a clear overview of the emergency incidents reported by users. It helps track which cases have been addressed or are pending action, making it easier to assess urgency, allocate resources efficiently, and support timely response efforts.
                    </p>
                    {tags}
                 </div>

                <div className='w-full md:w-1/2 flex flex-col justify-around items-center'>
                    {/* Solved and Issued */}
                    <div className='mt-10 flex w-full justify-around'>

                        {/* Issued */}
                        <div className="w-1/2 items-center text-center">
                            <div className="flex flex-col text-5xl gap-5 font-bold text-red-600 leading-tight">
                                <span className='text-lg text-text'>Reported</span>
                                {reported}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Emergency
