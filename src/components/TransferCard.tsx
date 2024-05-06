'use client'
import { Input, Button, Select, SelectItem } from '@nextui-org/react'
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import MikiCard from './MikiCard'

type TransferCardProps = {
  onClick: () => Promise<void>
  setAmount: (e: React.ChangeEvent<HTMLInputElement>) => void
  setAddress: (e: React.ChangeEvent<HTMLInputElement>) => void
  isPending: boolean
}

/* eslint-disable  react/display-name */
const TransferCard = React.memo(({ onClick, setAmount, setAddress, isPending }: TransferCardProps) => {
  const tokens = [
    { key: 'Optimism', value: 'optimism', chainId: 1 },
    { key: 'Base', value: 'base', chainId: 8453 },
  ]

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [selected, setSelected] = useState<any>(new Set(['Select Chain']))
  const selectedValue = useMemo(() => {
    const value = Array.from(selected).join(', ').replaceAll('_', ' ')
    return value
  }, [selected])

  return (
    <MikiCard width={300} height={300}>
      <div className='flex justify-between items-center px-8 py-8'>
        <span className='font-bold text-black text-xl'>Transfer</span>

        <div className='flex flex-col items-end w-full gap-4'>
          <Input
            type='text'
            label='Amount'
            labelPlacement='outside'
            placeholder='0.01'
            radius='sm'
            className='w-128'
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
            onChange={setAmount}
          />
          <Input
            type='text'
            label='Address'
            labelPlacement='outside'
            placeholder='0x...'
            radius='sm'
            className='w-128'
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
            onChange={setAddress}
          />
          <Select
            items={tokens}
            defaultSelectedKeys={['ETH']}
            className='text-green w-128'
            radius='sm'
            onSelectionChange={setSelected}
            labelPlacement='outside'
            label='Chain'
            placeholder='Select chain'
            startContent={
              selectedValue !== '' &&
              selectedValue !== 'Select Chain' && (
                <Image src={`/logo/${selectedValue}.svg`} width={25} height={25} alt={selectedValue} />
              )
            }
            renderValue={(items) => {
              if (selectedValue === 'Select Chain') {
                return <p className='text-green pl-1 font-bold text-lg'>Select Chain</p>
              }
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
                startContent={<Image src={`/logo/${token.value}.svg`} width={25} height={25} alt={token.value} />}
              >
                <span className='text-black'>{token.key}</span>
              </SelectItem>
            ))}
          </Select>
          <div className='flex justify-center w-128'>
            <Button
              isLoading={isPending}
              radius='sm'
              onClick={onClick}
              startContent={!isPending ? <Image src={'/icon/send.svg'} width={24} height={24} alt='send' /> : null}
              className='bg-button drop-shadow-button hover:bg-green-100 focus:ring'
            >
              <span className='text-green font-bold text-lg'>{isPending ? 'Sending...' : 'Send'}</span>
            </Button>
          </div>
        </div>
      </div>
    </MikiCard>
  )
})

export default TransferCard
