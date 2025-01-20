import { cn } from '@/utils/cn'

function Gradient({ className }: { className?: string }) {
  return <div className={cn('from-white-600 bg-gradient-to-b to-primary-400', className)} />
}

export default Gradient
