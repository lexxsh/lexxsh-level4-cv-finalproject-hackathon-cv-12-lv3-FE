import React from 'react'
import Sidebar from '@/components/chatbot/sidebar'
import ShowPdf from '@/components/chatbot/show_pdf'
import ChatSection from '@/components/chatbot/chat_section'

const Upload = () => {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex justify-center md:justify-start">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col md:flex-row">
        <ShowPdf />
      </div>
      <div className="flex flex-1 flex-col md:flex-row">
        <ChatSection />
      </div>
    </div>
  )
}

export default Upload
