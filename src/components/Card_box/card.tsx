import React from 'react'
import { Link } from 'react-router-dom'
import Img from '@/assets/summary/default.png'
const Card = ({ tags, title, description, image, id }) => {
  return (
    <div className="flex h-[24rem] w-[12rem] flex-col justify-center rounded-2xl border bg-white p-4 pb-2 shadow">
      {/* 이미지 섹션 (고정 크기) */}
      <div className="h-[8rem] w-full">
        <img
          src={Img} // props로 받은 이미지 경로 사용
          alt="Preview"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      {/* 태그 섹션 */}
      <div className="mt-3 flex flex-col gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="w-fit whitespace-nowrap rounded-md bg-[rgba(153,197,255,0.25)] px-2 py-1 text-sm font-medium text-[#0069FF]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 텍스트 섹션 */}
      <div className="mt-4 min-h-[3rem]">
        <p className="text-m line-clamp-2 text-gray-700">{title}</p>
      </div>
      <p className="mt-1 line-clamp-2 text-sm text-gray-400">{description}</p>

      {/* 버튼 섹션 */}
      <div className="mt-3 flex justify-between">
        <Link
          to={{
            pathname: `/summary-detail/${id}`,
            search: `?title=${encodeURIComponent(title)}`,
          }}
          className="text-sm font-semibold hover:opacity-50"
          style={{ color: '#0069FF' }}
        >
          오디오 북
        </Link>
        <Link
          to={{
            pathname: `/summary-main/${id}`,
            search: `?title=${encodeURIComponent(title)}`,
          }}
          className="text-sm font-semibold hover:opacity-50"
          style={{ color: '#0069FF' }}
        >
          상세보기
        </Link>
      </div>
    </div>
  )
}

export default Card
