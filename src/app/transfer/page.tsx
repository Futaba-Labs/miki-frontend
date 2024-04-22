'use client'
import 'viem/window'
import { DepositCard, TransferCard } from '@/components'
import { CardBody, CardHeader, Input, Tab, Tabs } from '@nextui-org/react'
import { SetStateAction, useCallback, useState } from 'react'
import { writeContract } from 'viem/actions'
import { useAccount, useWriteContract } from 'wagmi'
import { GelatoRelay, CallWithSyncFeeERC2771Request } from '@gelatonetwork/relay-sdk'
import { createPublicClient, encodeAbiParameters, encodeFunctionData, http, parseEther } from 'viem'
import { DEPLOYMENT, ETH_ADAPTER_ABI, ETH_TOKEN_POOL_ABI } from '@/utils'
import { Options } from '@layerzerolabs/lz-v2-utilities'
import { arbitrumSepolia } from 'viem/chains'
import { BrowserProvider, ethers } from 'ethers'

export default function Transfer() {
  const [selected, setSelected] = useState('ETH')
  const [amount, setAmount] = useState(0)
  const [recipient, setRecipient] = useState<`0x${string}`>('0x')
  const [chainId, setChainId] = useState(84532)

  const { address } = useAccount()

  const client = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(),
  })
  const relay = new GelatoRelay()

  const handleSetAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value)),
    [setAmount],
  )

  const handleSetAddress = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value as `0x${string}`),
    [setRecipient],
  )

  const transfer = async () => {
    const parsedAmount = parseEther(amount.toString())
    const encodedRecipient = encodeAbiParameters([{ type: 'address', name: 'recipient' }], [recipient])
    const _options = Options.newOptions().addExecutorLzReceiveOption(1000000, 0)
    const params = encodeAbiParameters(
      [
        { type: 'bytes', name: 'options' },
        { type: 'bytes', name: 'sgParams' },
      ],
      [_options.toHex() as `0x${string}`, '0x0'],
    )

    const fee = await client.readContract({
      address: DEPLOYMENT.ethAdapter as `0x${string}`,
      abi: ETH_ADAPTER_ABI,
      functionName: 'estimateFee',
      args: [
        address,
        chainId,
        '0x7529afb262e776620a52e143d3610299A3F0C013',
        '0x7529afb262e776620a52e143d3610299A3F0C013',
        encodedRecipient,
        parsedAmount,
        params,
      ],
    })

    const data = encodeFunctionData({
      abi: ETH_TOKEN_POOL_ABI,
      functionName: 'crossChainContractCallRelay',
      args: [chainId, '0x7529afb262e776620a52e143d3610299A3F0C013', encodedRecipient, fee, params],
    })

    const request: CallWithSyncFeeERC2771Request = {
      chainId: BigInt(421614), // Goerli in this case
      target: DEPLOYMENT.ethTokenPool, // target contract address
      data: data as `0x${string}`, // encoded transaction datas
      isRelayContext: true, // are we using context contracts
      feeToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // token to pay the relayer
      user: address as `0x${string}`,
    }
    const provider = new ethers.BrowserProvider(window.ethereum)

    const relayResponse = await relay.callWithSyncFeeERC2771(request, provider)
    let taskId = relayResponse.taskId
    console.log(`https://relay.gelato.digital/tasks/status/${taskId}`)
  }

  return (
    <div className='grid lg:grid-cols-12 content-center h-[calc(100vh-74px)] gap-x-24 lg:grid-flow-row'>
      <div className='col-start-4 col-end-7 h-[350px]'>
        <DepositCard tab={selected} width={300} height={350} />
      </div>
      <div className='col-start-7 col-end-10 h-[350px]'>
        <TransferCard onClick={transfer} setAmount={handleSetAmount} setAddress={handleSetAddress} isPending={false} />
      </div>
    </div>
  )
}
