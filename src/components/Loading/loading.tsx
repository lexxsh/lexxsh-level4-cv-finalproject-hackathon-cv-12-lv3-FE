import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

type ToastType = 'loading' | 'success' | 'error'

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastProviderProps {
  children: (props: {
    addToast: (message: string, type?: ToastType) => number
    removeToast: (id: number) => void
    updateToast: (id: number, updates: Partial<Toast>) => void
  }) => React.ReactNode
}

interface ToastProps extends Toast {
  onClose: () => void
}

// 개별 Toast 컴포넌트
const ToastComponent = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    if (type === 'success' || type === 'error') {
      const timer = setTimeout(() => {
        onClose()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [type, onClose])

  const getToastStyles = () => {
    switch (type) {
      case 'loading':
        return 'bg-[#3B82F6]' // blue-500
      case 'success':
        return 'bg-[#10B981]' // green-500
      case 'error':
        return 'bg-[#EF4444]' // red-500
      default:
        return 'bg-[#6B7280]' // gray-500
    }
  }

  return (
    <div
      className={`flex w-[350px] min-w-[350px] max-w-[350px] items-center justify-between rounded-lg ${getToastStyles()} p-4 text-white shadow-lg transition-all duration-300`}
    >
      <div className="flex w-full items-center gap-2">
        {type === 'loading' && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {/* dangerouslySetInnerHTML을 사용하여 HTML 렌더링 */}
        <span
          className="break-words" // 텍스트 줄 바꿈을 허용
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
      <button onClick={onClose} className="ml-2 rounded-full p-1 hover:bg-white/20">
        <X size={16} />
      </button>
    </div>
  )
}

// Toast 메시지를 관리하는 컴포넌트
export const ToastManager = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: ToastType = 'loading') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    return id
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const updateToast = (id: number, updates: Partial<Toast>) => {
    setToasts((prev) => prev.map((toast) => (toast.id === id ? { ...toast, ...updates } : toast)))
  }

  return (
    <>
      {children({ addToast, removeToast, updateToast })}
      <div className="fixed right-0 top-0 z-50 m-4 flex flex-col items-end space-y-2">
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </>
  )
}
