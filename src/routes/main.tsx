import React from 'react'
import Sidebar from '@/components/chatbot/sidebar'
import MainContent from '@/components/chatbot/main_content'
import ChatSection from '@/components/chatbot/chat_section'

const Main = () => {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* 왼쪽 사이드바 (가운데 정렬) */}
      <div className="flex justify-center md:justify-start">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col md:flex-row">
        {/* 메인 콘텐츠 영역 */}
        <MainContent />

        {/* 채팅창 영역 */}
        <ChatSection />
      </div>
    </div>
  )
}

export default Main
