import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '@/components/chatbot/sidebar'
import Header from '@/components/chatbot/chatbot_header'
import AudioIcon from '@/assets/audio/AudioIcon.png'
import AudioCover from '@/assets/audio/AudioCover.png'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import axios from 'axios'
import Img1 from '@/assets/summary/default.png'
import { ScaleLoader } from 'react-spinners' // react-spinners 라이브러리에서 스피너 import
import { useLocation } from 'react-router-dom'
const Detail = () => {
  const { fileId } = useParams()
  const [audio, setAudio] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [script, setScript] = useState('') // 대본
  const [tags, setTags] = useState([]) // 태그
  const [summary, setSummary] = useState('') // 요약
  const [loading, setLoading] = useState(true) // 전체 로딩 상태
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const title = queryParams.get('title')

  const fetchData = async () => {
    try {
      const pdfId = fileId
      const userId = 'admin'

      const apiEndpoints = {
        audio: {
          url: 'http://127.0.0.1:8003/pdf/get_audio',
          blob: true,
        },
        thumbnail: {
          url: 'http://127.0.0.1:8003/pdf/get_thumbnail',
          blob: true,
        },
        script: {
          url: 'http://127.0.0.1:8003/pdf/get_script',
          blob: false,
        },
        tags: {
          url: 'http://127.0.0.1:8003/pdf/get_tags',
          blob: false,
        },
        summary: {
          url: 'http://127.0.0.1:8003/pdf/get_summary',
          blob: false,
        },
      }

      const apiCalls = Object.entries(apiEndpoints).map(([key, endpoint]) => {
        const config = {
          ...(endpoint.blob && { responseType: 'blob' }),
        }

        return axios
          .post(endpoint.url, { pdf_id: pdfId, user_id: userId }, config)
          .then((response) => ({ key, data: response.data }))
          .catch((error) => ({ key, error }))
      })

      const results = await Promise.all(apiCalls)

      results.forEach(({ key, data, error }) => {
        if (error) {
          console.error(`Error fetching ${key}:`, error)
          return
        }

        switch (key) {
          case 'audio':
            const audioUrl = URL.createObjectURL(data)
            setAudio(audioUrl)
            break

          case 'thumbnail':
            const thumbnailUrl = URL.createObjectURL(data)
            // Check if response indicates success (you might need to adjust this logic)
            if (!data.hasOwnProperty('success')) {
              setThumbnail(thumbnailUrl)
            } else {
              setThumbnail(Img1)
            }
            if (!data.success) {
              setThumbnail(Img1)
            }
            break

          case 'script':
            setScript(data)
            break

          case 'tags':
            setTags(data.data.tag_text)
            break

          case 'summary':
            const longSummary = data.data.long_summary
            const sentences = longSummary.split('.')
            const firstTwoSentences =
              sentences.slice(0, 2).join('.') + (sentences.length > 2 ? '.' : '')
            setSummary(firstTwoSentences)
            break
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  // 로딩 화면 (사이드바와 헤더 아래 영역만 로딩)
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F9] md:flex-row">
      {/* Sidebar */}
      <div className="flex justify-center md:justify-start">
        <Sidebar />
      </div>

      {/* Content 영역 */}
      <div className="flex flex-1 flex-col bg-white">
        <Header title="오디오북" icon={<img src={AudioIcon} alt="icon" className="h-7 w-7" />} />

        {/* 로딩 상태일 때 */}
        {loading ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <ScaleLoader size={50} color="#0069FF" loading={loading} />
            <p className="mt-4 text-lg text-[#4B5563]">오디오북을 불러오고 있습니다...</p>
          </div>
        ) : (
          <div className="flex flex-col overflow-y-scroll px-20">
            {/* 상단 컨테이너 */}
            <div className="flex w-full flex-col pt-6 lg:flex-row lg:items-center">
              {/* 오디오북 커버 */}
              <img
                src={thumbnail || AudioCover}
                alt="썸네일"
                className="h-80 w-80 rounded-lg object-contain text-center"
              />

              {/* 제목, 간단 요약, 태그, 오디오 플레이어를 담은 컨테이너 */}
              <div className="flex flex-col lg:ml-20">
                <h1 className="text-4xl font-semibold text-gray-700">{title}</h1>
                <p className="max-w-xl break-words text-base font-normal text-gray-600">
                  {summary}
                </p>

                {/* 해시태그 */}
                <div className="mt-4 flex gap-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="w-fit whitespace-nowrap rounded-md bg-[rgba(153,197,255,0.25)] px-2 py-1 text-base font-normal text-[#0069FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 오디오 플레이어 */}
                <AudioPlayer src={audio} className="my-6 rounded-lg" />
              </div>
            </div>

            {/* 대본 컨테이너 */}
            <div className="mb-5 max-w-fit bg-white p-4">
              <h2 className="text-xl font-semibold">대본</h2>
              <p className="my-2 border-b-2 border-gray-200" />
              <div className="max-w-5xl overflow-y-visible pt-2 text-gray-700">
                {script && script.length > 0 ? (
                  script.map((item, index) => (
                    <div key={index} className="script-item">
                      <p>
                        <strong>진행자:</strong> {item['재석']}
                      </p>
                      <p>
                        {item['하하'].trim() !== '' && (
                          <p>
                            <strong>게스트:</strong> {item['하하']}
                          </p>
                        )}
                      </p>
                      <p>&nbsp;</p>
                    </div>
                  ))
                ) : (
                  <div>대본이 없습니다.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail
