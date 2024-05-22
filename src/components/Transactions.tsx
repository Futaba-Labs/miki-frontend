'use client'

import { gql, useQuery } from '@apollo/client'
import { Input, Button, Spinner, Pagination } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { CrossChainTransaction } from '@/types'
import TransactionCard from './TransactionCard'

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    crossChainExecs(orderBy: "timestamp", orderDirection: "desc", limit: 25) {
      items {
        dstChainId
        id
        sender
        to
        status
        timestamp
        reqTransaction {
          hash
        }
        resTransaction {
          hash
        }
      }
    }
  }
`

export default function Transactions() {
  const { loading, error, data, refetch } = useQuery(GET_TRANSACTIONS)
  const [transactions, setTransactions] = useState<CrossChainTransaction[]>([])
  const [searchParam, setSearchParam] = useState('')

  const handlePagination = (page: number) => {
    const start = (page - 1) * 5
    const end = page * 5
    setTransactions(data.crossChainExecs.items.slice(start, end))
  }

  setInterval(() => {
    console.log('refetching')
    refetch()
  }, 10000)

  useEffect(() => {
    if (data) {
      setTransactions(data.crossChainExecs.items.slice(0, 5))
    }
  }, [data])

  if (loading)
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
  if (error) return <p>Error : {error.message}</p>

  return (
    <div className='w-full'>
      <div className='flex items-end justify-center gap-2 w-full py-10'>
        <Input
          type='text'
          label='Search by Sender Address or Transaction Hash'
          labelPlacement='outside'
          placeholder='0x...'
          radius='sm'
          className='w-2/5'
          classNames={{
            label: 'text-black text-sm',
            input: ['text-black', 'placeholder:text-default-700/50 dark:placeholder:text-white/60'],
            inputWrapper: [
              'shadow-inner',
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
          onChange={(e) => setSearchParam(e.target.value)}
        />
        <div style={{ marginTop: '64px' }}></div>
        <Button radius='sm' onClick={() => {}} className='bg-button drop-shadow-button hover:bg-green-100 focus:ring'>
          <span className='text-green font-bold text-lg'>Search</span>
        </Button>
      </div>

      <div className='px-10 w-full'>
        <table className='w-full border-spacing-y-4 border-separate'>
          <tr className='text-left'>
            <th className='font-bold text-black text-xl pl-5'>Status</th>
            <th className='font-bold text-black text-xl'>Source Tx Hash</th>
            <th className='font-bold text-black text-xl'>From</th>
            <th className='font-bold text-black text-xl'>Destination Tx Hash</th>
            <th className='font-bold text-black text-xl'>Protocol</th>
            <th className='font-bold text-black text-xl'>Created</th>
          </tr>
          {transactions.map((transaction: CrossChainTransaction) => {
            return <TransactionCard key={transaction.id} {...transaction} />
          })}
        </table>
        <div className='flex justify-center'>
          <Pagination
            showControls
            total={
              data.crossChainExecs.items.length / 5 >= 5 ? 5 : Math.floor(data.crossChainExecs.items.length / 5) + 1
            }
            initialPage={1}
            classNames={{
              cursor: ['bg-green'],
              item: ['bg-grey'],
            }}
            onChange={handlePagination}
          />
        </div>
      </div>
    </div>
  )
}
