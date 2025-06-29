import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col items-center bottom-0 p-5 border-t border-text z-50 gap-5'>
      <div className='w-full flex flex-col md:flex-row justify-between gap-5 md:gap-15'>
        <span className='w-full md:w-1/2'>JanSunwai AI is a voice-based civic reporting platform that lets citizens raise issues or suggestions or report emeregencies by simply receiving a phone call. Reports are shown live on a map and help authorities take quick, informed action all without sharing personal details.</span>
        <div className='w-full md:w-1/2'> 
          <span>Terms & Conditions:</span>
          <ul className='ml-5 list-disc w-full md:w-1/2'>
            <li>Your data is never stored.</li>
            <li>We do not collect your personal details.</li>
            <li>On emeregency we transfer call to government officials.</li>
          </ul>
        </div>
        
      </div>
      <p>Developed by team Hackers with help of Omnidimension.io</p>
    </div>
  )
}

export default Footer
