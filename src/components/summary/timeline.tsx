import React from 'react'

const COLORS = [
  { color: '#38A169', border: '#38A169' }, // green-500
  { color: '#3B82F6', border: '#3B82F6' }, // blue-500
  { color: '#3B82F6', border: '#3B82F6' }, // blue-500
  { color: '#EC4899', border: '#EC4899' }, // pink-500
]

export default function MindMap({ title = 'Paper', topics = [] }) {
  // topics 배열을 data 형식으로 변환
  const data = topics.slice(0, 4).map((topic, index) => ({
    id: index + 1,
    title: topic,
    ...COLORS[index],
  }))

  return (
    <div className="flex h-[25rem] w-full items-center justify-center">
      {' '}
      {/* 바깥 공백을 줄였습니다. */}
      <div className="relative flex h-2/3 w-2/3 items-center justify-center">
        <div className="relative flex h-full w-full items-center justify-center">
          {/* 첫 번째 원 (중앙 제목) */}
          <div
            className="absolute z-10 flex h-28 w-28 items-center justify-center rounded-full border-4 border-gray-500 bg-white text-center text-lg font-bold shadow-lg"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Paper
          </div>

          {/* 두 번째 흰색 원 (겹쳐짐) */}
          <div className="absolute z-0 flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-white"></div>
        </div>

        {/* 수평선 */}
        <div className="absolute top-1/2 h-[1px] w-[60%] -translate-y-1/2 transform bg-gray-500"></div>

        {/* 수직선 */}
        <div className="absolute left-1/2 h-[60%] w-[1px] -translate-x-1/2 transform bg-gray-500"></div>

        {/* 주제 노드 */}
        <div className="absolute grid h-full w-full grid-cols-2 grid-rows-2 gap-[5rem] p-8">
          {' '}
          {/* 주제 노드 간격도 살짝 줄였습니다. */}
          {data.map((item) => (
            <div key={item.id} className="relative flex flex-col items-center">
              <div
                className="flex w-32 items-center justify-center rounded-full border-4 bg-white p-1.5 text-center shadow-lg"
                style={{
                  borderColor: item.border,
                  color: item.color,
                }}
              >
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
