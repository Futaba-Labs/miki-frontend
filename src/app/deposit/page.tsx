'use client'

import { useMemo, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import Image from 'next/image'
import { AccountOperations, DepositCard } from '@/components'

export default function Deposit() {
  const tokens = [
    { key: 'ETH', value: 'ETH' },
    { key: 'USDC', value: 'USDC' },
  ]

  /* eslint-disable  @typescript-eslint/no-explicit-any */
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

      <DepositCard tab={selectedValue} width={300} height={225} />
      <AccountOperations tab={selectedValue} />
    </div>
  )
}
