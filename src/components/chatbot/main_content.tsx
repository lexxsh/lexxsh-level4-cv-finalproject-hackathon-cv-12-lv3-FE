import React, { useState } from 'react'
import Header from './chatbot_header'

const MainContent = () => {
  const [isDragging, setIsDragging] = useState(false) // 드래그 중인지 여부
  const [originalPdf, setOriginalPdf] = useState(null) // 원문 PDF 파일
  const [translatedPdf, setTranslatedPdf] = useState(null) // 번역 PDF 파일
  const [selectedSection, setSelectedSection] = useState('원문') // 선택된 섹션 (원문 또는 번역)
  const [isTranslationReady, setIsTranslationReady] = useState(false) // 번역 PDF 준비 여부

  // 드래그 오버 시 호출
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  // 드래그 영역을 벗어날 때 호출
  const handleDragLeave = () => {
    setIsDragging(false)
  }

  // 파일 드롭 시 호출
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type === 'application/pdf') {
        setOriginalPdf(file)
        console.log('원문 PDF 파일 업로드 성공:', file.name)
        setIsTranslationReady(false) // 번역 PDF 초기화
        fetchTranslatedPdf() // 번역 요청 (임시)
      } else {
        alert('PDF 파일만 업로드 가능합니다.')
      }
    }
  }

  // 파일 선택 시 호출
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setOriginalPdf(file)
      console.log('원문 PDF 파일 업로드 성공:', file.name)
      setIsTranslationReady(false) // 번역 PDF 초기화
      fetchTranslatedPdf() // 번역 요청 (임시)
    } else {
      alert('PDF 파일만 업로드 가능합니다.')
    }
  }

  // 섹션 선택 시 호출
  const handleSectionClick = (section) => {
    setSelectedSection(section)
  }

  // 번역 PDF 받아오기 (임시 함수)
  const fetchTranslatedPdf = () => {
    // 서버에서 번역 PDF를 받아오는 로직 (임시)
    // setTimeout(() => {
    //   const translatedFile = new File(['임시 번역 PDF'], 'translated.pdf', {
    //     type: 'application/pdf',
    //   })
    //   setTranslatedPdf(translatedFile)
    //   setIsTranslationReady(true) // 번역 PDF 준비 완료
    //   console.log('번역 PDF 받아오기 성공')
    // }, 2000) // 2초 후 번역 PDF 받아오는 시뮬레이션
  }

  return (
    <div className="flex flex-1 flex-col bg-white ">
      <Header title="PDF" />
      <div className="mx-4 mt-2 flex items-center justify-center">
        <div className="w-full text-center">
          {/* 원문 PDF가 업로드된 경우에만 원문/번역 선택 섹션 표시 */}
          {originalPdf ? (
            <>
              {/* 원문/번역 선택 섹션 */}
              <div className="mb-2 ml-2 flex justify-start space-x-4">
                <button
                  onClick={() => handleSectionClick('원문')}
                  className={`px-4 py-2 text-lg font-semibold ${
                    selectedSection === '원문'
                      ? 'text-blue-600 border-b-2 border-black pb-1' // 밑줄 스타일
                      : 'text-gray-500'
                  }`}
                >
                  원문
                </button>
                <button
                  onClick={() => handleSectionClick('번역')}
                  className={`px-4 py-2 text-lg font-semibold ${
                    selectedSection === '번역'
                      ? 'text-blue-600 border-b-2 border-black pb-1' // 밑줄 스타일
                      : 'text-gray-500'
                  }`}
                  disabled={!isTranslationReady} // 번역 PDF가 준비되지 않으면 비활성화
                >
                  번역
                </button>
              </div>

              {/* PDF 뷰어 영역 */}
              <div className="h-[calc(100vh-150px)] w-full ">
                {selectedSection === '원문' ? (
                  <iframe
                    src={`${URL.createObjectURL(originalPdf)}#toolbar=0`}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    title="원문 PDF 뷰어"
                  />
                ) : (
                  translatedPdf && (
                    <iframe
                      src={`${URL.createObjectURL(translatedPdf)}#toolbar=0`}
                      width="100%"
                      height="100%"
                      style={{ border: 'none' }}
                      title="번역 PDF 뷰어"
                    />
                  )
                )}
              </div>
            </>
          ) : (
            // 원문 PDF가 업로드되지 않은 경우, 업로드 UI 표시
            <div className="flex w-full flex-col items-center justify-center">
              <p className="mb-4 mt-20 text-xl font-semibold">원문 PDF를 업로드해주세요.</p>

              {/* 드래그 앤 드롭 영역 */}
              <div
                className={`flex h-[30rem] w-full max-w-md flex-col items-center justify-center rounded-lg border-l-2 border-r-2 border-gray-300 p-8 ${
                  isDragging ? 'border-blue-500' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <p className="text-gray-600">PDF 파일을 여기로 드래그 앤 드롭하세요.</p>
                <p className="mt-2 text-gray-400">또는</p>
                <label
                  htmlFor="file-input"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50 mt-2 cursor-pointer rounded-lg border-2 bg-transparent px-4 py-2"
                >
                  파일 선택
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainContent
