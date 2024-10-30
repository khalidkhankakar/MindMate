import Navbar from '@/components/navbar'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className='h-screen' >
            <Navbar />
            <main>
                {children}
            </main>
        </section>
    )
}

export default RootLayout
