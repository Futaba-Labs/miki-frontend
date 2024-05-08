'use client'

import { Chip } from '@nextui-org/chip'
import { MikiCard } from '.'

export default function TransactionCard() {
  return (
    <MikiCard width={300} height={100}>
      <div className='flex'>
        <Chip>Sucess</Chip>
        <p>0x123456789abcdef</p>
        <p>0x123456789abcdef</p>
      </div>
    </MikiCard>
  )
}
