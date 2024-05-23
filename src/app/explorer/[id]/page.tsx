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
    <WithApollo>
      <TransactionDetail params={params} />
    </WithApollo>
  )
}
