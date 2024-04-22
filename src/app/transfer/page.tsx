'use client'

import { DepositCard, TransferCard } from '@/components'
import { CardBody, CardHeader, Input, Tab, Tabs } from '@nextui-org/react'
import { SetStateAction, useState } from 'react'

export default function Transfer() {
  const [selected, setSelected] = useState('ETH')

  return (
    <div className='grid lg:grid-cols-12 content-center h-[calc(100vh-74px)] gap-x-24 lg:grid-flow-row'>
      <div className='col-start-4 col-end-7 h-[350px]'>
        <DepositCard tab={selected} width={300} height={350} />
      </div>
      <div className='col-start-7 col-end-10 h-[350px]'>
        <TransferCard tab={selected} />
      </div>
    </div>
  )
}
