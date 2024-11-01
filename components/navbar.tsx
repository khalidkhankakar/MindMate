import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import {  MessageSquareDiff, PanelRightClose } from 'lucide-react'
import React from 'react'
import { ChatHistorySlider } from './chat-history-slider'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <header className='w-full bg-white shadow-sm py-4 px-5'>
            <nav className='flex items-center justify-between'>
                <div className='flex items-center gap-x-3'>
                <ChatHistorySlider /> <MessageSquareDiff size={40} className="text-gray-500 hover:bg-gray-200 p-2 rounded-md cursor-pointer" />  <Link href={'/'} ><Image src={'/logo.png'} width={100} height={100}  alt='logo' /></Link> 
                </div>
                <div>
                    <SignedIn>
                        {/* Mount the UserButton component */}
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        {/* Signed out users get sign in button */}
                        <SignInButton />
                    </SignedOut>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
