import React from 'react'
import Sidenav from '../Sidenav'
import NotificationPage from './NotificationPage'
const Messages = () => {
  return (
    <div className='w-screen h-full flex'>
      <div className='w-[25%] h-full'>
        <Sidenav/>
      </div>
      <Notification/>
    </div>
  )
}

export default Messages
