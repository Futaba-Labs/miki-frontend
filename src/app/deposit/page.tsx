import { AccountOperations, DepositCard } from '@/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deposit | Miki',
  description: 'Miki',
  icons: {
    icon: '/favicon.png',
  },
}

export default function Deposit() {
  return (
    <div className='flex flex-col w-9/12 mx-auto gap-8 pt-8'>
      <DepositCard width={300} height={300} />
      <AccountOperations />
    </div>
  )
}
