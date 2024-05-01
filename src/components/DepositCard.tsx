'use client'
import { CardBody, CardHeader } from '@nextui-org/react'
import MikiCard from './MikiCard'
import { useAccount, useReadContract } from 'wagmi'
import { useEffect, useState } from 'react'
import { DEPLOYMENT, L2_ASSET_MANAGER_ABI } from '@/utils'
import { formatEther } from 'viem'
import { roundedNumber } from '@/utils/helper'

type DepositCardProps = {
  width: number
  height: number
  tab: string
}

export default function DepositCard({ tab, width, height }: DepositCardProps) {
  const [balance, setBalance] = useState(0)
  const { address } = useAccount()

  const { refetch, data } = useReadContract({
    abi: L2_ASSET_MANAGER_ABI,
    address: DEPLOYMENT.l2AssetManager as `0x${string}`,
    functionName: 'getDeposit',
    args: [DEPLOYMENT.ethTokenPool, address],
  })

  useEffect(() => {
    if (address) {
      refetch()
    }
  }, [address])

  useEffect(() => {
    if (data) {
      const formattedBalance = parseFloat(formatEther(data as bigint))
      setBalance(roundedNumber(formattedBalance, 2))
    }
  }, [data])

  return (
    <MikiCard width={width} height={height}>
      <CardHeader className='pb-0 pt-10 px-4 flex-col items-start pl-8'>
        <h4 className='text-2xl font-roboto font-normal text-white'>Your Deposits</h4>
      </CardHeader>

      <CardBody className='pl-8 pt-10'>
        {tab === 'ETH' && (
          <div className='flex items-baseline mb-1'>
            <h4 className='font-roboto font-semibold text-white text-[100px] pr-2'>{balance}</h4>
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
  )
}
