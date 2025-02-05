import React from 'react'

interface HeaderProps {
  title: string | null
  padding?: string
  icon?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ title, padding = 'p-[1.09rem]', icon }) => {
  return (
    <div className={`select-none border-b border-gray-200 bg-white ${padding}`}>
      <h1 className="flex items-center text-xl font-bold">
        {icon && <span className="mr-2">{icon}</span>}
        {title || ''}
      </h1>
    </div>
  )
}

export default Header
