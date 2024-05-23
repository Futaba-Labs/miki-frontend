'use client'

import { useAccount, useReadContract } from 'wagmi'
import { useEffect, useMemo, useState } from 'react'
import { formatEther } from 'viem'
import Image from 'next/image'
import { Select, SelectItem } from '@nextui-org/react'
import { DEPLOYMENT, L2_ASSET_MANAGER_ABI } from '@/utils'
import { roundedNumber } from '@/utils/helper'
import MikiCard from './MikiCard'

type DepositCardProps = {
  width: number
  height: number
}

const tokens = [
  { key: 'ETH', value: 'ETH' },
  { key: 'USDC', value: 'USDC' },
]

export default function DepositCard({ width, height }: DepositCardProps) {
  const [balance, setBalance] = useState(0)

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [selected, setSelected] = useState<any>(new Set(['ETH']))
  const selectedValue = useMemo(() => {
    const value = Array.from(selected).join(', ').replaceAll('_', ' ')
    return value
  }, [selected])

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
    <div>
      <div className='flex justify-end drop-shadow-customp pb-8'>
        <Select
          items={tokens}
          defaultSelectedKeys={['ETH']}
          className='text-green w-36'
          radius='sm'
          onSelectionChange={setSelected}
          startContent={
            selectedValue === 'ETH' ? (
              <Image src={'/logo/ethereum.svg'} width={15} height={15} alt='ETH' />
            ) : (
              <Image src={'/logo/usdc.svg'} width={25} height={25} alt='USDC' />
            )
          }
          renderValue={(items) => {
            console.log(items)
            return items.map((item) => (
              <p key={item.key} className='text-green pl-1 font-bold text-lg'>
                {item.key!.toString()}
              </p>
            ))
          }}
        >
          {tokens.map((token) => (
            <SelectItem
              key={token.key}
              value={token.value}
              startContent={
                token.value === 'ETH' ? (
                  <Image src={'/logo/ethereum.svg'} width={15} height={15} alt='ETH' />
                ) : (
                  <Image src={'/logo/usdc.svg'} width={15} height={15} alt='USDC' />
                )
              }
            >
              <span className='text-black'>{token.value}</span>
            </SelectItem>
          ))}
        </Select>
      </div>
      <MikiCard width={width} height={height}>
        <div className='flex justify-between items-center px-8 py-10'>
          <span className='font-bold text-black text-xl'>Your Deposits</span>
          {selectedValue === 'ETH' && (
            <div className='flex items-baseline'>
              <p className='font-bold text-black text-7xl pr-2'>{balance}</p>
              <p className='font-bold text-black text-4xl'>ETH</p>
            </div>
          )}
          {selectedValue === 'USDC' && (
            <div className='flex items-baseline mb-1'>
              <p className='font-bold text-black text-7xl pr-2'>{balance * 1000000}</p>
              <p className='font-bold text-black text-4xl'>USDC</p>
            </div>
          )}
        </div>
      </MikiCard>
    </div>
  )
}
