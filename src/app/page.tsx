'use client'

import { DepositCard, MikiCard } from '@/components'
import { Select, SelectItem } from '@nextui-org/react'
import { useState, useMemo } from 'react'
import Image from 'next/image'

export default function Home() {
  const tokens = [
    { key: 'ETH', value: 'ETH' },
    { key: 'USDC', value: 'USDC' },
  ]
  const [selected, setSelected] = useState<any>(new Set(['ETH']))
  const selectedValue = useMemo(() => {
    const value = Array.from(selected).join(', ').replaceAll('_', ' ')
    return value
  }, [selected])

  return (
    <div className='flex flex-col w-9/12 mx-auto gap-8 pt-8'>
      <div className='flex justify-end drop-shadow-custom'>
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
            return items.map((item) => <p className='text-green pl-1 font-bold text-lg'>{item.key!.toString()}</p>)
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

      <DepositCard tab={selectedValue} width={300} height={225} />
      <div className='col-start-7 col-end-10'>
        <MikiCard width={300} height={400}>
          <div className='flex flex-col'>
            <div className='flex justify-between items-center px-8 pt-10'>
              <span className='font-bold text-black text-xl'>Explored Chains</span>
              <div className='flex items-baseline'>
                <p className='font-bold text-black text-7xl pr-2'>5</p>
                <p className='font-bold text-black text-4xl'>chains</p>
              </div>
            </div>
            <div className='flex justify-end items-center px-8 py-10'>
              <div className='flex items-baseline'>
                <p className='font-bold text-black text-7xl pr-4'>6000</p>
                <p className='font-bold text-black text-4xl'>Miki Points</p>
              </div>
            </div>
          </div>
        </MikiCard>
      </div>
    </div>
  )
}
