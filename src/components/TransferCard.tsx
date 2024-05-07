'use client'

import 'viem/window'
import { Input, Button, Select, SelectItem, Link } from '@nextui-org/react'
import React, { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { GelatoRelay, CallWithSyncFeeERC2771Request, TaskState } from '@gelatonetwork/relay-sdk'
import { Options } from '@layerzerolabs/lz-v2-utilities'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { createPublicClient, http, parseEther, encodeAbiParameters, encodeFunctionData } from 'viem'
import { arbitrumSepolia } from 'viem/chains'
import { useAccount } from 'wagmi'
import { EXAMPLE_DEPLOYMENT, DEPLOYMENT, ETH_ADAPTER_ABI, ETH_TOKEN_POOL_ABI } from '@/utils'
import MikiCard from './MikiCard'

/* eslint-disable  react/display-name */
export default function TransferCard() {
  const tokens = [
    { key: 'Optimism', value: 'optimism', chainId: 1 },
    { key: 'Base', value: 'base', chainId: 8453 },
  ]

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [selected, setSelected] = useState<any>(new Set(['Select Chain']))
  const [amount, setAmount] = useState(0)
  const [recipient, setRecipient] = useState<`0x${string}`>('0x')
  const [chainId, setChainId] = useState(84532)
  const [loading, setLoading] = useState(false)

  const selectedValue = useMemo(() => {
    const value = Array.from(selected).join(', ').replaceAll('_', ' ')
    return value
  }, [selected])

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

  const transfer = () => {
    setLoading(true)

    /* eslint-disable no-async-promise-executor */
    return new Promise<void>(async (resolve, reject) => {
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
      const nft = EXAMPLE_DEPLOYMENT[chainId.toString()].nft

      const fee = await client.readContract({
        address: DEPLOYMENT.ethAdapter as `0x${string}`,
        abi: ETH_ADAPTER_ABI,
        functionName: 'estimateFee',
        args: [address, chainId, nft, nft, encodedRecipient, parsedAmount, params],
      })

      const data = encodeFunctionData({
        abi: ETH_TOKEN_POOL_ABI,
        functionName: 'crossChainContractCallRelay',
        args: [chainId, nft, encodedRecipient, fee, params],
      })

      const request: CallWithSyncFeeERC2771Request = {
        chainId: BigInt(421614), // Goerli in this case
        target: DEPLOYMENT.ethTokenPool, // target contract address
        data: data as `0x${string}`, // encoded transaction datas
        isRelayContext: true, // are we using context contracts
        feeToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // token to pay the relayer
        user: address as `0x${string}`,
      }

      const provider = new ethers.BrowserProvider(window.ethereum!)

      let taskId = ''
      try {
        const relayResponse = await relay.callWithSyncFeeERC2771(request, provider, undefined)
        taskId = relayResponse.taskId
      } catch (error) {
        toast.error('Transfer failed', { position: 'bottom-right' })
        setLoading(false)
        return
      }

      let retry = 0
      const intervalId = setInterval(async () => {
        const status = await relay.getTaskStatus(taskId)
        if (status?.taskState === TaskState.ExecSuccess) {
          toast.success(
            <>
              <p>Transfer successful!</p>
              {'View on'}
              <Link
                isExternal
                isBlock
                showAnchorIcon
                href={`https://testnet.layerzeroscan.com/tx/${status.transactionHash}`}
              >
                LayerZero scan
              </Link>
            </>,
            { position: 'bottom-right' },
          )
          setLoading(false)
          clearInterval(intervalId)
        }

        if (status?.taskState === TaskState.ExecReverted || status?.taskState === TaskState.Cancelled) {
          toast.error('Transfer failed', { position: 'bottom-right' })
          setLoading(false)
          clearInterval(intervalId)
        }

        if (retry > 5) {
          toast.error('Timeout', { position: 'bottom-right' })
          setLoading(false)
          clearInterval(intervalId)
        }

        retry++
      }, 3000)
    })
  }

  return (
    <MikiCard width={300} height={300}>
      <div className='flex justify-between items-center px-8 py-8'>
        <span className='font-bold text-black text-xl'>Transfer</span>

        <div className='flex flex-col items-end w-full gap-4'>
          <Input
            type='text'
            label='Amount'
            labelPlacement='outside'
            placeholder='0.01'
            radius='sm'
            className='w-128'
            classNames={{
              label: 'text-black text-sm',
              input: ['text-black', 'placeholder:text-default-700/50 dark:placeholder:text-white/60'],
              inputWrapper: [
                'shadow-inner',
                'bg-default-200/50',
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
            onChange={handleSetAmount}
          />
          <Input
            type='text'
            label='Address'
            labelPlacement='outside'
            placeholder='0x...'
            radius='sm'
            className='w-128'
            classNames={{
              label: 'text-black text-sm',
              input: ['text-black', 'placeholder:text-default-700/50 dark:placeholder:text-white/60'],
              inputWrapper: [
                'shadow-inner',
                'bg-default-200/50',
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
            onChange={handleSetAddress}
          />
          <Select
            items={tokens}
            defaultSelectedKeys={['ETH']}
            className='text-green w-128'
            radius='sm'
            onSelectionChange={setSelected}
            labelPlacement='outside'
            label='Chain'
            placeholder='Select chain'
            startContent={
              selectedValue !== '' &&
              selectedValue !== 'Select Chain' && (
                <Image src={`/logo/${selectedValue.toLowerCase()}.svg`} width={25} height={25} alt={selectedValue} />
              )
            }
            renderValue={(items) => {
              if (selectedValue === 'Select Chain') {
                return <p className='text-green pl-1 font-bold text-lg'>Select Chain</p>
              }
              return items.map((item) => (
                <p key={item.key} className='text-green pl-1 font-bold text-lg'>
                  {item.key!.toString()}
                </p>
              ))
            }}
          >
            {tokens.map((token) => (
              <SelectItem
                key={token.key}
                value={token.value}
                startContent={<Image src={`/logo/${token.value}.svg`} width={25} height={25} alt={token.value} />}
              >
                <span className='text-black'>{token.key}</span>
              </SelectItem>
            ))}
          </Select>
          <div className='flex justify-center w-128'>
            <Button
              isLoading={loading}
              radius='sm'
              onClick={() => transfer()}
              startContent={!loading ? <Image src={'/icon/send.svg'} width={18} height={18} alt='send' /> : null}
              className='bg-button drop-shadow-button hover:bg-green-100 focus:ring'
            >
              <span className='text-green font-bold text-lg'>{loading ? 'Sending...' : 'Send'}</span>
            </Button>
          </div>
        </div>
      </div>
    </MikiCard>
  )
}
