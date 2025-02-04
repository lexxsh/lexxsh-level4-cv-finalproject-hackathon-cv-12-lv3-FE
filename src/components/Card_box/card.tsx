import React from 'react'
import Img from '@/assets/summary/page_3_img_1.png'

const Card = () => {
  return (
    <div className="flex h-[20rem] w-[12rem] flex-col rounded-2xl border bg-white p-4 shadow">
      {/* 이미지 섹션 (고정 크기) */}
      <div className="h-[8rem] w-full">
        <img src={Img} alt="Preview" className="h-full w-full rounded-lg object-cover" />
      </div>

      {/* 태그 섹션 */}
      <div className="mt-3 flex flex-col gap-2">
        <span className="w-fit whitespace-nowrap rounded-md bg-[rgba(153,197,255,0.25)] px-2 py-1 text-sm font-medium text-[#0069FF]">
          #Transformer
        </span>
        <span className="w-fit whitespace-nowrap rounded-md bg-[rgba(153,197,255,0.25)] px-2 py-1 text-sm font-medium text-[#0069FF]">
          #RNN
        </span>
      </div>

      {/* 텍스트 섹션 */}
      <p className="text-m mt-2 line-clamp-2 text-gray-700">Attention ALL YOU NEED</p>
      <p className="mt-1 line-clamp-1 text-sm text-gray-400">인공지능 - 기계 학습</p>
    </div>
  )
}

export default Card
