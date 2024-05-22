export type CrossChainTransaction = {
  id: string
  dstChainId: number
  sender: `0x${string}`
  to: `0x${string}`
  reqTransaction: Transaction
  resTransaction: Transaction
  status: Status
  timestamp: number
}

export type Transaction = {
  id: string
  hash: `0x${string}`
  from: `0x${string}`
  timestamp: number
}

export enum Status {
  PENDING,
  SUCCESS,
  ERROR,
}
