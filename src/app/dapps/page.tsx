import ChatBotWindow from '@/components/ChatBotWindow'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Dapps | Miki',
  description: 'Miki',
  icons: {
    icon: '/favicon.png',
  },
}

export default function Dapps() {
  return (
    <div className='flex justify-center items-center h-[calc(100vh-80px)]'>
      <ChatBotWindow />
    </div>
  )
}
