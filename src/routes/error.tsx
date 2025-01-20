import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold">Error Occurred</h2>
        <p className="text-gray-600">Sorry, something went wrong.</p>

        <Link to="/" className="text-gray-600 hover:text-gray-800">
          <button className="bg-blue-500 prose prose-xl  mt-4 rounded-md px-4  py-2 font-bold text-gray-400 hover:bg-gray-200">
            홈으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
