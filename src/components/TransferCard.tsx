'use client'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Tabs, Tab, Input, Button } from '@nextui-org/react'
import MikiCard from './MikiCard'

export default function TransferCard({ tab }: { tab: string }) {
  const [selected, setSelected] = useState('deposits')

  const transfer = () => {
    if (tab === 'ETH') {
      // ETHのDeposit処理
      console.log('ETHをDepositします')
    } else {
      // USDCのDeposit処理
      console.log('USDCをDepositします')
    }
  }

  return (
    <MikiCard width={300} height={350}>
      <CardHeader className='pb-0 pt-10 px-4 flex-col items-start pl-8'>
        <h4 className='text-2xl font-roboto font-normal text-white'>Transfer</h4>
      </CardHeader>

      <CardBody className='mb-22 mt-6 text-center'>
        <div className='flex flex-col items-center w-full'>
          <div style={{ marginTop: '16px' }}></div>
          <div style={{ width: 'calc(100% - 40px)' }}>
            <Input type='number' variant='underlined' label='Amount' min={0} />
          </div>
          <div style={{ width: 'calc(100% - 40px)' }}>
            <Input type='text' variant='underlined' label='Address' />
          </div>
          {/* TODO: Select chain */}
          <div style={{ marginTop: '32px' }}></div>
          <Button
            style={{
              backgroundColor: '#6963AB',
              width: '120px',
              height: '48px',
              color: '#FFFFFF',
            }}
            onClick={transfer}
          >
            Transfer
          </Button>
        </div>
      </CardBody>
    </MikiCard>
  )
}
