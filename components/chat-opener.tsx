import { Trash } from 'lucide-react'
import React from 'react'

interface ChatOpenerProps { 
    chatTitle: string
}

const ChatOpener = ({chatTitle}: ChatOpenerProps) => {
  return (
    <div className="rounded-md w-full px-2 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center  ">
    <p className="text-gray-800 text-[1rem] flex-1 ">This is the chat history</p>
    <Trash size={16} className="text-red-500" />
</div>
  )
}

export default ChatOpener
