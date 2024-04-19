import { Card } from '@nextui-org/react'

type MikiCardProps = {
  width: number
  height: number
  children: React.ReactNode
}

export default function MikiCard({ children, width, height }: MikiCardProps) {
  return (
    <Card
      isBlurred
      className={`border-non dark:bg-gray-700/60 w-[${width}px] h-[${height}px] rounded-[54px]`}
      shadow='sm'
    >
      {children}
    </Card>
  )
}
