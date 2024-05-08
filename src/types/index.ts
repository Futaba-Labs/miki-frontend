export type Transaction = {
  id: string
  dstChainId: number
  from: `0x${string}`
  reqTransactionHash: `0x${string}`
  resTransactionHash: `0x${string}`
  status: Status
  timestamp: number
}

export enum Status {
  PENDING,
  SUCCESS,
  ERROR,
}
