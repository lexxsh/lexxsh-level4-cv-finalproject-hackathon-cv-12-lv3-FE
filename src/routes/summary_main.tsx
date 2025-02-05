import Header from '@/components/chatbot/chatbot_header'
import Sidebar from '@/components/chatbot/sidebar'
import React, { useEffect, useState } from 'react'
import Img from '@/assets/summary/image 12.png'
import Img1 from '@/assets/summary/1 921.png'
import Img2 from '@/assets/summary/2 3.png'
import Img3 from '@/assets/summary/123.png'
import { marked } from 'marked'
import LoadMap from '@/components/summary/timeline'

const SummaryMain = () => {
  const [activeSection, setActiveSection] = useState('')

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
    { id: 'benchmark', title: '벤치마크', icon: '📊' },
  ]

  const benchmarkData = `
  | Model | Accuracy | F1 Score | Training Time |
  |-------|----------|-----------|--------------|
  | MemGPT-Small | 92.3% | 0.91 | 2.5h |
  | MemGPT-Base | 94.7% | 0.93 | 4.2h |
  | MemGPT-Large | 96.1% | 0.95 | 8.7h |
  `

  return (
    <div className="flex min-h-screen flex-col bg-white md:flex-row">
      <div className="flex justify-center md:justify-start">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <Header title="요약" />
        <div className="flex">
          {/* 왼쪽 컨텐츠 영역 */}
          <div className="mx-auto max-w-5xl flex-1 rounded-lg bg-white p-6">
            {/* 제목 */}
            <h1 className="text-3xl font-bold text-gray-800">
              MemGPT: Towards LLMs as Operating Systems
            </h1>
            <div className="mt-2 flex gap-2 text-base font-normal text-[#0069FF]">
              <span className="rounded-lg bg-[#E0F7FF] px-3 py-1">#컴퓨터과학</span>
              <span className="rounded-lg bg-[#E0F7FF] px-3 py-1">#NLP</span>
              <span className="rounded-lg bg-[#E0F7FF] px-3 py-1">#심층학습</span>
            </div>

            {/* 요약 섹션 */}
            <h2 id="summary" className="mt-6 text-2xl font-semibold">
              한눈에 보는 요약
            </h2>
            <div className="mt-2 rounded-lg border p-4">
              <img src={Img} alt="MemGPT Diagram" className="w-full rounded" />
            </div>

            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              대규모 언어 모델(LLM)은 AI에 혁명을 일으켰지만 제한된 컨텍스트 창에 의해 제약을 받아
              확장된 대화 및 문서 분석과 같은 작업에서의 유용성이 방해를 받습니다. 제한된 컨텍스트
              창을 넘어 컨텍스트를 사용할 수 있도록 하기 위해, 물리적 메모리와 디스크 간의 페이징을
              통해 확장된 가상 메모리의 환상을 제공하는 기존 운영 체제의 계층적 메모리 시스템에서
              영감을 얻은 기술인 가상 컨텍스트 관리를 제안합니다. 이 기술을 사용하여 LLM의 제한된
              컨텍스트 창 내에서 확장된 컨텍스트를 효과적으로 제공하기 위해 다양한 스토리지 계층을
              지능적으로 관리하는 시스템인 MemGPT(MemoryGPT)를 소개합니다. 최신 LLM의 제한된
              컨텍스트 창이 성능을 심각하게 저하시키는 두 가지 도메인에서 OS에서 영감을 받은
              디자인을 평가합니다. MemGPT가 기본 LLM의 컨텍스트 창을 훨씬 초과하는 대규모 문서를
              분석할 수 있는 문서 분석과 MemGPT가 사용자와의 장기적인 상호 작용을 통해 동적으로
              기억하고, 반영하고, 진화하는 대화 에이전트를 만들 수 있는 다중 세션 채팅입니다. 저희는
              https://research.memgpt.ai에서 실험에 사용된 MemGPT 코드와 데이터를 공개합니다.
            </p>

            {/* 연구 분야 */}
            <h2 id="research" className="mt-6 flex items-center text-xl font-semibold">
              📚 연구 분야
            </h2>
            <ul className="mt-2 list-inside list-disc text-lg text-gray-700">
              <li>컴퓨터 과학 &gt; 자연어 처리 &gt; 문서 요약</li>
              <li>인공지능 &gt; 기계 학습 &gt; 심층 학습</li>
            </ul>

            {/* 방법론 */}
            <h2 id="methodology" className="mt-6 flex items-center text-xl font-semibold">
              🔬 방법론
            </h2>
            <ul className="mt-2 list-inside list-disc text-lg text-gray-700">
              <li>데이터 전처리: 불용어 제거 및 TF-IDF 기반 특성 추출</li>
              <li>모델 설계: LSTM과 Attention Mechanism을 활용한 시퀀스 모델링</li>
              <li>모델 학습: Adam 옵티마이저와 하이퍼파라미터 최적화</li>
            </ul>

            {/* 결과 */}
            <h2 id="results" className="mt-6 flex scroll-mt-20 items-center text-xl font-semibold">
              🏆 결과
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              Adam 옵티마이저를 이용한 모델 최적화로 성능 향상을 달성하였습니다.
            </p>

            {/* 타임라인 섹션 */}
            <h2 id="timeline" className="mt-8 flex scroll-mt-20 items-center text-xl font-semibold">
              ⏳ 키워드별 타임라인
            </h2>
            <div className="mt-4 rounded-lg border p-4">
              <LoadMap />
              <p className="mt-2 text-center text-base text-gray-600">
                MemGPT 연구의 주요 키워드 및 이벤트 타임라인
              </p>
            </div>

            {/* Figures 섹션 */}
            <h2 id="figures" className="mt-8 flex scroll-mt-20 items-center text-xl font-semibold">
              🖼️ Figure 알아보기
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <img src={Img1} alt="Figure 1" className="w-full rounded" />
                <p className="mt-2 text-base text-gray-600">
                  <strong>Figure 1.</strong> MemGPT의 메모리 관리 아키텍처. 물리적 메모리와 가상
                  메모리 간의 페이징 시스템을 보여줍니다.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <img src={Img2} alt="Figure 2" className="w-full rounded" />
                <p className="mt-2 text-base text-gray-600">
                  <strong>Figure 2.</strong> 메모리 접근 패턴 분석. 다양한 작업에서의 메모리
                  사용량과 접근 패턴을 시각화했습니다.
                </p>
              </div>
            </div>

            {/* 벤치마크 섹션 */}
            <h2
              id="benchmark"
              className="mt-8 flex scroll-mt-20 items-center text-xl font-semibold"
            >
              📊 벤치마크
            </h2>
            <div className="mt-4 overflow-x-auto">
              <div className="prose max-w-none text-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked(benchmarkData),
                  }}
                />
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
