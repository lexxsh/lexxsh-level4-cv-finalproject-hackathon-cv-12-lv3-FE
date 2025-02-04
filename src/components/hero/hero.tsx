import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import ScrollReveal from 'scrollreveal'
import { useNavigate } from 'react-router-dom'
type ScrollRevealRefElement = HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement

function Hero({
  className,
  content,
  illustration,
  title,
}: {
  className?: string
  content: string
  illustration?: ReactNode
  title: string
}) {
  const scrollRevealRef = useRef<ScrollRevealRefElement[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    if (scrollRevealRef.current.length > 0) {
      scrollRevealRef.current.map((ref) =>
        ScrollReveal().reveal(ref, {
          duration: 1000,
          distance: '40px',
          easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
          origin: 'top',
          interval: 150,
        }),
      )
    }

    return () => ScrollReveal().destroy()
  }, [])

  const addToScrollRevealRef = (el: ScrollRevealRefElement) => {
    scrollRevealRef.current.push(el)
  }

  const handleNextPage = () => {
    navigate('/upload')
  }
  return (
    <section className={cn('text-center lg:w-full lg:py-20 lg:text-left', className)}>
      <div className="hero mx-auto w-full max-w-6xl px-6">
        <div className="hero-inner relative lg:flex">
          <div className="hero-copy pb-16 pt-10 lg:min-w-[40rem] lg:pr-20 lg:pt-16">
            <div className="mx-auto w-full max-w-3xl">
              <h1
                className="mb-4 mt-0 text-4xl font-semibold md:text-5xl "
                ref={addToScrollRevealRef}
              >
                {title}
              </h1>
              <p
                className="prose prose-xl m-auto mb-[50px] mt-[50px] text-gray-500"
                ref={addToScrollRevealRef}
              >
                {content}
              </p>
            </div>

            <div ref={addToScrollRevealRef}>
              <button
                onClick={handleNextPage}
                type="button"
                className="rounded-[40px] bg-indigo-600 px-[150px] py-[30px] text-center text-xl font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200"
              >
                시작하기
              </button>
            </div>
          </div>

          {!!illustration && (
            <div className="relative -mx-6 py-10 lg:mx-0 lg:p-0">{illustration}</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
