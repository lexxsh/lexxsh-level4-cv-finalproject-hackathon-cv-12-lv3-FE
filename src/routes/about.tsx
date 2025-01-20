import { Article } from '@/components/article'
import { Layout } from '@/components/layout'
import Img from './image/2.jpg'
function AboutPage() {
  return (
    <Layout>
      <Article title="About" imageAlt="Focus" imageSrc={Img}>
        <p>
          저희 서비스에 대해 자세하게 알고 싶으시면 노션 페이지를 방문해주세요 😮‍💨
          <a href="https://debonair-grenadilla-fed.notion.site/80673edd4ddc45d9951eeabf8bc5adb4?pvs=4">
            @Lexxsh
          </a>{' '}
          <a href="https://www.instagram.com/lex__xsh/">@instagram</a>!
        </p>
        <p>
          AI - M은 AI를 활용한 면접 코칭 서비스이자 로그인 없이 누구나 사용가능합니다. 모의 면접을
          진행가능하며 추후 문제집도 도입예정입니다.
        </p>
        <p>🌟찾아주셔서 감사합니다🌟</p>
      </Article>
    </Layout>
  )
}

export default AboutPage
