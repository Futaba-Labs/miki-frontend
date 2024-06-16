export type CrossChainTransaction = {
  id: string
  dstChainId: number
  sender: `0x${string}`
  to: `0x${string}`
  reqTransactionId: `0x${string}`
  resTransactionId: `0x${string}` | null
  reqTransaction: Transaction
  resTransaction: Transaction | null
  status: Status
  timestamp: number
  amount: bigint | null
  fee: bigint | null
  receiveAmount: bigint | null
  asset: `0x${string}` | null
}

export type Transaction = {
  id: string
  hash: `0x${string}`
  from: `0x${string}`
  timestamp: number
}

export type Chain = {
  id: number
  explorer: string
  logo: string
}

export type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'


export enum Status {
  PENDING,
  SUCCESS,
  ERROR,
}
