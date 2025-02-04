import React, { useEffect, useState } from 'react'

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
    <div className="w-full flex-1 flex-col items-center justify-center bg-white">
      {/* 탭 메뉴 */}
      <div className="mb-2 ml-4 mt-4 flex justify-start space-x-2">
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
      {pdfUrl ? (
        <iframe
          src={`${pdfUrl}#toolbar=0`}
          width="100%"
          height="93%"
          title="PDF Viewer"
          style={{ border: 'none' }}
        ></iframe>
      ) : (
        <p>PDF를 불러오는 중...</p>
      )}
    </div>
  )
}

export default ShowPDF
