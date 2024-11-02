import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import {  MessageSquareDiff, PanelRightClose } from 'lucide-react'
import React from 'react'
import { ChatHistorySlider } from './chat-history-slider'
import Image from 'next/image'
import Link from 'next/link'
import { SelectModels } from './select-models'
import { cookies } from "next/headers"
import { DEFAULT_MODEL_ID } from '@/lib/utils'

const Navbar = async () => {

    const cookieStore = await cookies()

    let modelId = cookieStore.get('model')?.value || DEFAULT_MODEL_ID

    return (
        <header className='w-full bg-white shadow-sm py-4 px-5'>
            <nav className='flex items-center justify-between'>
                <div className='flex items-center gap-x-3'>
                <ChatHistorySlider />
                <Link href={'/'} ><MessageSquareDiff size={40} className="text-gray-500 hover:bg-gray-200 p-2 rounded-md cursor-pointer" /></Link> 
                <Link href={'/'} ><Image src={'/logo.png'} width={100} height={100}  alt='logo' /></Link> 
                </div>
                <div className='flex items-center gap-x-3'>
                    <SelectModels modelId={modelId} />
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
