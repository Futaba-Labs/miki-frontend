'use client'

import { Card, CardHeader, CardBody } from '@nextui-org/react'

export default function Home() {
  return (
    <>
      <Card isBlurred className='border-none bg-white dark:bg-gray-700/60 h-[400px] w-[300px] rounded-lg mr-16'  shadow='sm'>
        <CardHeader className='pb-0 pt-10 px-4 flex-col items-start'>
          <h4 className='text-2xl font-roboto font-normal text-white'>Try Abstraction</h4>
        </CardHeader>

        <CardBody className='mb-0'>
          <p className='font-roboto font-semibold text-white text-[64px]'>5</p>
          <p className='text-[18px] font-roboto font-semibold text-gray-400 mt-n20'>Explored Chains</p>
          <p className='font-roboto font-semibold text-white text-[64px] mt-4'>5000</p>
          <p className='text-[18px] font-roboto font-semibold text-gray-400 mt-n20'>Miki Points</p>
        </CardBody>
      </Card>
    </>
  )
}
