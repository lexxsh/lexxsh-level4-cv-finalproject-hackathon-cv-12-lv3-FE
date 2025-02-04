import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '@/assets/sidebar/header.png'
import New from '@/assets/sidebar/Frame1.svg'
import Sum from '@/assets/sidebar/Frame2.svg'
import Audio from '@/assets/sidebar/Frame3.svg'
import HisUP from '@/assets/sidebar/Frame4.svg'
import HisDown from '@/assets/sidebar/Frame5.svg'

const Sidebar = () => {
  // HisUP 클릭 상태
  const [isHisUp, setIsHisUp] = useState(false)
  // 클릭된 히스토리 상태
  const [activeItem, setActiveItem] = useState(null)

  // 히스토리 리스트
  const historyList = [
    'Attention All You Need',
    'Observation of a new boson at a mass of 125 GeV with the',
    '뉴턴의〈물체의 궤도 운동에 관하여〉에 대한 고찰',
    '빛의 이중성',
  ]

  const toggleHisUp = () => {
    setIsHisUp(!isHisUp) // 상태 토글
  }
  const handleItemClick = (index) => {
    setActiveItem(index) // 클릭된 항목의 인덱스를 상태로 저장
  }

  return (
    <div className="w-64 select-none bg-gray-100 text-black max-md:w-[32rem]">
      {/* 헤더 */}
      <div className="border-b border-gray-200 p-5">
        <img src={Header} alt="Header" />
      </div>

      {/* 메뉴 */}
      <div className=" mt-3">
        <div className="cursor-pointer transition-colors hover:bg-gray-200">
          <img src={New} alt="New" />
        </div>
        <div className="cursor-pointer transition-colors hover:bg-gray-200">
          <img src={Sum} alt="Sum" />
        </div>
        <div className="cursor-pointer transition-colors hover:bg-gray-200">
          <img src={Audio} alt="Audio" />
        </div>

        {/* HisUP / HisDOWN */}
        <div onClick={toggleHisUp} className="cursor-pointer transition-all hover:bg-gray-200">
          <img src={isHisUp ? HisDown : HisUP} alt="History Toggle" />
        </div>

        {/* 히스토리 리스트 */}
        {isHisUp && (
          <div className="mt-0 pl-[1.7rem] ">
            <ul>
              {historyList.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleItemClick(index)}
                  className={`cursor-pointer truncate p-2 text-base text-[#475569] transition-colors hover:opacity-50
                    ${
                      activeItem === index
                        ? 'border-l-2 border-[#4F46E5] pl-3'
                        : 'border-l-2 border-gray-200 pl-3'
                    }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
