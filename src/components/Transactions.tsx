'use client'

import { gql, useQuery } from '@apollo/client'

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    crossChainExecs {
      items {
        dstChainId
        id
        sender
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
  const { loading, error, data } = useQuery(GET_TRANSACTIONS)
  return <div>{JSON.stringify(data)}</div>
}
