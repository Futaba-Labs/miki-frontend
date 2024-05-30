import { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import { DEPLOYMENT, L2_ASSET_MANAGER_ABI } from '@/utils'

export const useDepositAmount = () => {
  const [balance, setBalance] = useState(0)

  const { address } = useAccount()

  const { refetch, data } = useReadContract({
    abi: L2_ASSET_MANAGER_ABI,
    address: DEPLOYMENT.l2AssetManager as `0x${string}`,
    functionName: 'getDeposit',
    args: [DEPLOYMENT.ethTokenPool, address],
  })

  useEffect(() => {
    if (address) {
      refetch()
    }
  }, [address])

  useEffect(() => {
    if (data) {
      const formattedBalance = parseFloat(formatEther(data as bigint))
      setBalance(formattedBalance)
    }
  }, [data])

  return balance
}
