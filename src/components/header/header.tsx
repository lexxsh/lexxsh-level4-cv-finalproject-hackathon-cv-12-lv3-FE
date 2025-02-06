import { Logo } from '@/components/logo'
import { Link } from 'react-router-dom'
import Header1 from '@/assets/friend.svg'
import Header2 from '@/assets/text.svg'
function Header({ title }: { title?: string }) {
  return (
    <header className="relative z-10 py-6">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative flex items-center justify-between">
          <h1 className="m-0 text-xl font-bold uppercase leading-none">
            <Link to="/" className="flex items-center justify-center gap-2 no-underline">
              <img src={Header1} className="h-12 w-12" />
              <img src={Header2} className="w-30 h-12" />
            </Link>
          </h1>
          {/* <button className="bg-blue-500 prose prose-xl hidden rounded-md px-4 py-2 font-bold text-gray-400 hover:bg-gray-200 md:block">
            헤더
          </button> */}
        </div>
      </div>
    </header>
  )
}

export default Header
