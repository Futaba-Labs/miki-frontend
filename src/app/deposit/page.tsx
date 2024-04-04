'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/react'

export default function Deposit() {
  return (
    <>
      <Card isBlurred className='border-none bg-white dark:bg-gray-700/60 h-[400px] w-[300px] mr-16' shadow='sm'>
        <CardHeader className='pb-0 pt-10 px-4 flex-col items-start'>
          <h4 className='text-2xl font-roboto font-normal text-white'>Deposit Assets</h4>
        </CardHeader>

        <CardBody className='mb-22 mt-6'>
          <div className='flex items-baseline mb-1'>
            <h4 className='font-roboto font-semibold text-white text-[100px] mr-2'>1.24</h4>
            <p className='text-[18px] font-roboto font-semibold text-gray-400'>ETH</p>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
