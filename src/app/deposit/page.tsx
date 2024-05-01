'use client'

import { AccountOperations, DepositCard, MikiCard } from '@/components'
import { CardBody, CardHeader } from '@nextui-org/react'
import { useState } from 'react'

export default function Deposit() {
  const [tab, setTab] = useState('ETH')

  return (
    <>
      <div className='grid lg:grid-cols-12 content-center h-[calc(100vh-74px)] gap-x-24 lg:grid-flow-row'>
        <div className='col-start-4 col-end-7 h-[350px]'>
          <DepositCard tab={tab} width={300} height={350} />
        </div>
        <div className='col-start-7 col-end-10 h-[350px]'>
          <AccountOperations tab={tab} />
        </div>
      </div>
    </>
  )
}
