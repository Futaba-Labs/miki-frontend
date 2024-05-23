'use client'

import { Chip, Link } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CrossChainTransaction } from '@/types'
import { calculateTimeDifference, omitText, getExploerUrl, getChainIconUrl, getColor } from '@/utils/helper'

type Props = {
  transaction: CrossChainTransaction
}

const getProtocol = (to: string) => {
  switch (to.toLowerCase()) {
    case '0x6a7a87ae550dd0190f7c844a51a7f9f258efbda5':
      return 'NFT Mint'
    case '0xaad783b36b84ad14979ce68deecb390523784502':
      return 'NFT Mint'
    case '0xb49D3728F8C069866260B682941F57Bd389669f7'.toLowerCase():
      return 'AAVE Deposit'
    default:
      return 'Magic Transfer'
  }
}

export default function TransactionCard({ transaction }: Props) {
  const color = getColor(transaction.status.toString())
  const chainIcon = getChainIconUrl(parseInt(transaction.dstChainId.toString()))
  const router = useRouter()

  return (
    <tr
      className={'shadow-inner bg-white rounded-[16px] hover:bg-gray-100 cursor-pointer'}
      onClick={() => router.push(`/explorer/${transaction.id}`)}
    >
      <td className='py-5 pl-5 rounded-l-[16px]'>
        <Chip color={color}>
          <p className='text-white font-bold text-md'>{transaction.status}</p>
        </Chip>
      </td>

      <td>
        <Link isExternal isBlock showAnchorIcon href={getExploerUrl(421614) + 'tx/' + transaction.reqTransaction.hash}>
          {omitText(transaction.reqTransaction.hash, 8, 8)}
        </Link>
      </td>
      <td>
        <Link isExternal isBlock showAnchorIcon href={getExploerUrl(421614) + 'address/' + transaction.sender}>
          {omitText(transaction.sender, 8, 8)}
        </Link>
      </td>
      <td>
        {transaction.resTransaction && (
          <div className='flex gap-1'>
            <Image src={chainIcon} width={20} height={20} alt={transaction.dstChainId.toString()} />
            <Link
              isExternal
              isBlock
              showAnchorIcon
              href={
                getExploerUrl(parseInt(transaction.dstChainId.toString())) + 'tx/' + transaction.resTransaction.hash
              }
            >
              {omitText(transaction.resTransaction.hash, 8, 8)}
            </Link>
          </div>
        )}
      </td>
      <td>{getProtocol(transaction.to)}</td>
      <td className='rounded-r-[16px]'>{calculateTimeDifference(new Date(transaction.timestamp * 1000))}</td>
    </tr>
  )
}
