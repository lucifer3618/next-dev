import ChatComponent from '@/components/custom/ChatComponent'
import Header from '@/components/custom/Header'
import IdeComponent from '@/components/custom/IdeComponent'
import React from 'react'

function Workspace() {
    return (
        <div>
            <Header />
            <div className='p-10 pt-0'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
                    <div className=''>
                        <ChatComponent />
                    </div>
                    <div className='hidden md:block col-span-3'>
                        <IdeComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workspace