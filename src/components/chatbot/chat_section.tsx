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
import { ClipLoader, MoonLoader } from 'react-spinners'
import { useNavigate, useParams } from 'react-router-dom' // useParams 추가

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ChatSection = ({ setIsChatReady, toast }) => {
  const navigate = useNavigate()
  const { fileId } = useParams()
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [svgColor, setSvgColor] = useState('#000000')
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendButtonState, setSendButtonState] = useState('normal')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const chatContainerRef = useRef(null)
  const typeIntervalRef = useRef(null)
  const fullResponseRef = useRef('')

  // 챗봇 준비 함수
  const prepareChatbot = async () => {
    const localfileId = localStorage.getItem('FileId')
    if (!localfileId) {
      toast.error('PDF를 먼저 업로드해주세요!')
      return
    }

    const chatbotToastId = toast.loading('⏳ 챗봇을 준비중...')
    const tableToastId = toast.loading('⏳ 테이블/그림 데이터를 준비중...')
    const summaryToastId = toast.loading('⏳ PDF 요약을 진행 중...')

    try {
      // 두 API 요청을 병렬로 실행
      const chatbotPromise = fetch('http://127.0.0.1:8000/chat-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdf_id: localfileId, user_id: 'admin' }),
      })

      const tableFigurePromise = fetch('http://127.0.0.1:8001/table-figure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdf_id: localfileId, user_id: 'admin' }),
      })

      const summarizePromise = fetch('http://127.0.0.1:8002/pdf/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdf_id: localfileId, user_id: 'admin' }),
      })

      try {
        const chatbotResponse = await chatbotPromise
        const chatbotData = await chatbotResponse.json()

        if (chatbotData.success) {
          setIsChatReady(true)
          setMessages([
            {
              text: chatbotData.message,
              isUser: false,
              timestamp: new Date().toLocaleTimeString(),
            },
          ])
          toast.update(chatbotToastId, {
            render: '✅ 챗봇이 준비되었습니다!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          })
          navigate(`/chat/${localfileId}`)
        } else {
          toast.update(chatbotToastId, {
            render: `⚠️ 챗봇 준비 실패: ${chatbotData.message}`,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          })
        }
      } catch (error) {
        console.error('챗봇 준비 중 오류:', error)
        toast.update(chatbotToastId, {
          render: '🚨 챗봇 준비 중 오류 발생!',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        })
      }

      try {
        const tableFigureResponse = await tableFigurePromise
        const tableFigureData = await tableFigureResponse.json()

        if (tableFigureData.success) {
          toast.update(tableToastId, {
            render: '✅ 테이블/그림 준비 완료!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          })
        } else {
          toast.update(tableToastId, {
            render: `⚠️ 테이블/그림 준비 실패: ${tableFigureData.message}`,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          })
        }
      } catch (error) {
        console.error('테이블/그림 준비 중 오류:', error)
        toast.update(tableToastId, {
          render: '🚨 테이블/그림 준비 중 오류 발생!',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        })
      }
      try {
        const summarizeResponse = await summarizePromise
        const summarizeData = await summarizeResponse.json()

        if (summarizeData.success) {
          toast.update(summaryToastId, {
            render: '✅ PDF 요약 완료!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          })
        } else {
          toast.update(summaryToastId, {
            render: `⚠️ PDF 요약 실패: ${summarizeData.message}`,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          })
        }
      } catch (error) {
        console.error('PDF 요약 중 오류:', error)
        toast.update(summaryToastId, {
          render: '🚨 PDF 요약 중 오류 발생!',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        })
      }
    } catch (error) {
      console.error('예상치 못한 오류:', error)
    }
  }

  // URL에 fileId가 있을 때만 챗봇 히스토리 요청
  const getChatHistory = async () => {
    if (!fileId) {
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch('http://127.0.0.1:8000/pdf/get_chat_hist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdf_id: fileId, user_id: 'admin' }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          const chatHistory = data.chat_hist
          const formattedMessages = chatHistory.map(
            ([id, sender, message, timestamp, iconChanged]) => ({
              text: message,
              isUser: sender === 'user', // 'user'이면 true, 'assistant'이면 false
              timestamp: new Date(timestamp).toLocaleTimeString(),
              iconChanged,
            }),
          )

          setMessages(formattedMessages)
        } else {
          toast.error('⚠️ 채팅 히스토리를 불러오는 데 실패했습니다.')
        }
      } else {
        throw new Error('채팅 히스토리 불러오기 실패')
      }
    } catch (error) {
      console.error('채팅 히스토리 요청 중 오류 발생:', error)
      toast.error('🚨 채팅 히스토리 요청 중 오류 발생!')
    } finally {
      setIsLoading(false) // 로딩 종료
    }
  }

  useEffect(() => {
    if (!fileId) {
      prepareChatbot()
      console.log('no fileID')
    } else {
      getChatHistory()
      console.log('yes fileID')
    }
  }, [fileId])

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

  const handleStopGeneration = () => {
    if (typeIntervalRef.current) {
      clearInterval(typeIntervalRef.current)
    }

    setMessages((prev) => {
      const newMessages = [...prev]
      const lastIndex = newMessages.length - 1
      newMessages[lastIndex] = {
        ...newMessages[lastIndex],
        text: fullResponseRef.current,
      }
      return newMessages
    })

    setIsSending(false)
    setSendButtonState('normal')
  }

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return

    setIsSending(true)
    setSendButtonState('spinner')

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

    const newBotMessage = {
      text: '',
      isUser: false,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      iconChanged: false,
    }
    setMessages((prev) => [...prev, newBotMessage])

    try {
      const userId = 'admin'

      if (!fileId) {
        alert('PDF ID가 없습니다! 아직 PDF가 업로드 진행중입니다!')
        return
      }

      const response = await fetch('http://127.0.0.1:8003/chat-bot/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdf_id: fileId,
          user_id: userId,
          message: inputText,
        }),
      })

      if (!response.ok) {
        throw new Error('챗봇에 메시지를 전송하는 데 실패했습니다.')
      }

      const data = await response.json()
      const fullBotResponse = data.data.message || '챗봇에 메시지를 전송하는 데 실패했습니다.'

      fullResponseRef.current = fullBotResponse

      // 타이핑 효과 구현
      setTimeout(() => {
        setSendButtonState('stop')
        let currentCharIndex = 0
        typeIntervalRef.current = setInterval(() => {
          currentCharIndex++
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
        }, 50)
      }, 2000)
    } catch (error) {
      console.error('챗봇에 메시지를 전송하는 중 오류 발생:', error)
      setMessages((prev) => [
        ...prev,
        {
          text: '메시지 전송 오류. 다시 시도해 주세요.',
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
      setIsSending(false)
      setSendButtonState('normal')
    }

    setInputText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('메시지 내용이 복사되었습니다.')
  }

  const handleIconChange = (messageIndex) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, i) => {
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
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-400 bg-opacity-50">
          <MoonLoader size={50} color="#fff" />
        </div>
      )}
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
          <button onClick={handleSendMessage} className="absolute bottom-3 right-3">
            {sendButtonState === 'spinner' ? (
              <ClipLoader size={35} color="#0063F7" />
            ) : sendButtonState === 'stop' ? (
              <img
                src={Stop}
                alt="Stop"
                onClick={handleStopGeneration}
                className="cursor-pointer px-0"
              />
            ) : (
              <img src={Button} alt="Send" className="cursor-pointer px-0" />
            )}
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
