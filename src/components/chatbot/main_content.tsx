import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './chatbot_header'
import Upload from '@/assets/main/Upload.svg'

const MainContent = () => {
  const [isDragging, setIsDragging] = useState(false) // 드래그 중인지 여부
  const [originalPdf, setOriginalPdf] = useState(null) // 원문 PDF 파일
  const [isDropZoneActive, setIsDropZoneActive] = useState(false) // 드래그 앤 드롭 영역 활성화 상태
  const navigate = useNavigate()

  // 드래그 오버 시 호출
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setIsDropZoneActive(true)
  }

  // 드래그 영역을 벗어날 때 호출
  const handleDragLeave = () => {
    setIsDragging(false)
    setIsDropZoneActive(false)
  }

  // 파일 드롭 시 호출
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    setIsDropZoneActive(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type === 'application/pdf') {
        const fileUrl = URL.createObjectURL(file)
        localStorage.setItem('uploadedPdf', fileUrl)
        setOriginalPdf(file)
        console.log('원문 PDF 파일 업로드 성공:', file.name)
        handlePostRequest() // 업로드 후 임시 POST 요청 실행
      } else {
        alert('PDF 파일만 업로드 가능합니다.')
      }
    }
  }

  // 파일 선택 시 호출
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      const fileUrl = URL.createObjectURL(file)
      localStorage.setItem('uploadedPdf', fileUrl)
      setOriginalPdf(file)
      console.log('원문 PDF 파일 업로드 성공:', file.name)
      handlePostRequest() // 업로드 후 임시 POST 요청 실행
    } else {
      alert('PDF 파일만 업로드 가능합니다.')
    }
  }

  // 임시 POST 요청 함수 (2초 후 /chat 페이지로 이동)
  const handlePostRequest = () => {
    console.log('POST 요청을 보낼 준비 중...')
    setTimeout(() => {
      console.log('POST 요청 완료, /chat 페이지로 이동')
      navigate('/chat')
    }, 2000)
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header title="PDF를 업로드해 주세요" />
      <div className="flex h-full w-full items-center justify-center">
        {!originalPdf && (
          <div
            className={`relative flex h-full w-full items-center justify-center ${
              isDropZoneActive ? 'bg-gray-100' : 'bg-transparent'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!isDropZoneActive && (
              <img
                src={Upload}
                alt="Drag and Drop"
                className="mb-8 cursor-pointer"
                onClick={() => document.getElementById('file-input').click()}
                draggable="false"
              />
            )}
            {/* 드래그 드롭 안내 텍스트 */}
            {isDropZoneActive && (
              <div className="text-m absolute text-center font-bold text-black">
                드래그 앤 드롭을 하세요
              </div>
            )}
            <input
              id="file-input"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default MainContent
