'use client'

import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Spinner, Chip, Link, Skeleton } from '@nextui-org/react'
import Image from 'next/image'
import { formatEther } from 'viem'
import { CrossChainTransaction } from '@/types'
import { convertToChainName, getChainIconUrl, getColor, getExploerUrl, omitText } from '@/utils/helper'
import MikiCard from './MikiCard'

const GET_TRANSACTION = gql`
  query GetTransaction($id: String!) {
    crossChainExec(id: $id) {
      amount
      asset
      dstChainId
      fee
      id
      receiveAmount
      reqTransaction {
        from
        hash
        id
        timestamp
      }
      resTransaction {
        from
        hash
        id
        timestamp
      }
      sender
      status
      timestamp
      to
    }
  }
`

export default function TransactionDetail({ params }: { params: { id: string } }) {
  const [transaction, setTransaction] = useState<CrossChainTransaction>()

  const { loading, error, data, refetch } = useQuery(GET_TRANSACTION, {
    variables: { id: params.id },
  })

  useEffect(() => {
    if (data) {
      setTransaction(data.crossChainExec)
    }
  }, [data])

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch()
    }, 10000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  if (!transaction || loading) {
    return (
      <div className='flex justify-center items-center h-[calc(100vh-80px)]'>
        <Spinner
          size='lg'
          label='Loading...'
          classNames={{
            label: 'text-green',
            circle1: ['border-b-[#1F8506]'],
            circle2: ['border-b-[#1F8506]'],
          }}
        />
      </div>
    )
  }

  if (error) return <p>Error : {error.message}</p>

  const color = getColor(transaction.status.toString())
  const dstChainId = parseInt(transaction.dstChainId.toString())
  const chainIcon = getChainIconUrl(dstChainId)

  return (
    <div className='flex flex-col w-4/5 mx-auto gap-10 pt-12'>
      <MikiCard width={100} height={100}>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col pl-10 py-8 gap-2'>
            <div className='flex gap-2'>
              <Image src={'/logo/arbitrum.svg'} width={25} height={25} alt={'arbitrum'} />
              <p className='text-lg text-black'>Arbiturm Sepolia</p>
            </div>
            <Link isExternal isBlock showAnchorIcon href={getExploerUrl(421614) + 'address/' + transaction.sender}>
              <span className='text-lg'>{omitText(transaction.sender, 8, 8)}</span>
            </Link>
          </div>

          {transaction.asset && transaction.amount ? (
            <div className='flex gap-2'>
              <Image src={'/logo/ethereum.svg'} width={15} height={15} alt={'ethereum'} />
              <span className='text-lg font-bold'>{formatEther(transaction.amount) + ' ETH'}</span>
            </div>
          ) : null}

          <Chip color={color} className='p-4'>
            <p className='text-white font-bold text-lg'>{transaction.status}</p>
          </Chip>

          {transaction.asset && transaction.receiveAmount ? (
            <div className='flex gap-2'>
              <Image src={'/logo/ethereum.svg'} width={15} height={15} alt={'ethereum'} />
              <span className='text-lg font-bold'>{formatEther(transaction.receiveAmount) + ' ETH'}</span>
            </div>
          ) : null}

          <div className='flex flex-col pr-10 py-8 gap-2'>
            <div className='flex gap-2'>
              <Image src={chainIcon} width={25} height={25} alt={transaction.dstChainId.toString()} />
              <p className='text-lg text-black'>{convertToChainName(parseInt(transaction.dstChainId.toString()))}</p>
            </div>
            <Link isExternal isBlock showAnchorIcon href={getExploerUrl(421614) + 'address/' + transaction.to}>
              <span className='text-lg'>{omitText(transaction.to, 8, 8)}</span>
            </Link>
          </div>
        </div>
      </MikiCard>

      <div className='flex gap-10 justify-between'>
        <div className='w-full'>
          <MikiCard width={100} height={100}>
            <div className='p-8'>
              <p className='text-xl font-bold text-black pb-6'>Source Transaction</p>
              <p className='text-lg text-black pb-1'>Transaction hash</p>
              <Link
                isExternal
                isBlock
                showAnchorIcon
                href={getExploerUrl(421614) + 'tx/' + transaction.reqTransaction.hash}
                className='mb-6'
              >
                {omitText(transaction.reqTransaction.hash, 12, 12)}
              </Link>
              <p className='text-lg text-black pb-1'>From</p>
              <Link
                isExternal
                isBlock
                showAnchorIcon
                href={getExploerUrl(421614) + 'address/' + transaction.reqTransaction.from}
                className='mb-6'
              >
                {omitText(transaction.reqTransaction.from, 12, 12)}
              </Link>
              <p className='text-lg text-black pb-1'>Timestamp</p>
              <p className='text-black'>{new Date(transaction.reqTransaction.timestamp * 1000).toLocaleString()}</p>
            </div>
          </MikiCard>
        </div>

        <div className='w-full'>
          <MikiCard width={100} height={100}>
            <div className='p-8'>
              <p className='text-xl font-bold text-black pb-6'>Destination Transaction</p>
              <p className='text-lg text-black pb-1'>Transaction hash</p>
              {transaction.resTransaction ? (
                <Link
                  isExternal
                  isBlock
                  showAnchorIcon
                  href={getExploerUrl(dstChainId) + 'tx/' + transaction.resTransaction.hash}
                  className='mb-6'
                >
                  {omitText(transaction.resTransaction.hash, 12, 12)}
                </Link>
              ) : (
                <Skeleton className='h-6 w-3/5 rounded-lg mb-8' />
              )}

              <p className='text-lg text-black pb-1'>From</p>
              {transaction.resTransaction ? (
                <Link
                  isExternal
                  isBlock
                  showAnchorIcon
                  href={getExploerUrl(dstChainId) + 'address/' + transaction.resTransaction.from}
                  className='mb-6'
                >
                  {omitText(transaction.resTransaction.from, 12, 12)}
                </Link>
              ) : (
                <Skeleton className='h-6 w-3/5 rounded-lg mb-8' />
              )}

              <p className='text-lg text-black pb-1'>Timestamp</p>
              {transaction.resTransaction ? (
                <p className='text-black'>{new Date(transaction.resTransaction.timestamp * 1000).toLocaleString()}</p>
              ) : (
                <Skeleton className='h-6 w-3/5 rounded-lg' />
              )}
            </div>
          </MikiCard>
        </div>
      </div>
    </div>
  )
}
