import React from 'react'

const Card = ({ tags, title, description, image }) => {
  return (
    <div className="flex h-[20rem] w-[12rem] flex-col rounded-2xl border bg-white p-4 shadow">
      {/* 이미지 섹션 (고정 크기) */}
      <div className="h-[8rem] w-full">
        <img
          src={image} // props로 받은 이미지 경로 사용
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
      <p className="text-m mt-2 line-clamp-2 text-gray-700">{title}</p>
      <p className="mt-1 line-clamp-1 text-sm text-gray-400">{description}</p>
    </div>
  )
}

export default Card
