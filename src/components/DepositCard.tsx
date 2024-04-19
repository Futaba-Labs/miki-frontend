import { Card, CardBody, CardHeader } from '@nextui-org/react'
import MikiCard from './MikiCard'

type DepositCardProps = {
  width: number
  height: number
  tab: 'ETH' | 'USDC'
}

export default function DepositCard({ tab, width, height }: DepositCardProps) {
  return (
    <MikiCard width={width} height={height}>
      <CardHeader className='pb-0 pt-10 px-4 flex-col items-start pl-8'>
        <h4 className='text-2xl font-roboto font-normal text-white'>Your Deposits</h4>
      </CardHeader>

      <CardBody className='pl-8 pt-12'>
        {tab === 'ETH' && (
          <div className='flex items-baseline mb-1'>
            <h4 className='font-roboto font-semibold text-white text-[100px] pr-2'>1.24</h4>
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
