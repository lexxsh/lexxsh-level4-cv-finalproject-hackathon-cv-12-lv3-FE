import React, { useEffect, useState } from 'react'
import Header from './chatbot_header'

const ShowPDF = () => {
  const [pdfUrl, setPdfUrl] = useState('')
  const [selectedTab, setSelectedTab] = useState('original') // 'original' | 'translated'

  useEffect(() => {
    const storedPdf = localStorage.getItem('uploadedPdf')
    if (storedPdf) {
      setPdfUrl(storedPdf)
    }
  }, [])

  return (
    <div className="relative h-full w-full flex-1 select-none bg-white">
      {/* 헤더 */}
      <Header title="PDF" />

      {/* 탭 메뉴 */}
      <div className="absolute right-5 top-8 z-10 ml-4 flex  cursor-pointer justify-start space-x-2 bg-white">
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
      <div className=" h-[90%]">
        {pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            width="100%"
            height="100%"
            title="PDF Viewer"
            style={{ border: 'none' }}
          ></iframe>
        ) : (
          <p>PDF를 불러오는 중...</p>
        )}
      </div>
    </div>
  )
}

export default ShowPDF
