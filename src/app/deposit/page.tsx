'use client'

import { AccountOperations, MikiCard } from '@/components'
import { CardBody, CardHeader } from '@nextui-org/react'
import { useState } from 'react'

export default function Deposit() {
  const [tab, setTab] = useState('ETH')

  return (
    <>
      <div className='grid lg:grid-cols-12 content-center h-[calc(100vh-74px)] gap-x-24 lg:grid-flow-row'>
        <div className='col-start-4 col-end-7'>
          <MikiCard width={300} height={350}>
            <CardHeader className='pb-0 pt-10 px-4 flex-col items-start pl-8'>
              <h4 className='text-2xl font-roboto font-normal text-white'>Your Deposits</h4>
            </CardHeader>

            <CardBody className='pl-8 pt-10'>
              {tab === 'ETH' && (
                <div className='flex items-baseline mb-1'>
                  <h4 className='font-roboto font-semibold text-white text-[100px] pr-2'>1.24</h4>
                  <p className='text-[18px] font-roboto font-semibold text-gray-400'>ETH</p>
                </div>
              )}
              {tab === 'USDC' && (
                <div className='flex items-baseline mb-1'>
                  <h4 className='font-roboto font-semibold text-white text-[100px] pr-2'>124</h4>
                  <p className='text-[18px] font-roboto font-semibold text-gray-400'>USDC</p>
                </div>
              )}
            </CardBody>
          </MikiCard>
        </div>
        <div className='col-start-7 col-end-10'>
          <AccountOperations tab={tab} />
        </div>
      </div>
    </>
  )
}
