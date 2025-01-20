import { NavLink } from 'react-router-dom'

function MenuItem({ name, to }: { name: string; to: string }) {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive ? 'border-b text-gray-600' : 'text-black hover:border-b'
        }
        to={to}
      >
        {name}
      </NavLink>
    </li>
  )
}

export default MenuItem
