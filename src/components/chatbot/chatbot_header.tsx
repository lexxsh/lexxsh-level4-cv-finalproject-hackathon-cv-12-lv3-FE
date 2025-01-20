import React from 'react'

interface HeaderProps {
  title: string
  icon?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ title, icon = null }) => {
  return (
    <div className="select-none border-b border-gray-200 bg-white p-4">
      <h1 className="flex items-center text-xl font-bold">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h1>
    </div>
  )
}

export default Header
