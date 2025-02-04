import React from 'react'
import Card from '@/components/Card_box/card'
import Sidebar from '@/components/chatbot/sidebar'
import Header from '@/components/chatbot/chatbot_header'

const Audio = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F9] md:flex-row">
      {/* Sidebar */}
      <div className="flex justify-center md:justify-start">
        <Sidebar />
      </div>

      {/* Content 영역 */}
      <div className="flex flex-1 flex-col">
        {/* Header를 카드 위로 배치 */}
        <Header title="오디오북" />

        {/* 카드 컨테이너 */}
        <div className="mt-4 flex flex-wrap justify-center gap-8 overflow-auto p-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

export default Audio
