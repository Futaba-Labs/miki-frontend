import { Metadata } from 'next/types'
import { DepositCard, MikiCard } from '@/components'

export const metadata: Metadata = {
  title: 'Home | Miki',
  description: 'Miki',
  icons: {
    icon: '/favicon.png',
  },
}

export default function Home() {
  return (
    <div className='flex flex-col w-9/12 mx-auto gap-8 pt-8'>
      <DepositCard width={300} height={225} />
      <div className='col-start-7 col-end-10'>
        <MikiCard width={300} height={400}>
          <div className='flex flex-col'>
            <div className='flex flex-col sm:flex-row justify-between sm:items-center px-8 py-10 gap-4 sm:gap-0'>
              <span className='font-bold text-black text-xl'>Explored Chains</span>
              <div className='flex items-baseline'>
                <p className='font-bold text-black text-7xl pr-2'>5</p>
                <p className='font-bold text-black text-4xl'>chains</p>
              </div>
            </div>
          </div>
        </MikiCard>
      </div>
    </div>
  )
}
