import { Card, CardBody, CardHeader } from '@nextui-org/react';

export default function YourDeposits({ tab }: { tab: string }) {
  return (
    <Card isBlurred className='border-none bg-white dark:bg-gray-700/60 h-[350px] w-[300px] rounded-lg mr-16' shadow='sm'>
      <CardHeader className='pb-0 pt-10 px-4 flex items-center justify-center'>
        <h4 className='text-2xl font-roboto font-normal text-white mx-auto w-max'>Your Deposits</h4>
      </CardHeader>

      <CardBody className='mb-22 mt-6 text-center'>
        {tab === "ETH" && (
          <div className='flex items-baseline mb-1'>
            <h4 className='font-roboto font-semibold text-white text-[100px] ml-6 mr-2'>1.24</h4>
            <p className='text-[18px] font-roboto font-semibold text-gray-400'>ETH</p>
          </div>
        )}
        {tab === "USDC" && (
          <div className='flex items-baseline mb-1'>
            <h4 className='font-roboto font-semibold text-white text-[100px] ml-6 mr-2'>124</h4>
            <p className='text-[18px] font-roboto font-semibold text-gray-400'>USDC</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
