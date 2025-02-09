import Header from '@/components/chatbot/chatbot_header'
import Sidebar from '@/components/chatbot/sidebar'
import React, { useEffect, useState } from 'react'
import Img from '@/assets/summary/image 12.png'
import Img1 from '@/assets/summary/1 921.png'
import Img2 from '@/assets/summary/2 3.png'
import Img3 from '@/assets/summary/123.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { marked } from 'marked'
import LoadMap from '@/components/summary/timeline'
import { useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import TimelineSection from '@/components/summary/timeline2'

const LoadingSpinner = () => (
  <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-white">
    <div className="relative h-20 w-20">
      {/* 그라데이션과 회전 애니메이션 */}
      <div className="absolute h-full w-full animate-spin rounded-full border-8 border-transparent bg-gradient-to-r from-[#0069FF] via-[#00B5FF] to-[#E0F7FF]"></div>
      {/* 투명한 그라데이션과 반짝임 효과 */}
      <div className="absolute h-full w-full animate-pulse rounded-full border-8 border-[#E0F7FF] opacity-20"></div>
    </div>
    <p className="mt-4 text-lg text-[#4B5563]">논문 데이터를 분석하고 있습니다...</p>
  </div>
)

const SummaryMain = () => {
  const [activeSection, setActiveSection] = useState('')
  const { fileId } = useParams()
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const title = queryParams.get('title')?.replace(/\.pdf$/, '')
  const [preTagsSummary, setPreTagsSummary] = useState('')
  const [postTagsSummary, setPostTagsSummary] = useState('')
  const [tags, setTags] = useState([])
  const [ResearchField, setResearchField] = useState('')
  const [Methodology, setMethodology] = useState('')
  const [Result, setextractResult] = useState('')
  const [topics, setTopics] = useState([])
  const [timelineData, setTimelineData] = useState(null)
  const [figures, setFigures] = useState([])
  const [benchmarkTables, setBenchmarkTables] = useState([])
  const [expandedIndex, setExpandedIndex] = useState(null)
  // Scroll event to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['research', 'methodology', 'results', 'timeline', 'figures', 'benchmark']

      let currentSection = ''
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if the section is within the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = sectionId
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  const navigationItems = [
    { id: 'summary', title: '한눈에 보는 요약', icon: '📝' },
    { id: 'research', title: '연구 분야', icon: '📚' },
    { id: 'methodology', title: '방법론', icon: '🔬' },
    { id: 'results', title: '결과', icon: '🏆' },
    { id: 'timeline', title: '타임라인', icon: '⏳' },
    { id: 'figures', title: 'Figure 알아보기', icon: '🖼️' },
    { id: 'benchmark', title: '테이블로 보는 벤치마크', icon: '📊' },
  ]

  const splitSummaryByTag = (longSummary) => {
    const tagIndex = longSummary.indexOf('중요 태그:')
    if (tagIndex !== -1) {
      const preTags = longSummary.slice(0, tagIndex).trim()
      const postTags = longSummary.slice(tagIndex).trim()
      return { preTags, postTags }
    }
    return { preTags: longSummary, postTags: '' }
  }
  const extractResearchField = (text) => {
    const researchFieldMatch = text.match(/📚 연구 분야:\s*([\s\S]+?)(?=\n🛠 방법|$)/)
    return researchFieldMatch ? researchFieldMatch[1].trim() : ''
  }

  const extractMethodology = (text) => {
    const methodologyMatch = text.match(/🛠 방법론:\s*([\s\S]+?)(?=\n🔬 주요|$)/)
    return methodologyMatch ? methodologyMatch[1].trim() : ''
  }

  const extractResult = (text) => {
    const ReusltMatch = text.match(/🔬 주요 발견:\s*([\s\S]+?)(?=\n🎯 응용 분야|$)/)
    return ReusltMatch ? ReusltMatch[1].trim() : ''
  }
  const fetchData = async () => {
    try {
      const pdfId = fileId
      const userId = 'admin'

      const apiEndpoints = {
        figures: 'http://127.0.0.1:8003/pdf/get_figure',
        summary: 'http://127.0.0.1:8003/pdf/get_summary',
        tags: 'http://127.0.0.1:8003/pdf/get_tags',
        tables: 'http://127.0.0.1:8003/pdf/get_table',
        timeline: 'http://127.0.0.1:8003/pdf/get_timeline',
      }

      const requestBody = {
        pdf_id: pdfId,
        user_id: userId,
      }

      const apiCalls = Object.entries(apiEndpoints).map(([key, url]) =>
        axios
          .post(url, requestBody)
          .then((response) => ({ key, data: response.data }))
          .catch((error) => ({ key, error })),
      )

      const results = await Promise.all(apiCalls)

      results.forEach(({ key, data, error }) => {
        if (error) {
          console.error(`Error fetching ${key}:`, error)
          return
        }

        switch (key) {
          case 'figures':
            console.log(data.figures)
            setFigures(data.figures)
            break
          case 'summary':
            const longSummary = data.data.long_summary
            const splitSummary = splitSummaryByTag(longSummary)
            setPreTagsSummary(splitSummary.preTags)
            setPostTagsSummary(splitSummary.postTags)
            setResearchField(extractResearchField(splitSummary.postTags))
            setMethodology(extractMethodology(splitSummary.postTags))
            setextractResult(extractResult(splitSummary.postTags))
            break
          case 'tags':
            setTags(data.data.tag_text)
            break
          case 'tables':
            setBenchmarkTables(data.data.tables)
            break
          case 'timeline':
            const titles = Object.keys(data)
            setTopics(titles)
            setTimelineData(data)
            break
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white md:flex-row">
        <div className="flex justify-center md:justify-start">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col">
          <Header title="요약" />
          <LoadingSpinner />
        </div>
      </div>
    )
  }
  return (
    <div className="flex min-h-screen flex-col bg-white md:flex-row">
      <div className="flex justify-center md:justify-start">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <Header title="요약" />
        <div className="flex">
          {/* 왼쪽 컨텐츠 영역 */}
          <div className="mx-auto max-w-4xl flex-1 rounded-lg bg-white p-6">
            {/* 제목 */}
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            <div className="mt-2 flex gap-2 text-base font-normal text-[#0069FF]">
              {tags.map((tag, index) => (
                <span key={index} className="rounded-lg bg-[#E0F7FF] px-3 py-1">
                  #{tag}
                </span>
              ))}
            </div>

            {/* 요약 섹션 */}
            <h2 id="summary" className="mt-6 text-2xl font-semibold">
              한눈에 보는 요약
            </h2>
            <div className="mt-2 rounded-lg border p-4">
              {figures.length > 0 && (
                <img
                  src={`data:image/png;base64,${figures[0].image}`}
                  alt={`Figure ${figures[0].figure_number}`}
                  className="max-h-[400px] w-full rounded object-contain"
                />
              )}
            </div>

            <p
              className="mt-4 text-lg leading-relaxed text-gray-700"
              style={{ whiteSpace: 'pre-line' }}
            >
              {preTagsSummary}
            </p>

            {/* 연구 분야 */}
            <h2 id="research" className="mt-6 flex items-center text-xl font-semibold">
              📚 연구 분야
            </h2>
            <ul className="mt-2 list-inside list-disc text-lg text-gray-700">{ResearchField}</ul>

            {/* 방법론 */}
            <h2 id="methodology" className="mt-6 flex items-center text-xl font-semibold">
              🔬 방법론
            </h2>
            <ul
              className="mt-2 list-inside list-disc text-lg text-gray-700 "
              style={{ whiteSpace: 'pre-line' }}
            >
              {Methodology}
            </ul>

            {/* 결과 */}
            <h2
              id="results"
              className="mt-6 flex scroll-mt-20 items-center text-xl font-semibold"
              style={{ whiteSpace: 'pre-line' }}
            >
              🏆 결과
            </h2>
            <p className="mt-2 text-lg text-gray-700" style={{ whiteSpace: 'pre-line' }}>
              {Result}
            </p>

            {/* 타임라인 섹션 */}
            <h2 id="timeline" className="mt-8 flex scroll-mt-20 items-center text-xl font-semibold">
              ⏳ 키워드별 타임라인
            </h2>
            <div className="mt-4 rounded-lg border p-4">
              <LoadMap title={title} topics={topics} />
              <p className="mt-2 text-center text-base text-gray-600">
                {title} 연구의 주요 키워드 및 이벤트 타임라인
              </p>
              {/* 타임라인 내용 표시 */}
              <div className="mt-4 space-y-6">
                {timelineData && Object.keys(timelineData).length > 0 ? (
                  Object.keys(timelineData).map((keyword, index) => {
                    const timelineItems = timelineData[keyword]
                    return (
                      <div key={index} className="border-t pt-4">
                        <h3 className="mb-2 text-lg font-semibold " style={{ color: '#1D4ED8' }}>
                          {keyword}
                        </h3>
                        <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2  lg:grid-cols-3">
                          {timelineItems.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex flex-col rounded-lg border bg-gray-50 p-4"
                            >
                              <h4 className="text-md mb-2 font-semibold text-gray-800">
                                {item['논문 제목']}
                              </h4>
                              <p className="text-sm text-gray-600">
                                저자: {item['저자'] || '정보 없음'}
                              </p>
                              <p className="text-sm text-gray-600">
                                출판 연도: {item['출판 연도']}
                              </p>
                              <br />
                              <p className="text-sm text-gray-600">
                                추천 이유: {item['추천 이유']}
                              </p>
                              <p className="mt-2 text-sm text-gray-500">{item['논문 요약']}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p>타임라인 데이터가 없습니다.</p>
                )}
              </div>
            </div>
            {/* Figures 섹션 */}
            <h2 id="figures" className="mt-8 scroll-mt-20 text-xl font-semibold">
              🖼️ Figure 알아보기
            </h2>

            {/* 세로 리스트 배치 */}
            <div className="mt-4 flex flex-col space-y-6">
              {figures.map((figure, index) => {
                const isExpanded = expandedIndex === index
                return (
                  <div key={index} className="w-full rounded-lg border p-4">
                    {/* Base64 이미지 표시 */}
                    <img
                      src={`data:image/png;base64,${figure.image}`}
                      alt={`Figure ${figure.figure_number}`}
                      className="max-h-[500px] w-full rounded object-contain"
                    />

                    {figure.caption_image && (
                      <img
                        src={`data:image/png;base64,${figure.caption_image}`}
                        alt={`Caption Figure ${figure.table_number}`}
                        className="mt-2 max-h-[100px] w-full rounded object-contain"
                      />
                    )}

                    {/* Description 설명 (기본 3줄 제한) */}
                    {figure.description && (
                      <p
                        className={`mt-2 text-base text-gray-600 ${
                          !isExpanded ? 'line-clamp-3' : ''
                        }`}
                        style={{ whiteSpace: 'pre-line' }}
                      >
                        <strong>Description:</strong> {figure.description}
                      </p>
                    )}

                    {/* "더보기" 버튼 */}
                    {(figure.caption_info.length > 100 || figure.description?.length > 100) && (
                      <div className="flex justify-end">
                        <button
                          className="rounded-lg px-4 py-2 text-sm font-semibold text-white  transition duration-300 
                                   focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: '#3B82F6', // 기본 배경색
                            borderColor: '#3B82F6',
                          }}
                          onMouseEnter={(e) => (e.target.style.backgroundColor = '#2563EB')} // 호버 시 색상 변경
                          onMouseLeave={(e) => (e.target.style.backgroundColor = '#3B82F6')} // 원래 색상 복귀
                          onFocus={(e) => (e.target.style.boxShadow = '0 0 8px #60A5FA')} // 포커스 효과
                          onBlur={(e) =>
                            (e.target.style.boxShadow = '0 4px 6px rgba(59, 130, 246, 0.2)')
                          } // 포커스 해제 시 원래 그림자 복귀
                          onClick={() => toggleExpand(index)}
                        >
                          {isExpanded ? '접기 ▲' : '더보기 ▼'}
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* 벤치마크 섹션 */}
            <h2
              id="benchmark"
              className="mt-8 flex scroll-mt-20 items-center text-xl font-semibold"
            >
              📊 테이블로 보는 벤치마크
            </h2>
            <div className="mt-4 overflow-x-auto">
              <div className="prose max-w-none text-lg">
                {benchmarkTables.map((table, index) => (
                  <div key={index} className="mb-4 w-full rounded-lg border p-4">
                    {/* 기본 이미지 */}

                    <img
                      src={`data:image/png;base64,${table.image}`}
                      alt={`Figure ${table.table_number}`}
                      className="max-h-[300px] w-full rounded object-contain"
                    />
                    {/* 캡션 이미지 (옵션) */}
                    {table.caption_image && (
                      <img
                        src={`data:image/png;base64,${table.caption_image}`}
                        alt={`Caption Figure ${table.table_number}`}
                        className="mt-2 max-h-[100px] w-full rounded object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽 네비게이션 영역 */}
          <div className="sticky right-5 top-[50%] ml-6 hidden h-fit w-64 -translate-y-[50%] transform rounded-lg bg-white p-6 shadow-md transition-all duration-300 lg:block">
            <div className="mb-4 flex items-center">
              <h2 className="text-lg font-semibold text-gray-800">📌 목차</h2>
              <div className="text-s ml-auto text-gray-500">{navigationItems.length} sections</div>
            </div>
            <nav className="space-y-1">
              {navigationItems.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex items-center rounded-lg px-4 py-2 text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-[#0069FF]"
                >
                  <span className="mr-2 transition-transform duration-200 group-hover:scale-110">
                    {section.icon}
                  </span>
                  <span className="text-sm">{section.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryMain
