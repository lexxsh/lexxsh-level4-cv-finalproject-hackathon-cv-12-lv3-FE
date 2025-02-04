import React, { useState, useRef, useEffect } from 'react'
import Header from './chatbot_header'
import Icon from '@/assets/icon.svg'
import Button from '@/assets/chat/button.svg'
import Stop from '@/assets/chat/stop.svg'
import AI_text from '@/assets/chat/summarai_text.svg'
import User_text from '@/assets/chat/you_text.svg'
import AI_Avatar from '@/assets/chat/Avatar.svg'
import S1 from '@/assets/chat/s1.svg'
import S2 from '@/assets/chat/s2.svg'
import S3 from '@/assets/chat/s3.svg'
import S4 from '@/assets/chat/s4.svg'
import S5 from '@/assets/chat/s5.svg'
import { ClipLoader } from 'react-spinners' // react-spinners 라이브러리에서 ClipLoader 가져오기

const ChatSection = () => {
  const [messages, setMessages] = useState([
    {
      text: 'The question of whether androids dream of electric sheep is the title and central theme of the science fiction novel Do Androids Dream of Electric Sheep? by Philip K. Dick.',
      isUser: false,
      timestamp: '02:22 AM',
      // 각 메시지별 아이콘 상태를 개별적으로 관리 (초기값 false: S4 아이콘 표시)
      iconChanged: false,
    },
  ])
  const [inputText, setInputText] = useState('')
  const [svgColor, setSvgColor] = useState('#000000')
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isSending, setIsSending] = useState(false) // 메시지 전송 및 타이핑 효과 진행 여부
  // sendButtonState: 'normal' | 'spinner' | 'stop'
  const [sendButtonState, setSendButtonState] = useState('normal')
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const chatContainerRef = useRef(null)
  const typeIntervalRef = useRef(null) // 타이핑 효과 타이머 참조

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const checkScrollable = () => {
      if (chatContainerRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = chatContainerRef.current
        setShowScrollButton(scrollTop < scrollHeight - clientHeight)
      }
    }

    checkScrollable()
    window.addEventListener('resize', checkScrollable)
    chatContainerRef.current?.addEventListener('scroll', checkScrollable)

    return () => {
      window.removeEventListener('resize', checkScrollable)
      chatContainerRef.current?.removeEventListener('scroll', checkScrollable)
    }
  }, [messages])

  const handleSendMessage = () => {
    if (inputText.trim() === '') return

    // 메시지 전송 중 처리 시작
    setIsSending(true)
    setSendButtonState('spinner') // 처음 2초 동안 스피너 표시

    // 사용자 메시지 추가
    const userMessage = {
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    }
    setMessages((prev) => [...prev, userMessage])

    // 봇 메시지를 빈 문자열로 미리 추가 (타이핑 효과 진행)
    const newBotMessage = {
      text: '', // 이후 타이핑 효과로 채워질 예정
      isUser: false,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      iconChanged: false, // 해당 메시지의 아이콘 상태
    }
    setMessages((prev) => [...prev, newBotMessage])

    const fullBotResponse = `You said: "${inputText}"`

    // 2초 동안 스피너 표시 후 타이핑 효과 시작
    setTimeout(() => {
      setSendButtonState('stop')
      let currentCharIndex = 0
      typeIntervalRef.current = setInterval(() => {
        currentCharIndex++
        // 마지막 메시지(방금 추가한 봇 메시지)를 업데이트
        setMessages((prev) => {
          const newMessages = [...prev]
          const lastIndex = newMessages.length - 1
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            text: fullBotResponse.slice(0, currentCharIndex),
          }
          return newMessages
        })

        if (currentCharIndex === fullBotResponse.length) {
          clearInterval(typeIntervalRef.current)
          setIsSending(false)
          setSendButtonState('normal')
        }
      }, 50) // 50ms 간격으로 한 글자씩 추가
    }, 2000) // 처음 2초 동안 스피너 표시

    setInputText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  // 각 봇 메시지의 텍스트를 복사하도록 수정: 해당 메시지의 텍스트를 인자로 받음
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('메시지 내용이 복사되었습니다.')
  }

  // 각 메시지의 S4 아이콘 클릭 시 해당 메시지의 아이콘을 S5로 변경 (한 번 변경되면 더 이상 안 바뀜)
  const handleIconChange = (messageIndex) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, i) => {
        // 봇 메시지이며 아직 iconChanged가 false인 경우에만 변경
        if (i === messageIndex && !msg.iconChanged) {
          return { ...msg, iconChanged: true }
        }
        return msg
      }),
    )
  }

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      <Header title="Chat" />

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto rounded-lg bg-white p-2 shadow-lg"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}
          >
            <div className="mb-2 flex select-none flex-row items-center gap-2">
              {!message.isUser && (
                <img src={AI_Avatar} alt="SummarAI Avatar" className="h-8 w-8 rounded-full" />
              )}
              <img
                src={message.isUser ? User_text : AI_text}
                alt={message.isUser ? 'User' : 'SummarAI'}
                className={message.isUser ? 'h-2.5' : 'h-4'}
              />
              <p className="mt-1 text-xs text-gray-400">{message.timestamp}</p>
            </div>

            <div
              className={`${
                message.isUser
                  ? 'max-w-[70%] rounded-xl bg-[#F1F8FF] p-4'
                  : 'max-w-[full] bg-transparent pl-10'
              } overflow-wrap-anywhere whitespace-pre-wrap break-words text-sm`}
            >
              <p className="break-all">{message.text}</p>
              {/* 봇 메시지인 경우 아이콘 그룹 표시 */}
              {!message.isUser && (
                <div className="mt-4 flex select-none gap-2">
                  <img src={S1} alt="S1" className="w-5 cursor-pointer hover:opacity-60" />
                  <img
                    src={S2}
                    alt="S2"
                    className="w-5 cursor-pointer hover:opacity-60"
                    onClick={() => handleCopyToClipboard(message.text)}
                  />
                  <img src={S3} alt="S3" className="w-5 cursor-pointer hover:opacity-60" />
                  <img
                    // 해당 메시지의 iconChanged 상태에 따라 S4 또는 S5 표시
                    src={message.iconChanged ? S5 : S4}
                    alt={message.iconChanged ? 'S5' : 'S4'}
                    className="w-5 cursor-pointer hover:opacity-60"
                    onClick={() => handleIconChange(index)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white p-2">
        <div className="relative flex items-center">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onInput={handleInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Message SummarAI..."
            className="max-h-40 flex-1 resize-none overflow-auto rounded-3xl border border-gray-300 p-3 pl-4 pr-12 shadow-md focus:ring-0"
          />
          <div className="absolute bottom-3 right-3">
            {sendButtonState === 'spinner' ? (
              // spinner 상태: 처음 2초 동안 ClipLoader 표시
              <ClipLoader color="#22c8ff" loading={true} size={40} />
            ) : sendButtonState === 'stop' ? (
              // 타이핑 진행 중: Stop 아이콘 표시
              <img
                src={Stop}
                alt="Stop button"
                className="cursor-pointer px-0"
                onClick={() => {
                  /* 필요 시 타이핑 중지 기능 구현 */
                }}
              />
            ) : (
              // 정상 상태: Button 아이콘 표시
              <img
                src={Button}
                alt="Send button"
                className="cursor-pointer px-0"
                onClick={handleSendMessage}
              />
            )}
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-gray-500">
          SummarAI can make mistakes. Check our{' '}
          <a href="#" className="text-black">
            Terms & Conditions
          </a>
          .
        </p>
      </div>

      {showScrollButton && (
        <button
          className="fixed bottom-[130px] right-5 flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-black hover:bg-gray-100 focus:ring-0"
          onClick={scrollToBottom}
        >
          ↓
        </button>
      )}
    </div>
  )
}

export default ChatSection
