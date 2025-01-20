import MenuItem from '@/components/menu/menu-item'

const MENU_ITEMS = [
  { name: 'Contact', to: '/contact' },
  { name: 'About Us', to: '/about' },
]

function Menu({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {MENU_ITEMS.map((link) => (
        <MenuItem key={link.name} to={link.to} name={link.name} />
      ))}
    </ul>
  )
}

export default Menu
