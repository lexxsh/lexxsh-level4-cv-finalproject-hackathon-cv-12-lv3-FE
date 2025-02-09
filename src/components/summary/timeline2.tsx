import React from 'react'

const TimelineSection = ({ timelineData }) => {
  if (!timelineData) return null

  return (
    <div className="mt-8 space-y-8">
      {Object.entries(timelineData).map(([topic, papers]) => (
        <div key={topic} className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">{topic}</h3>
          <div className="relative space-y-8">
            {/* Vertical line */}
            <div className="bg-blue-200 absolute left-8 top-0 h-full w-0.5" />

            {papers.map((paper, index) => (
              <div key={paper.id} className="relative flex gap-6">
                {/* Timeline dot */}
                <div className="absolute left-8 -translate-x-1/2 transform">
                  <div className="flex h-4 w-4 items-center justify-center">
                    <div className="bg-blue-500 h-4 w-4 rounded-full" />
                  </div>
                </div>

                {/* Content */}
                <div className="ml-12 flex-grow rounded-lg bg-gray-50 p-4">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-lg font-medium text-gray-900">{paper['논문 제목']}</h4>
                    <span className="text-sm text-gray-500">{paper['출판 연도']}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">저자: {paper['저자']}</p>
                  <p className="mt-1 text-sm text-gray-600">{paper['논문 요약']}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs">
                      난이도: {paper['난이도']}
                    </span>
                    <span className="bg-green-100 text-green-800 line-clamp-1 rounded-full px-3 py-1 text-xs">
                      추천 이유: {paper['추천 이유']}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimelineSection
