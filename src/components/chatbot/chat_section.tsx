import React, { useState, useRef, useEffect } from 'react'
import Header from './chatbot_header'
import Icon from '@/assets/icon.svg'

const ChatSection = () => {
  const [messages, setMessages] = useState([
    {
      text: 'The question of whether androids dream of electric sheep is the title and central theme of the science fiction novel Do Androids Dream of Electric Sheep? by Philip K. Dick.',
      isUser: false,
      timestamp: '02:22 AM',
    },
  ]) // 메시지 목록
  const [inputText, setInputText] = useState('') // 입력된 텍스트
  const messagesEndRef = useRef(null) // 스크롤을 위한 ref
  const textareaRef = useRef(null)

  // 스크롤을 가장 아래로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }
  // 메시지가 업데이트될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 메시지 전송 처리
  const handleSendMessage = () => {
    if (inputText.trim() === '') return // 빈 메시지는 무시

    // 사용자 메시지 추가
    const userMessage = {
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMessage])

    // 챗봇 응답 추가 (사용자 입력 따라하기)
    const botMessage = {
      text: `You said: "${inputText}"`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage])
    }, 500) // 0.5초 후 챗봇 응답

    setInputText('') // 입력 필드 초기화
  }

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      {/* 헤더 */}
      <Header padding="p-[1.5rem]" />

      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-xl p-4 text-sm shadow-md ${
                message.isUser ? 'bg-blue-500 text-gray-800' : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <p className="mt-1 text-xs text-gray-500">
                {message.isUser ? 'You' : 'SummarAI'} {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        {/* 스크롤을 위한 빈 div */}
        <div ref={messagesEndRef} />
      </div>

      {/* 메시지 입력 필드 */}
      <div className="bg-white p-2">
        <div className="relative flex items-center">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onInput={handleInput} // 입력할 때마다 높이 자동 조정
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Message SummarAI..."
            className="max-h-35 flex-1 resize-none overflow-auto rounded-2xl border border-gray-300 p-3 pl-6 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="hover:bg-blue-600 absolute right-3 top-1/2 -translate-y-1/2 transform rounded-r-lg bg-gray-200 px-6 py-3 text-sm text-black"
          >
            Send
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-gray-500">
          SummarAI can make mistakes. Check our{' '}
          <a href="#" className="text-black">
            Terms & Conditions
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default ChatSection
