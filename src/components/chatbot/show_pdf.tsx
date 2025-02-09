import React, { useEffect, useState } from 'react'
import Header from './chatbot_header'
import { useParams } from 'react-router-dom'

const ShowPDF = ({ isChatReady }) => {
  const [originalPdfUrl, setOriginalPdfUrl] = useState('') // 원문 PDF URL (또는 Base64 데이터)
  const [translatedPdfUrl, setTranslatedPdfUrl] = useState('') // 번역 PDF URL
  const [selectedTab, setSelectedTab] = useState('original') // 'original' | 'translated'
  const [isOriginalLoading, setIsOriginalLoading] = useState(true) // 원문 PDF 로딩 상태
  const [isTranslatedLoading, setIsTranslatedLoading] = useState(false) // 번역 PDF 로딩 상태
  const { fileId } = useParams()

  // 원문 PDF와 번역 PDF 로딩: fileId가 있으면 서버에서 가져오고 없으면 로컬에서 가져옴
  useEffect(() => {
    const loadPDFs = async () => {
      setIsOriginalLoading(true)
      setIsTranslatedLoading(true)

      if (fileId) {
        // fileId가 있으면 서버에서 원문과 번역 PDF를 동시에 가져옴
        try {
          const userId = 'admin'

          // 원문 PDF와 번역 PDF를 동시에 요청
          const [originalResponse, translatedResponse] = await Promise.all([
            fetch('http://127.0.0.1:8003/pdf/get_paper', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ user_id: userId, pdf_id: fileId }),
            }),
            fetch('http://127.0.0.1:8003/pdf/get_translate_paper', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ user_id: userId, pdf_id: fileId }),
            }),
          ])

          if (!originalResponse.ok) throw new Error('Failed to fetch original PDF')
          if (!translatedResponse.ok) throw new Error('Failed to fetch translated PDF')

          const originalBlob = await originalResponse.blob()
          const translatedBlob = await translatedResponse.blob()

          const originalUrl = URL.createObjectURL(originalBlob)
          const translatedUrl = URL.createObjectURL(translatedBlob)

          setOriginalPdfUrl(originalUrl)
          setTranslatedPdfUrl(translatedUrl)
        } catch (error) {
          console.error('Error loading PDFs:', error)
        } finally {
          setIsOriginalLoading(false)
          setIsTranslatedLoading(false)
        }
      } else {
        // fileId가 없으면 로컬 스토리지에서 원문 PDF만 가져옴
        const storedPdfData = localStorage.getItem('originalPdfData')
        if (storedPdfData) {
          setOriginalPdfUrl(storedPdfData)
        }
        setIsOriginalLoading(false)
        setIsTranslatedLoading(false)
      }
    }

    loadPDFs()
  }, [fileId])

  return (
    <div className="relative h-full w-full flex-1 select-none bg-white">
      {/* 헤더 */}
      <Header title="PDF" />

      {/* 탭 메뉴 */}
      <div className="absolute right-5 top-8 z-10 ml-4 flex cursor-pointer justify-start space-x-2 bg-white">
        <button
          className={`text-s w-[50px] border-b-2 font-semibold transition-all ${
            selectedTab === 'original'
              ? 'border-[#101B49] text-gray-800'
              : 'border-transparent text-gray-400'
          }`}
          onClick={() => setSelectedTab('original')}
        >
          원문
        </button>
        <button
          className={`text-s w-[50px] border-b-2 font-semibold transition-all ${
            selectedTab === 'translated'
              ? 'border-[#101B49] text-gray-800'
              : 'border-transparent text-gray-400'
          }`}
          onClick={() => setSelectedTab('translated')}
        >
          번역
        </button>
      </div>

      {/* PDF 뷰어 */}
      <div className="flex h-[90%] items-center justify-center">
        {selectedTab === 'original' ? (
          isOriginalLoading ? (
            <div className="flex flex-col items-center">
              <div className="border-blue-500 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
              <p className="mt-2 text-gray-500">📄 원문 PDF 로딩 중...</p>
            </div>
          ) : originalPdfUrl ? (
            <iframe
              src={`${originalPdfUrl}#toolbar=0`}
              width="100%"
              height="100%"
              title="원문 PDF 뷰어"
              style={{ border: 'none' }}
            />
          ) : (
            <p className="text-red-500">🚫 원문 PDF를 불러올 수 없습니다.</p>
          )
        ) : isTranslatedLoading ? (
          <div className="flex flex-col items-center">
            <div className="border-blue-500 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="mt-2 text-gray-500">📄 번역 준비 중...</p>
          </div>
        ) : translatedPdfUrl ? (
          <iframe
            src={`${translatedPdfUrl}#toolbar=0`}
            width="100%"
            height="100%"
            title="번역 PDF 뷰어"
            style={{ border: 'none' }}
          />
        ) : (
          <p className="text-red-500">🚫 챗봇 준비가 완료된 후 번역이 진행됩니다.</p>
        )}
      </div>
    </div>
  )
}

export default ShowPDF
