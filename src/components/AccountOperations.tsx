'use client'
import { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Tabs, Tab, Input, Button } from '@nextui-org/react'
import MikiCard from './MikiCard'
import { useAccount, useWriteContract } from 'wagmi'
import { DEPLOYMENT, L2_ASSET_MANAGER_ABI } from '@/utils'
import { parseEther } from 'viem'

export default function AccountOperations({ tab }: { tab: string }) {
  const [selected, setSelected] = useState('deposits')
  const [amount, setAmount] = useState(0)

  const { isConnected } = useAccount()
  const { writeContract, isPending } = useWriteContract()

  const handleDeposit = () => {
    if (amount === 0) {
      // TODO: handle error
      return
    }
    writeContract({
      abi: L2_ASSET_MANAGER_ABI,
      address: DEPLOYMENT.l2AssetManager as `0x${string}`,
      functionName: 'depositETH',
      args: [parseEther(amount.toString())],
      value: parseEther(amount.toString()),
    })
  }

  const handleWithdraw = () => {
    // TODO: implement
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
            <div style={{ marginTop: '16px' }}></div>
            <div style={{ width: 'calc(100% - 40px)' }}>
              <Input
                type='text'
                variant='underlined'
                label='Amount'
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
            </div>
            <div style={{ marginTop: '64px' }}></div>
            <Button
              isLoading={isPending}
              style={{
                backgroundColor: '#6963AB',
                width: '120px',
                height: '48px',
                color: '#FFFFFF',
              }}
              onClick={() => handleDeposit()}
            >
              {isPending ? 'Depositing...' : 'Deposit'}
            </Button>
          </div>
        ) : (
          <div className='flex flex-col items-center w-full'>
            <div style={{ marginTop: '16px' }}></div>
            <div style={{ width: 'calc(100% - 40px)' }}>
              <Input type='number' variant='underlined' label='Amount' min={0} />
            </div>
            <div style={{ marginTop: '64px' }}></div>
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
