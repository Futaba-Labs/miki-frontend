'use client'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Tabs, Tab, Input, Button } from '@nextui-org/react'
import MikiCard from './MikiCard'

export default function AccountOperations({ tab }: { tab: string }) {
  const [selected, setSelected] = useState('deposits')

  const handleDeposit = () => {
    if (tab === 'ETH') {
      // ETHのDeposit処理
      console.log('ETHをDepositします')
    } else {
      // USDCのDeposit処理
      console.log('USDCをDepositします')
    }
  }

  // Withdraw関数
  const handleWithdraw = () => {
    if (tab === 'ETH') {
      // ETHのWithdraw処理
      console.log('ETHをWithdrawします')
    } else {
      // USDCのWithdraw処理
      console.log('USDCをWithdrawします')
    }
  }

  return (
    <MikiCard width={300} height={350}>
      <CardHeader className='pb-0 pt-10 px-4 flex items-center justify-center'>
        {/* Tabs for selecting views */}
        <Tabs
          aria-label='Tabs variants'
          variant='light'
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key.toString())}
        >
          <Tab key='deposit' title='Deposit' />
          <Tab key='withdraw' title='Withdraw' />
        </Tabs>
      </CardHeader>

      <CardBody className='mb-22 mt-6 text-center'>
        {selected === 'deposit' ? (
          <div className='flex flex-col items-center w-full'>
            <div style={{ marginTop: '16px' }}></div> {/* 64px margins */}
            <div style={{ width: 'calc(100% - 40px)' }}>
              {' '}
              {/* Input コンポーネントを含む div */}
              <Input type='number' variant='underlined' label='Amount' min={0} />
            </div>
            <div style={{ marginTop: '64px' }}></div> {/* 64px margins */}
            <Button
              style={{
                backgroundColor: '#6963AB',
                width: '120px',
                height: '48px',
                color: '#FFFFFF',
              }}
              onClick={handleDeposit}
            >
              Deposit
            </Button>
          </div>
        ) : (
          <div className='flex flex-col items-center w-full'>
            <div style={{ marginTop: '16px' }}></div> {/* 64px margins */}
            <div style={{ width: 'calc(100% - 40px)' }}>
              {' '}
              {/* Input コンポーネントを含む div */}
              <Input type='number' variant='underlined' label='Amount' min={0} />
            </div>
            <div style={{ marginTop: '64px' }}></div> {/* 64px margins */}
            <Button
              style={{
                backgroundColor: '#6963AB',
                width: '120px',
                height: '48px',
                color: '#FFFFFF',
              }}
              onClick={handleWithdraw}
            >
              Withdraw
            </Button>
          </div>
        )}
      </CardBody>
    </MikiCard>
  )
}
