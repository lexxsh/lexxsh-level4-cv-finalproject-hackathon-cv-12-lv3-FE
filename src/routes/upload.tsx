import React from 'react'
import Sidebar from '@/components/chatbot/sidebar'
import MainContent from '@/components/chatbot/main_content'

const Upload = () => {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex justify-center md:justify-start">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col md:flex-row">
        <MainContent />
      </div>
    </div>
  )
}

export default Upload
