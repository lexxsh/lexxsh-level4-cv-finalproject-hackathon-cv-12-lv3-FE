import { ScrollToTop } from '@/components/scroll-to-top'
import AboutPage from '@/routes/about'
import ContactPage from '@/routes/contact'
import HomePage from '@/routes/home'
import MainPage from '@/routes/main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorPage from '@/routes/error'
import UploadPage from '@/routes/upload'
import ChatPage from '@/routes/chat'
export default function App() {
  const basename = import.meta.env.BASE_URL

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  )
}
