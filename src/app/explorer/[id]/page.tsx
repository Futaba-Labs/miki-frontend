import { TransactionDetail, WithApollo } from '@/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explorer | Miki',
  description: 'Miki',
  icons: {
    icon: '/favicon.png',
  },
}

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className='px-6 sm:px-0 sm:h-[calc(100vh-64px)]'>
      <WithApollo>
        <TransactionDetail params={params} />
      </WithApollo>
    </div>
  )
}
