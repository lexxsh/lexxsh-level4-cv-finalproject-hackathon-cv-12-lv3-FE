import { useEffect, useState } from 'react'
import { Hero, HeroIllustration } from '@/components/hero'
import { Layout } from '@/components/layout'

export default function HomePage() {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage(data.message)
        } else {
          setMessage('데이터를 불러오는 데 실패했습니다.')
        }
      })
      .catch(() => setMessage('서버 요청 중 오류 발생'))
  }, [])

  return (
    <Layout>
      <Hero
        title={
          <>
            <span style={{ lineHeight: '1.5', display: 'block' }}>새로운 PDF 분석 서비스</span>
            <span style={{ lineHeight: '1.5', display: 'block' }}>SumarAI</span>
          </>
        }
        content={
          <>
            <span style={{ lineHeight: '1.5', display: 'block' }}>우리는 최고다!</span>
            <span
              style={{ lineHeight: '1.5', display: 'block', marginTop: '10px', color: 'blue' }}
            ></span>
          </>
        }
        illustration={<HeroIllustration />}
      />
    </Layout>
  )
}
