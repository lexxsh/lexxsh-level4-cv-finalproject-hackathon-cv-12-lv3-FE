import React from 'react'
import Card from '@/components/Card_box/card'
import { useSearchParams } from 'react-router-dom'
import Sidebar from '@/components/chatbot/sidebar'
import Header from '@/components/chatbot/chatbot_header'
import AudioIcon from '@/assets/audio/AudioIcon.png'
import AudioCover from '@/assets/audio/AudioCover.png'
import Audio from '@/assets/audio/Audio.mp3'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const Detail = () => {
  const [searchParams] = useSearchParams()
  const summary_id = searchParams.get('id')

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F9] md:flex-row">
      {/* Sidebar */}
      <div className="flex justify-center md:justify-start">
        <Sidebar />
      </div>

      {/* Content 영역 */}
      <div className="flex flex-1 flex-col bg-white">
        <Header
          title="오디오북"
          icon={<img src={AudioIcon} alt="icon" className="h-7 w-7"></img>}
        />
        <div className="flex flex-col overflow-y-scroll px-20">
          {/* 상단 컨테이너 */}
          <div className="flex w-full flex-col pt-6 lg:flex-row lg:items-center">
            {/* 오디오북 커버 */}
            <img
              src={AudioCover}
              alt="썸네일"
              className="h-80 w-80 rounded-lg object-contain text-center"
            />

            {/* 제목, 간단 요약, 태그, 오디어 플레이어를 담은 컨테이너 */}
            <div className="flex flex-col lg:ml-20">
              <h1 className="text-4xl font-semibold text-gray-700">
                {/* audio.title */}
                Attention ALL YOU NEED
              </h1>
              <p className="max-w-xl break-words text-base font-normal text-gray-600">
                {/* audio.summary */}
                Attention is All You Need"는 2017년 Google 연구팀과 University of Toronto의
                연구자들이 발표한 논문으로, 자연어 처리(NLP) 분야에서 혁신적인 Transformer
                아키텍처를 제안했습니다. 이 논문은 기존의 순환 신경망(RNN)과 합성곱 신경망(CNN)을
                대체할 수 있는 새로운 모델을 소개하며, **어텐션 메커니즘(Attention Mechanism)**만을
                사용하여 높은 성능을 달성했습니다.
              </p>

              {/* 해시태그 */}
              <div className="mt-4 flex gap-4">
                {/* audio.tags.map((tag) => (
                <span
                    key={tag}
                    className="w-fit whitespace-nowrap rounded-md bg-[rgba(153,197,255,0.25)] px-2 py-1 text-base font-normal text-[#0069FF]"
                  >
                    {tag}
                  </span>)) */}
                {['#Transformer', '#RNN', '#AI', '#DeepLearning'].map((tag) => (
                  <span
                    key={tag}
                    className="w-fit whitespace-nowrap rounded-md bg-[rgba(153,197,255,0.25)] px-2 py-1 text-base font-normal text-[#0069FF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 오디오 플레이어 */}
              {/* <AudioPlayer src={audio.file} className="my-6 rounded-lg" /> */}
              <AudioPlayer src={Audio} className="my-6 rounded-lg" />
            </div>
          </div>

          {/* 대본 컨테이너 */}
          <div className="mb-5 max-w-fit bg-white p-4">
            <h2 className="text-xl font-semibold">대본</h2>
            <p className="my-2 border-b-2 border-gray-200" />
            <p className="max-w-5xl overflow-y-visible pt-2 text-gray-700">
              {/* audio.script */}
              팟캐스트 대본: "Attention is All You Need: 자연어 처리의 혁명을 이끈 Transformer"
              [오프닝 음악] 호스트 1: 안녕하세요, 여러분! 오늘은 딥러닝과 자연어 처리 분야에서 정말
              중요한 논문 하나를 가지고 왔어요. 바로 2017년에 발표된 **"Attention is All You
              Need"**라는 논문인데요, 이 논문은 지금의 AI 기술 발전에 엄청난 영향을 미쳤답니다.
              호스트 2: 맞아요. 이 논문은 Google과 University of Toronto 연구팀이 함께 발표했는데,
              여기서 제안된 Transformer 아키텍처는 지금의 ChatGPT, BERT 같은 모델의 기반이 되었죠.
              오늘은 이 논문이 왜 그렇게 중요한지, 그리고 어떤 내용을 담고 있는지 쉽게 풀어보려고
              해요. 1. 논문의 배경: RNN과 CNN의 한계 호스트 1: 논문을 이해하려면 먼저 이전 기술인
              RNN(Recurrent Neural Network)과 CNN(Convolutional Neural Network)의 한계를 알아야
              해요. RNN은 시퀀스 데이터를 처리할 때 순차적으로 계산해야 해서 느렸고, 특히 긴
              문장에서는 정보를 잊어버리는 문제가 있었어요. 호스트 2: 네, 예를 들어 "I love AI,
              because it is amazing"라는 문장에서 "it"이 "AI"를 가리키는 걸 이해하려면 문장의
              처음부터 끝까지 순차적으로 읽어야 했죠. 이게 RNN의 한계였어요. 호스트 1: 그래서
              연구자들은 더 효율적인 방법을 찾기 시작했고, 그 결과가 바로 **어텐션
              메커니즘(Attention Mechanism)**이에요. 2. Transformer의 핵심: Self-Attention 호스트 2:
              Transformer의 핵심 아이디어는 Self-Attention이에요. 이건 문장의 모든 단어가 서로
              어떻게 관련되어 있는지를 한 번에 계산하는 거예요. 예를 들어, "The cat sat on the
              mat"라는 문장에서 "cat"과 "sat"의 관계, "cat"과 "mat"의 관계를 동시에 분석하는 거죠.
              호스트 1: 이렇게 하면 순차적으로 계산할 필요 없이 병렬 처리가 가능해져서 속도가 엄청
              빨라져요. 그리고 멀리 있는 단어 간의 관계도 잘 파악할 수 있죠. 호스트 2: 또,
              **멀티-헤드 어텐션(Multi-Head Attention)**이라는 기술을 사용해서 여러 관점에서 정보를
              수집합니다. 마치 여러 명의 전문가가 각자 다른 관점에서 문장을 분석하는 것처럼요. 3.
              Transformer의 구조 호스트 1: Transformer는 크게 **인코더(Encoder)**와
              **디코더(Decoder)**로 나뉘어요. 인코더는 입력 문장을 분석하고, 디코더는 분석 결과를
              바탕으로 새로운 문장을 생성해요. 호스트 2: 그리고 Positional Encoding이라는 기술을
              사용해서 단어의 순서 정보를 추가해요. 왜냐하면 Self-Attention은 단어의 순서를 고려하지
              않기 때문에, 위치 정보를 따로 넣어줘야 하거든요. 4. Transformer의 성과 호스트 1:
              Transformer는 기계 번역 작업에서 기존 모델보다 훨씬 뛰어난 성능을 보였어요. 특히 BLEU
              점수라는 평가 지표에서 SOTA(State-of-the-Art)를 달성했죠. 호스트 2: 그리고 이 모델은
              단순히 성능만 좋은 게 아니라, 학습 속도도 엄청 빨라졌어요. RNN은 순차적으로 계산해야
              해서 느렸지만, Transformer는 병렬 처리가 가능해서 학습 시간이 크게 단축됐죠. 5.
              Transformer의 영향 호스트 1: 이 논문이 발표된 이후, Transformer는 자연어 처리 분야에서
              완전히 새로운 시대를 열었어요. BERT, GPT, T5 같은 모델들이 모두 Transformer를 기반으로
              개발됐죠. 호스트 2: 그리고 자연어 처리뿐만 아니라 컴퓨터 비전, 음성 처리 등 다양한
              분야에서도 활용되고 있어요. 예를 들어, 이미지 생성 모델인 DALL-E도 Transformer를
              사용한다고 하네요. 6. 마무리: 왜 이 논문이 중요한가? 호스트 1: 결국 "Attention is All
              You Need"는 어텐션 메커니즘만으로도 복잡한 문제를 해결할 수 있음을 보여준 논문이에요.
              이 논문은 딥러닝 분야에서 패러다임 전환을 이끌었고, 지금의 AI 기술 발전에 큰 기여를
              했죠. 호스트 2: 맞아요. 이 논문을 이해하면 지금의 AI 모델들이 어떻게 작동하는지 더 잘
              이해할 수 있을 거예요. 그리고 이제는 Transformer가 AI의 표준 기술로 자리 잡았죠.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
