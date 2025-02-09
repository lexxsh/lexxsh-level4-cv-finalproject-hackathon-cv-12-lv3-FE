import React, { useState } from 'react'
import Sidebar from '@/components/chatbot/sidebar'
import ShowPdf from '@/components/chatbot/show_pdf'
import ChatSection from '@/components/chatbot/chat_section'
import { ToastManager } from '@/components/Loading/loading'
import { ToastContainer, toast } from 'react-toastify'

const Upload = () => {
  const [isChatReady, setIsChatReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex justify-center md:justify-start">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col md:flex-row">
        <ShowPdf isChatReady={isChatReady} />
      </div>

      <div className="relative flex flex-1 flex-col md:flex-row">
        {/* ToastContainer는 화면 어디서든 토스트를 띄울 수 있도록 함 */}
        <ToastContainer position="top-right" autoClose={3000} />

        {/* ChatSection에 toast 함수를 전달해야 사용 가능 */}
        <ChatSection
          setIsChatReady={setIsChatReady}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          toast={toast}
        />
      </div>
    </div>
  )
}

export default Upload
