import React from 'react'

const data = [
  {
    id: 1,
    title: 'Deep Learning for Natural Language Processing',
    color: '#38A169', // green-500
    border: '#38A169', // green-500
    subItems: [
      { id: 5, title: 'NLP' },
      { id: 6, title: 'Sentiment Analysis' },
      { id: 7, title: 'Machine Translation' },
    ],
  },
  {
    id: 2,
    title: 'Advancements in Reinforcement Learning',
    color: '#3B82F6', // blue-500
    border: '#3B82F6', // blue-500
    subItems: [
      { id: 8, title: 'Reinforcement Learning' },
      { id: 9, title: 'Q-Learning' },
      { id: 10, title: 'Policy Gradient' },
    ],
  },
  {
    id: 3,
    title: 'Quantum Computing and Machine Learning',
    color: '#3B82F6', // blue-500
    border: '#3B82F6', // blue-500
    subItems: [
      { id: 11, title: 'Quantum Computing' },
      { id: 12, title: 'Quantum Machine Learning' },
      { id: 13, title: 'Quantum Algorithms' },
    ],
  },
  {
    id: 4,
    title: 'Computer Vision: Recent Trends',
    color: '#EC4899', // pink-500
    border: '#EC4899', // pink-500
    subItems: [
      { id: 14, title: 'Object Detection' },
      { id: 15, title: 'Image Segmentation' },
      { id: 16, title: 'Classification' },
    ],
  },
]

export default function MindMap() {
  return (
    <div className="flex h-[40rem] w-full items-center justify-center">
      <div className="relative flex h-3/4 w-3/4 items-center justify-center">
        <div className="relative flex h-[40rem] w-full items-center justify-center">
          {/* 첫 번째 원 (Attention ALL YOU NEED) */}
          <div className="absolute z-10 flex h-40 w-40 items-center justify-center rounded-full border-4 border-gray-500 bg-white text-center text-xl font-bold shadow-lg">
            Attention ALL YOU NEED
          </div>

          {/* 두 번째 흰색 원 (겹쳐짐) */}
          <div className="absolute z-0 flex h-60 w-60 items-center justify-center rounded-full border-4 border-white bg-white"></div>
        </div>

        {/* 수평선 */}
        <div className="absolute top-1/2 h-[1px] w-[80%] -translate-y-1/2 transform bg-gray-500"></div>

        {/* 수직선 */}
        <div className="absolute left-1/2 h-[80%] w-[1px] -translate-x-1/2 transform bg-gray-500"></div>
        <div className="absolute grid h-full w-full grid-cols-2 grid-rows-2 gap-[10rem] p-12">
          {data.map((item) => (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Parent Title */}
              <div
                className={`flex w-44 items-center justify-center rounded-full border-4 bg-white p-2 text-center shadow-lg`}
                style={{
                  borderColor: item.border,
                  color: item.color,
                }}
              >
                {item.title}
              </div>

              {/* Sub Items (Row position depending on ID) */}
              {item.id === 1 || item.id === 2 ? (
                // id 1 or 2: Sub items are positioned above in a row
                <div className="absolute top-[-100px] mt-8 flex flex-row gap-10">
                  {item.subItems.map((subItem) => (
                    <div key={subItem.id} className="text-center">
                      <p className={`text-sm font-bold text-gray-500`}>{subItem.title}</p>
                    </div>
                  ))}
                </div>
              ) : (
                // id 3 or 4: Sub items are positioned below in a row
                <div className="absolute top-[150px] mb-0 flex flex-row gap-8">
                  {item.subItems.map((subItem) => (
                    <div key={subItem.id} className="text-center">
                      <p className={`text-sm font-bold text-gray-500`}>{subItem.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
