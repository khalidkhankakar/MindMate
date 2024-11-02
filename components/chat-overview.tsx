import Image from 'next/image'
import React from 'react'

const ChatOverview = () => {
  return (
    <div className='flex-1 w-full flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold '>How can I assist you today?</h1>
      <p className='text-xl font-semibold text-gray-700'>Ask me about</p>
      <div className='flex flex-wrap items-center justify-center gap-3 mt-3'>
        <div className='p-5 bg-gray-50 border border-gray-200 h-28 w-28 rounded-lg flex items-center flex-col justify-center'>
          <Image src={'/brain.png'} width={100} height={100} alt='logo' className=''  />
          <p className={'text-lg'}>Ideas</p>
        </div>

        <div className='p-5 bg-gray-50 border border-gray-200 h-28 w-28 rounded-lg flex items-center flex-col justify-center'>
          <Image src={'/programming.png'} width={100} height={100} alt='logo' className=''  />
          <p className={'text-lg'}>Programming</p>
        </div>

        <div className='p-5 bg-gray-50 border border-gray-200 h-28 w-28 rounded-lg flex items-center flex-col justify-center'>
          <Image src={'/task.png'} width={100} height={100} alt='logo' className=''  />
          <p className={'text-lg'}>Tasks</p>
        </div>

        <div className='p-5 bg-gray-50 border border-gray-200 h-28 w-28 rounded-lg flex items-center flex-col justify-center'>
          <Image src={'/travel.png'} width={100} height={100} alt='logo' className=''  />
          <p className={'text-lg'}>Travel</p>
        </div>

      </div>
    </div>
  )
}

export default ChatOverview
