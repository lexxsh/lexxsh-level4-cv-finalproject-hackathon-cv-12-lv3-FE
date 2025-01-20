import React, { useState } from 'react'
import Header from './chatbot_header'

const MainContent = () => {
  const [isDragging, setIsDragging] = useState(false) // 드래그 중인지 여부
  const [uploadedFile, setUploadedFile] = useState(null) // 업로드된 파일

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
        setUploadedFile(file)
        console.log('PDF 파일 업로드 성공:', file.name)
      } else {
        alert('PDF 파일만 업로드 가능합니다.')
      }
    }
  }

  // 파일 선택 시 호출
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file)
      console.log('PDF 파일 업로드 성공:', file.name)
    } else {
      alert('PDF 파일만 업로드 가능합니다.')
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header title="PDF" />
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-xl font-semibold">PDF 문서를 업로드해주세요.</p>

          {/* 드래그 앤 드롭 영역 */}
          <div
            className={`flex h-[30rem] w-[35rem] max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-gray-600">PDF 파일을 여기로 드래그 앤 드롭하세요.</p>
            <p className="mt-2 text-gray-400">또는</p>
            <label
              htmlFor="file-input"
              className="bg-blue-500 hover:bg-blue-600 mt-2 cursor-pointer rounded-lg px-4 py-2 text-gray-600"
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

          {/* 업로드된 파일 정보 */}
          {uploadedFile && (
            <div className="bg-green-50 border-green-500 mt-4 rounded-lg border p-4">
              <p className="text-green-700">
                업로드된 파일: <strong>{uploadedFile.name}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainContent
