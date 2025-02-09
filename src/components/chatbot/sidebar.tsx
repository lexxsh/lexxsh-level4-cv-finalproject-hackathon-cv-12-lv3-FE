import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '@/assets/friend.svg'
import Header2 from '@/assets/text.svg'
import New from '@/assets/sidebar/Frame1.svg'
import Sum from '@/assets/sidebar/Frame2.svg'
import Audio from '@/assets/sidebar/Frame3.svg'
import HisUP from '@/assets/sidebar/Frame4.svg'
import HisDown from '@/assets/sidebar/Frame5.svg'
import axios from 'axios'

const Sidebar = () => {
  // HisUP 클릭 상태
  const [isHisUp, setIsHisUp] = useState(false)
  // 클릭된 히스토리 상태
  const [activeItem, setActiveItem] = useState(null)
  const [historyList, setHistoryList] = useState([])

  const toggleHisUp = () => {
    setIsHisUp(!isHisUp) // 상태 토글
  }

  const handleItemClick = (index) => {
    setActiveItem(index) // 클릭된 항목의 인덱스를 상태로 저장
  }
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.post('http://localhost:8003/pdf/get_users_hist', {
          user_id: 'admin',
          pdf_id: 0,
        })
        console.log(response)
        // 받아온 데이터를 historyList에 저장
        if (response.data) {
          const formattedHistory = Object.entries(response.data.data).map(([key, item]) => ({
            id: Number(key), // key를 숫자로 변환하여 id로 사용
            paperId: item.paper_id, // paper_id 따로 저장
            title: item.title, // 제목 저장
          }))
          setHistoryList(formattedHistory)
        }
      } catch (err) {
        console.log('Failed to fetch history.')
      }
    }

    fetchHistory()
  }, [])

  return (
    <div className="w-100 flex select-none flex-row bg-gray-100 text-black md:w-64 md:flex-col">
      {/* 헤더 */}
      <Link to="/">
        <div className="flex items-center justify-center border-b border-gray-200 p-4">
          <img src={Header} alt="Header" className="h-10 w-10" />
          <img src={Header2} alt="Header" className="ml-2 mt-0 h-10 w-[150px]" />
        </div>
      </Link>

      {/* 메뉴 */}
      <div className="mt-3">
        <Link to="/upload">
          <div className="cursor-pointer transition-colors hover:bg-gray-200">
            <img src={New} alt="New" />
          </div>
        </Link>
        <Link to="/summary">
          <div className="cursor-pointer transition-colors hover:bg-gray-200">
            <img src={Sum} alt="Sum" />
          </div>
        </Link>

        {/* HisUP / HisDOWN */}
        <div onClick={toggleHisUp} className="cursor-pointer transition-all hover:bg-gray-200">
          <img src={isHisUp ? HisDown : HisUP} alt="History Toggle" />
        </div>

        {/* 히스토리 리스트 */}
        {isHisUp && (
          <div className="mt-0 pl-[1.7rem]">
            <div className="max-h-[500px] max-w-[200px] overflow-y-auto">
              {historyList.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(index)}
                  className={`cursor-pointer truncate p-2 text-base text-[#475569] transition-colors hover:opacity-50
                    ${
                      activeItem === index
                        ? 'border-l-2 border-[#4F46E5] pl-3'
                        : 'border-l-2 border-gray-200 pl-3'
                    }`}
                >
                  <Link to={`/chat/${item.paperId}`} className="block w-full truncate">
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
