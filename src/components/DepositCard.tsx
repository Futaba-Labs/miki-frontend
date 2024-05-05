'use client'

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
      setBalance(roundedNumber(formattedBalance, 6))
    }
  }, [data])

  return (
    <MikiCard width={width} height={height}>
      <div className='flex justify-between items-center px-8 py-10'>
        <span className='font-bold text-black text-xl'>Your Deposits</span>
        {tab === 'ETH' && (
          <div className='flex items-baseline'>
            <p className='font-bold text-black text-7xl pr-2'>{balance}</p>
            <p className='font-bold text-black text-4xl'>ETH</p>
          </div>
        )}
        {tab === 'USDC' && (
          <div className='flex items-baseline mb-1'>
            <p className='font-bold text-black text-7xl pr-2'>{balance * 1000000}</p>
            <p className='font-bold text-black text-4xl'>USDC</p>
          </div>
        )}
      </div>
    </MikiCard>
  )
}
