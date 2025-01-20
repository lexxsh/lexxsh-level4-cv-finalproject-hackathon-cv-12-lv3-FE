import { Article } from '@/components/article'
import { Layout } from '@/components/layout'
import img from './image/3.jpg'
export default function ContactPage() {
  return (
    <Layout>
      <Article title="Contact" imageAlt="Lorem Picsum" imageSrc={img}>
        Email : john8538@Naver.com <br />
        Phone : 010-8869-2796
        <br /> Name : Lee Sang Hyeok
      </Article>
    </Layout>
  )
}
