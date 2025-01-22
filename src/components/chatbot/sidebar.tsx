import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UpArrow from '@/assets/uparrow.svg'
import DownArrow from '@/assets/downarrow.svg'

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    chat: false,
    settings: false,
    history: false,
  })

  const handleMenuClick = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  return (
    <div className="w-64 select-none bg-gray-100 text-black max-md:w-[32rem]">
      {/* 헤더 */}
      <div className="border-b border-gray-200 p-4">
        <h1 className="ml-2 text-xl font-bold">🌸SummarAI</h1>
      </div>

      {/* 메뉴 목록 */}
      <div className="p-4">
        <ul className="max-md: flex flex-row justify-evenly space-x-6 md:flex-col md:space-x-0 md:space-y-2">
          {/* 채팅 메뉴 */}
          <li className="mb-2 md:mb-0">
            <div
              className="flex cursor-pointer items-center justify-between hover:text-gray-400"
              onClick={() => handleMenuClick('chat')}
            >
              <span>Home</span>
            </div>
          </li>

          {/* 설정 메뉴 */}
          <li className="mb-2 md:mb-0">
            <div
              className="flex cursor-pointer items-center justify-between hover:text-gray-400"
              onClick={() => handleMenuClick('settings')}
            >
              <span>기능</span>
              <img src={openMenus.settings ? UpArrow : DownArrow} alt="arrow" className="h-4 w-4" />
            </div>
            {openMenus.settings && (
              <ul className="mt-2 pl-4 md:pl-0">
                <li className="mb-2">
                  <Link to="/settings/profile" className="hover:text-gray-400">
                    채팅
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/settings/security" className="hover:text-gray-400">
                    요약
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/settings/security" className="hover:text-gray-400">
                    오디오북
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* 히스토리 메뉴 */}
          <li className="mb-2 md:mb-0">
            <div
              className="flex cursor-pointer items-center justify-between hover:text-gray-400"
              onClick={() => handleMenuClick('history')}
            >
              <span>히스토리</span>
              <img src={openMenus.history ? UpArrow : DownArrow} alt="arrow" className="h-4 w-4" />
            </div>
            {openMenus.history && (
              <ul className="mt-2 pl-4 md:pl-0">
                <li className="mb-2">
                  <Link to="/history/recent" className="hover:text-gray-400">
                    최근 기록
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/history/archived" className="hover:text-gray-400">
                    아카이브
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
