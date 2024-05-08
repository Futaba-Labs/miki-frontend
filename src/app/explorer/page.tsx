import TransactionCard from '@/components/TransactionCard'
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
    <>
      <TransactionCard />
    </>
  )
}
