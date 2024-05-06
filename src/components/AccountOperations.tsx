'use client'
import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { useAccount, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import Image from 'next/image'
import { DEPLOYMENT, L2_ASSET_MANAGER_ABI } from '@/utils'
import MikiCard from './MikiCard'

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
    <MikiCard width={300} height={300}>
      <div className='flex justify-between items-center px-8 py-10'>
        <span className='font-bold text-black text-xl'>Add Funds</span>
        <div className=''>
          {selected === 'deposits' ? (
            <div className='flex items-end gap-2 w-full'>
              <div>
                <Input
                  type='text'
                  label='Amount'
                  labelPlacement='outside'
                  placeholder='0.01'
                  radius='sm'
                  className='w-80'
                  classNames={{
                    label: 'text-black text-sm',
                    input: ['text-black', 'placeholder:text-default-700/50 dark:placeholder:text-white/60'],
                    inputWrapper: [
                      'shadow-inner',
                      'bg-default-200/50',
                      'dark:bg-default/60',
                      'backdrop-blur-xl',
                      'backdrop-saturate-200',
                      'hover:bg-default-200/70',
                      'dark:hover:bg-default/70',
                      'group-data-[focused=true]:bg-default-200/50',
                      'dark:group-data-[focused=true]:bg-default/60',
                      '!cursor-text',
                    ],
                  }}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
              </div>
              <div style={{ marginTop: '64px' }}></div>
              <Button
                isLoading={isPending}
                radius='sm'
                onClick={() => handleDeposit()}
                startContent={!isPending ? <Image src={'/icon/add.svg'} width={24} height={24} alt='add' /> : null}
                className='bg-button drop-shadow-button hover:bg-green-100 focus:ring'
              >
                <span className='text-green font-bold text-lg'>{isPending ? 'Depositing...' : 'Deposit'}</span>
              </Button>
            </div>
          ) : (
            <div className='flex items-center w-full'>
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
        </div>
      </div>
    </MikiCard>
  )
}
