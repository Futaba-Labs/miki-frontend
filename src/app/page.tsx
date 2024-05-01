'use client'

import { DepositCard, MikiCard } from '@/components'
import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { useAccount } from 'wagmi'

export default function Home() {
  return (
    <div className='grid lg:grid-cols-12 content-center h-[calc(100vh-74px)] gap-x-24 lg:grid-flow-row'>
      <div className='col-start-4 col-end-7'>
        <DepositCard tab={'ETH'} width={300} height={400} />
      </div>
      <div className='col-start-7 col-end-10'>
        <MikiCard width={300} height={400}>
          <CardHeader className='pb-0 pt-10 px-4 flex-col items-start pl-8'>
            <h4 className='text-2xl font-roboto font-normal text-white'>Try Abstraction</h4>
          </CardHeader>

          <CardBody className='pl-8'>
            <p className='font-roboto font-semibold text-white text-[64px]'>5</p>
            <p className='text-[18px] font-roboto font-semibold text-gray-400 mt-n20'>Explored Chains</p>
            <p className='font-roboto font-semibold text-white text-[64px] mt-4'>5000</p>
            <p className='text-[18px] font-roboto font-semibold text-gray-400 mt-n20'>Miki Points</p>
          </CardBody>
        </MikiCard>
      </div>
    </div>
  )
}
