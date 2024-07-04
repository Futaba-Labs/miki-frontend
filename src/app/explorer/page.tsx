import { WithApollo, Transactions } from '@/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explorer | Miki',
  description: 'Miki',
  icons: {
    icon: '/favicon.png',
  },
}

export default function Explorer() {
  return (
    <div className='px-6 sm:px-0 h-[calc(100vh-64px)]'>
      <WithApollo>
        <Transactions />
      </WithApollo>
    </div>
  )
}
