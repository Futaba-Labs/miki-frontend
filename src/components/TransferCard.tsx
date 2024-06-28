'use client'

import 'viem/window'
import {
  Input,
  Button,
  Select,
  SelectItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { GelatoRelay, CallWithSyncFeeERC2771Request, TaskState } from '@gelatonetwork/relay-sdk'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { parseEther, encodeFunctionData } from 'viem'
import { useAccount } from 'wagmi'
import { useSearchParams } from 'next/navigation'
import { DEPLOYMENT, ETH_TOKEN_POOL_ABI } from '@/utils'
import { roundedNumber } from '@/utils/helper'
import { useDepositAmount } from '@/hooks'
import { getMagicTransferChainKeys, getChainIdByChainKey, getChainIconUrl, ChainKey } from '@/utils/constants/chain'
import MikiCard from './MikiCard'

const getChainOptions = () => {
  const chains = getMagicTransferChainKeys()
  return chains.map((chain) => {
    const chainId = getChainIdByChainKey(chain)
    return { key: chain, value: chain, chainId: chainId }
  })
}

export default function TransferCard() {
  const chains = getChainOptions()

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [selected, setSelected] = useState<any>(new Set(['Select Chain']))
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState<`0x${string}`>('0x')
  const [chainId, setChainId] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const selectedValue = useMemo(() => {
    const value = Array.from(selected).join(', ').replaceAll('_', ' ')

    const chain = chains.find((token) => token.key === value)
    if (chain) {
      setChainId(chain.chainId)
    }

    return value
  }, [selected])

  console.log(`selected value: ${selectedValue}`)

  const { address } = useAccount()
  const balance = useDepositAmount()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const params = useSearchParams()

  const amountParam = params.get('amount')
  const recipientParam = params.get('recipient')
  const chainParam = params.get('chainId')

  const relay = new GelatoRelay()

  const handleSetAmount = useCallback(
    (value: string) => {
      setAmount(value)
    },
    [setAmount],
  )

  const handleSetAddress = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value as `0x${string}`),
    [setRecipient],
  )

  const hanndleMax = async (value: number) => {
    if (value) {
      setAmount((value - 0.001).toString())
    }
  }

  const transfer = () => {
    if (amount === '0') {
      toast.error('Amount must be greater than 0', { position: 'bottom-right' })
      return
    }

    if (recipient === '0x') {
      toast.error('Recipient address is required', { position: 'bottom-right' })
      return
    }

    if (selectedValue === 'Select Chain') {
      toast.error('Select chain', { position: 'bottom-right' })
      return
    }

    if (balance) {
      if (parseEther(balance.toString()) < parseEther((parseFloat(amount) - 0.001).toString())) {
        toast.error('Insufficient balance', { position: 'bottom-right' })
        return
      }
    } else {
      toast.error('Unable to fetch balance', { position: 'bottom-right' })
      return
    }

    setLoading(true)

    /* eslint-disable no-async-promise-executor */
    return new Promise<void>(async (resolve, reject) => {
      const parsedAmount = parseEther(amount.toString())

      const data = encodeFunctionData({
        abi: ETH_TOKEN_POOL_ABI,
        functionName: 'crossChainTransferAssetRelay',
        args: [chainId, recipient, 0, parsedAmount, ''],
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
            </>,
            { position: 'bottom-right' },
          )
          setLoading(false)
          clearInterval(intervalId as unknown as number)
        }

        if (status?.taskState === TaskState.ExecReverted || status?.taskState === TaskState.Cancelled) {
          toast.error('Transfer failed', { position: 'bottom-right' })
          setLoading(false)
          clearInterval(intervalId as unknown as number)
        }

        if (retry > 5) {
          toast.error('Timeout', { position: 'bottom-right' })
          setLoading(false)
          clearInterval(intervalId as unknown as number)
        }

        retry++
      }, 3000)
    })
  }

  const createTransferLink = (transferAmount: number, to: string, dstChainId: number) => {
    const currentUrl = window.location.href
    const url = new URL(currentUrl)
    url.searchParams.set('amount', transferAmount.toString())
    url.searchParams.set('recipient', to)
    url.searchParams.set('chainId', dstChainId.toString())
    return url.href
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  useEffect(() => {
    if (amountParam) {
      setAmount(amountParam)
    }
    console.log('recipientParam', recipientParam)
    if (recipientParam) {
      setRecipient(recipientParam as `0x${string}`)
    } else {
      if (address) {
        setRecipient(address)
      }
    }
    if (chainParam) {
      const chain = chains.find((chain) => chain.chainId === parseInt(chainParam))
      console.log('chain', chain)
      if (chain) {
        setSelected(new Set([chain.key]))
      }
    }
  }, [address, params])

  return (
    <>
      <MikiCard width={300} height={300}>
        <div className='flex justify-between items-center px-8 py-8'>
          <span className='font-bold text-black text-xl'>Transfer</span>

          <div className='flex flex-col items-end w-full gap-4'>
            <Input
              type='number'
              label='Amount'
              labelPlacement='outside'
              placeholder='0'
              min={0}
              step='any'
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
              defaultValue={amountParam ? amountParam.toString() : ''}
              value={amount.toString()}
              onValueChange={handleSetAmount}
              endContent={
                <div className='flex gap-1  '>
                  <div className='flex gap-1'>
                    <span className='text-black text-sm'>Balance:</span>
                    <span className='text-black text-sm'>{roundedNumber(balance, 4)}</span>
                  </div>
                  <Button
                    color='success'
                    variant='flat'
                    className='h-1/2 min-w-10 px-2'
                    onClick={() => hanndleMax(balance)}
                  >
                    <span className='p-0 m-0'>Max</span>
                  </Button>
                </div>
              }
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
              value={recipient}
              onChange={handleSetAddress}
            />
            <Select
              items={chains}
              className='text-green w-128'
              radius='sm'
              onSelectionChange={setSelected}
              labelPlacement='outside'
              label='Chain'
              placeholder='Select chain'
              defaultSelectedKeys={selectedValue && [selectedValue]}
              startContent={
                selectedValue !== '' &&
                selectedValue !== 'Select Chain' && (
                  <div className='flex rounded-full items-center justify-center z-0'>
                    <Image
                      src={getChainIconUrl(getChainIdByChainKey(selectedValue as ChainKey))}
                      width={25}
                      height={25}
                      alt={selectedValue}
                      className='rounded-full'
                    />
                  </div>
                )
              }
              renderValue={(items) => {
                if (selectedValue === 'Select Chain') {
                  return <p className='text-green pl-1 font-bold text-lg'>Select Chain</p>
                } else {
                  return <p className='text-green pl-1 font-bold text-lg'>{selectedValue}</p>
                }
              }}
            >
              {chains.map((token) => (
                <SelectItem
                  key={token.key}
                  value={token.value}
                  startContent={
                    <div className='flex rounded-full items-center justify-center z-0'>
                      <Image
                        src={getChainIconUrl(token.chainId)}
                        width={25}
                        height={25}
                        alt={token.value}
                        className='rounded-full'
                      />
                    </div>
                  }
                >
                  <span className='text-black'>{token.key}</span>
                </SelectItem>
              ))}
            </Select>
            <div className='flex justify-center gap-4 w-128'>
              <Button
                isLoading={loading}
                radius='sm'
                onClick={() => transfer()}
                startContent={!loading ? <Image src={'/icon/send.svg'} width={18} height={18} alt='send' /> : null}
                className='bg-button drop-shadow-button hover:bg-green-100 focus:ring'
              >
                <span className='text-green font-bold text-lg'>{loading ? 'Sending...' : 'Send'}</span>
              </Button>
              <Button
                radius='sm'
                onClick={onOpen}
                className='bg-button drop-shadow-button hover:bg-green-100 focus:ring'
              >
                <span className='text-green font-bold text-lg'>Create Link</span>
              </Button>
            </div>
          </div>
        </div>
      </MikiCard>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1 text-black'>Transfer Link</ModalHeader>
              <ModalBody>
                <p className='text-black pb-2'>You can share this link with others to request token transfer.</p>
                <span className='overflow-auto text-black'>
                  {createTransferLink(parseFloat(amount), recipient, chainId)}
                </span>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius='sm'
                  onClick={() => handleCopy(createTransferLink(parseFloat(amount), recipient, chainId))}
                  className='bg-button drop-shadow-button hover:bg-green-100'
                >
                  <span className='text-green font-bold text-lg'>{isCopied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
