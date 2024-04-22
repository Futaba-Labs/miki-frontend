'use client'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Tabs, Tab, Input, Button } from '@nextui-org/react'
import MikiCard from './MikiCard'
import React from 'react'

type TransferCardProps = {
  onClick: () => Promise<void>
  setAmount: (e: React.ChangeEvent<HTMLInputElement>) => void
  setAddress: (e: React.ChangeEvent<HTMLInputElement>) => void
  isPending: boolean
}

const TransferCard = React.memo(({ onClick, setAmount, setAddress, isPending }: TransferCardProps) => {
  return (
    <MikiCard width={300} height={350}>
      <CardHeader className='pb-0 pt-10 px-4 flex-col items-start pl-8'>
        <h4 className='text-2xl font-roboto font-normal text-white'>Transfer</h4>
      </CardHeader>

      <CardBody className='mb-22 mt-6 text-center'>
        <div className='flex flex-col items-center w-full'>
          <div style={{ marginTop: '16px' }}></div>
          <div style={{ width: 'calc(100% - 40px)' }}>
            <Input type='text' variant='underlined' label='Amount' onChange={setAmount} />
          </div>
          <div style={{ width: 'calc(100% - 40px)' }}>
            <Input type='text' variant='underlined' label='Address' onChange={setAddress} />
          </div>
          {/* TODO: Select chain */}
          <div style={{ marginTop: '32px' }}></div>
          <Button
            isLoading={isPending}
            style={{
              backgroundColor: '#6963AB',
              width: '120px',
              height: '48px',
              color: '#FFFFFF',
            }}
            onClick={onClick}
          >
            {isPending ? 'Transfering' : 'Transfer'}
          </Button>
        </div>
      </CardBody>
    </MikiCard>
  )
})

export default TransferCard
