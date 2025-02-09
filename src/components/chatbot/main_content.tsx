import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastManager } from '../Loading/loading'
import Header from './chatbot_header'
import Upload from '@/assets/main/Upload.svg'

const UploadLoadingAnimation = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100">
    <div className="relative">
      {/* Upload icon in the center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <svg
          className="h-12 w-12 animate-bounce text-[#0069FF]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      </div>
    </div>
    <p className="mt-8 text-lg font-medium text-[#4B5563]">PDF 파일을 분석하고 있습니다...</p>
    <p className="mt-2 text-sm text-[#6B7280]">잠시만 기다려주세요</p>
  </div>
)

const MainContent = () => {
  const [originalPdf, setOriginalPdf] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const navigate = useNavigate()

  const handleFileChange = async (e, addToast, updateToast) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setOriginalPdf(file)
      setIsUploading(true)

      const reader = new FileReader()
      reader.onload = () => {
        localStorage.setItem('originalPdfData', reader.result)
        console.log('로컬스토리지에 PDF 파일 저장 완료')
      }
      reader.readAsDataURL(file)

      await handlePostRequest(file, addToast, updateToast)
    } else {
      alert('PDF 파일만 업로드 가능합니다.')
    }
  }

  const handlePostRequest = async (file, addToast, updateToast) => {
    if (!file) return

    console.log('POST 요청 시작...')
    const formData = new FormData()
    formData.append('file', file)
    formData.append('pdf_id', Math.floor(Math.random() * 1000000).toString())
    formData.append('user_id', 'admin')

    const toastId = addToast('PDF 업로드 중...', 'loading')

    try {
      const response = await fetch('http://127.0.0.1:8000/pdf', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('Filename', data.data.filename)
        localStorage.setItem('FileId', data.data.file_id.toString())

        console.log('업로드 성공:', data)
        updateToast(toastId, { message: 'PDF 업로드 성공!', type: 'success' })

        setTimeout(() => {
          navigate('/chat')
        }, 2000)
      } else {
        updateToast(toastId, {
          message: '업로드 실패 - PDF를 다시 업로드하세요',
          type: 'error',
        })
        setOriginalPdf(null)
      }
    } catch (error) {
      console.error('서버 오류:', error)
      updateToast(toastId, { message: '서버 오류 발생!', type: 'error' })
      setOriginalPdf(null)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <ToastManager>
      {({ addToast, updateToast }) => (
        <div className="flex flex-1 flex-col bg-white">
          <Header title="PDF를 업로드해 주세요" />
          <div className="flex h-full w-full items-center justify-center">
            {isUploading ? (
              <UploadLoadingAnimation />
            ) : (
              !originalPdf && (
                <div className="relative flex h-full w-full items-center justify-center bg-gray-100">
                  <img
                    src={Upload}
                    alt="Drag and Drop"
                    className="mb-8 cursor-pointer"
                    onClick={() => document.getElementById('file-input').click()}
                    draggable="false"
                  />
                  <input
                    id="file-input"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, addToast, updateToast)}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </ToastManager>
  )
}

export default MainContent
