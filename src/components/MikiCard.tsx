type MikiCardProps = {
  width: number
  height: number
  children: React.ReactNode
}

export default function MikiCard({ children, width, height }: MikiCardProps) {
  return <div className={`shadow-inner w-[${width}px] h-[${height}px] rounded-[16px] bg-white`}>{children}</div>
}
