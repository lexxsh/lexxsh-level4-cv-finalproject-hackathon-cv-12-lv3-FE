import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '@/components/Card_box/card'
import Sidebar from '@/components/chatbot/sidebar'
import Header from '@/components/chatbot/chatbot_header'
import Pagination from 'react-js-pagination'
import '@/assets/summary/pagination.css'
import { ToastManager } from '@/components/Loading/loading'
import { BarLoader } from 'react-spinners'
const Summary = () => {
  const [page, setPage] = useState(1)
  const [curCardList, setCurCardList] = useState<any[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [pdfId, setPdfId] = useState<string | null>(null)
  const [summaryInfo, setSummaryInfo] = useState<any>(null) // get_all_summary_info 결과 저장
  const [audioData, setAudioData] = useState<string | null>(null) // 🎵 오디오 데이터 상태
  const [loading, setLoading] = useState(true)
  const itemPerPage = 10
  const indexOfLastCard = page * itemPerPage
  const indexOfFirstCard = indexOfLastCard - itemPerPage

  const handleChangePage = (page) => {
    setPage(page)
  }

  useEffect(() => {
    // content 안에 있는 모든 json_data에서 데이터를 가져옵니다.
    const extractCardData = () => {
      const cardList = summaryInfo?.content?.map((item, index) => {
        const data = item.json_data // content 안의 json_data 추출
        const files = item.files
        const longSummary = data?.paper_info?.long_summary || ''
        const getDescriptionFromLongSummary = (longSummary) => {
          // "연구 분야:" 이후의 내용을 추출
          const regex = /연구 분야:\s*[-]?\s*(.*)/ // "연구 분야:" 이후의 텍스트를 추출하는 정규식
          const match = longSummary.match(regex)
          if (match) {
            // 연구분야 텍스트에서 "-" 이후의 항목을 추출
            const description = match[1].trim()
            return description
          }
          return '' // "연구 분야:"가 없으면 빈 문자열 반환
        }

        const description = getDescriptionFromLongSummary(longSummary)
        return {
          id: index + 1, // id는 1부터 시작
          tags: data?.tags.slice(0, 2) || [], // tags
          title: data?.paper_info?.title || '제목 없음', // title
          description: description || '연구분야 정보를 찾을 수 없습니다.', // 기본 description 설정
          image: files?.thumbnail || '', // 첫 번째 이미지 url로 설정
          paperid: data?.paper_info?.paper_id,
        }
      })
      setCurCardList(cardList.slice(indexOfFirstCard, indexOfLastCard)) // 페이지에 맞게 카드 리스트 슬라이싱
      setLoading(false)
    }

    if (summaryInfo?.content) {
      extractCardData()
    }
  }, [page, summaryInfo]) // page와 summaryInfo가 변경될 때마다 호출

  // 📌 PDF ID 가져오기 + 이후 summary info 요청
  useEffect(() => {
    const fetchPdfId = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/pdf/get_summary_pdf_id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pdf_id: 0, user_id: 'admin' }),
        })

        if (!response.ok) throw new Error('Failed to fetch PDF ID')

        const data = await response.json()
        if (data.success) {
          setPdfId(data.data.paper_ids)
          fetchSummaryInfo(data.data.paper_ids) // 📌 PDF ID를 사용해 추가 API 호출
        } else {
          setMessage(data.message || 'PDF ID를 찾을 수 없습니다.')
        }
      } catch (error) {
        setMessage('PDF ID를 불러오지 못했습니다.')
        console.error(error)
      }
    }

    const fetchSummaryInfo = async (pdfId) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/pdf/get_all_summary_info/head', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: 'admin', pdf_ids: pdfId }),
        })

        if (!response.ok) throw new Error('Failed to fetch summary info')

        const data = await response.json()
        console.log(data)
        if (data) {
          setSummaryInfo(data)
        } else {
          setMessage(data.message || 'Summary 정보를 가져올 수 없습니다.')
        }
      } catch (error) {
        setMessage('Summary 정보를 불러오지 못했습니다.')
        console.error(error)
      }
    }

    fetchPdfId()
  }, []) // 페이지가 처음 렌더링될 때 실행

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F9] md:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header title="요약" />

        {/* 로딩 상태 확인 후 로딩 표시 */}
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <BarLoader size={50} color="#3498db" loading={loading} />
          </div>
        ) : (
          <>
            <div className="mt-4 flex flex-wrap justify-center gap-8 overflow-auto p-4">
              {curCardList.map((card) => (
                <Card
                  key={card.id}
                  tags={card.tags}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  id={card.paperid}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Pagination
                activePage={page}
                itemsCountPerPage={itemPerPage}
                totalItemsCount={summaryInfo?.content?.length || 0}
                pageRangeDisplayed={5}
                prevPageText={'<'}
                nextPageText={'>'}
                onChange={handleChangePage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default Summary
