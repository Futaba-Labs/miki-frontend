import { Suspense } from 'react'
import { DepositCard, TransferCard } from '@/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Magic Transfer | Miki',
  description: 'Miki',
  icons: {
    icon: '/favicon.png',
  },
}

export default function Transfer() {
  return (
    <div className='flex flex-col w-9/12 mx-auto gap-8 pt-8'>
      <DepositCard width={300} height={300} />

      <div className='col-start-7 col-end-10 h-[350px]'>
        <Suspense>
          <TransferCard />
        </Suspense>
      </div>
    </div>
  )
}
