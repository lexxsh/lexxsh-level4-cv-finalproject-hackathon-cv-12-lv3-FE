import { Hero, HeroIllustration } from '@/components/hero'
import { Layout } from '@/components/layout'

export default function HomePage() {
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
          </>
        }
        illustration={<HeroIllustration />}
      />
    </Layout>
  )
}
