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
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return <div>{JSON.stringify(data)}</div>
}
