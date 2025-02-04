import React from 'react'
import Card from '@/components/Card_box/card'
import Sidebar from '@/components/chatbot/sidebar'
import Header from '@/components/chatbot/chatbot_header'

const Detail = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F9] md:flex-row">
      {/* Sidebar */}
      <div className="flex justify-center md:justify-start">
        <Sidebar />
      </div>

      {/* Content 영역 */}
      <div className="flex flex-1 flex-col"></div>
    </div>
  )
}

export default Detail
