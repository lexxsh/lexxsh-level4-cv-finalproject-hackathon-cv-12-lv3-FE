import React from 'react'
import { Link } from 'react-router-dom' // Link 추가
import { useState, useEffect } from 'react'
import Card from '@/components/Card_box/card'
import Sidebar from '@/components/chatbot/sidebar'
import Header from '@/components/chatbot/chatbot_header'
import Pagination from 'react-js-pagination'
import '@/assets/summary/pagination.css'
import Img1 from '@/assets/summary/page_3_img_1.png'
import Img2 from '@/assets/summary/page_4_img_1.png'
import Img3 from '@/assets/summary/page_4_img_2.png'

const Summary = () => {
  // 예시로 사용할 카드 데이터
  const cards = [
    {
      id: 1,
      tags: ['#Transformer', '#RNN'],
      title: 'Attention ALL YOU NEED',
      description: '인공지능 - 기계 학습',
      image: Img1,
    },
    {
      id: 2,
      tags: ['#GAN', '#CNN'],
      title: 'Generative Adversarial Networks',
      description: '인공지능 - 생성 모델',
      image: Img2,
    },
    {
      id: 3,
      tags: ['#BERT', '#NLP'],
      title: 'Bidirectional Encoder Representations from Transformers',
      description: '인공지능 - 자연어 처리',
      image: Img3,
    },
    {
      id: 4,
      tags: ['#ResNet', '#CNN'],
      title: 'Deep Residual Learning for Image Recognition',
      description: '인공지능 - 이미지 처리',
      image: Img1,
    },
    {
      id: 5,
      tags: ['#LSTM', '#RNN'],
      title: 'Long Short-Term Memory',
      description: '인공지능 - 시계열 분석',
      image: Img2,
    },
    {
      id: 6,
      tags: ['#AutoML', '#ML'],
      title: 'Automated Machine Learning',
      description: '인공지능 - 머신러닝',
      image: Img3,
    },
    {
      id: 7,
      tags: ['#YOLO', '#CV'],
      title: 'You Only Look Once',
      description: '인공지능 - 컴퓨터 비전',
      image: Img1,
    },
    {
      id: 8,
      tags: ['#GPT', '#NLP'],
      title: 'Generative Pre-trained Transformer',
      description: '인공지능 - 자연어 생성',
      image: Img2,
    },
    {
      id: 9,
      tags: ['#VAE', '#GAN'],
      title: 'Variational Autoencoder',
      description: '인공지능 - 생성 모델',
      image: Img3,
    },
    {
      id: 11,
      tags: ['#DQN', '#RL'],
      title: 'Deep Q-Network',
      description: '인공지능 - 강화 학습',
      image: Img1,
    },
    {
      id: 12,
      tags: ['#DQN', '#RL'],
      title: 'Deep Q-Network',
      description: '인공지능 - 강화 학습',
      image: Img1,
    },
    {
      id: 13,
      tags: ['#DQN', '#RL'],
      title: 'Deep Q-Network',
      description: '인공지능 - 강화 학습',
      image: Img1,
    },
    {
      id: 14,
      tags: ['#DQN', '#RL'],
      title: 'Deep Q-Network',
      description: '인공지능 - 강화 학습',
      image: Img1,
    },
    {
      id: 15,
      tags: ['#DQN', '#RL'],
      title: 'Deep Q-Network',
      description: '인공지능 - 강화 학습',
      image: Img1,
    },
  ]

  const [page, setPage] = useState(1)
  const [curCardList, setCurCardList] = useState<any[]>([])

  const itemPerPage = 10
  const indexOfLastCard = page * itemPerPage
  const indexOfFirstCard = indexOfLastCard - itemPerPage

  const handleChangePage = (page) => {
    setPage(page)
  }

  useEffect(() => {
    setCurCardList(cards.slice(indexOfFirstCard, indexOfLastCard))
  }, [page])

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F9] md:flex-row">
      <div className="flex justify-center md:justify-start">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <Header title="요약" />
        <div className="mt-4 flex flex-wrap justify-center gap-8 overflow-auto p-4">
          {curCardList.map((card) => (
            <Card
              key={card.id}
              tags={card.tags}
              title={card.title}
              description={card.description}
              image={card.image}
              id={card.id}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination
            activePage={page}
            itemsCountPerPage={itemPerPage}
            totalItemsCount={cards.length}
            pageRangeDisplayed={5}
            prevPageText={'<'}
            nextPageText={'>'}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  )
}

export default Summary
