'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { Input, Button, Link, Select, SelectItem } from '@nextui-org/react'
import { useAccount, useBalance, useWriteContract } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { toast } from 'react-toastify'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
// import { DEPLOYMENT, L2_ASSET_MANAGER_ABI } from '@/utils'
import { CHAIN_ID } from '@/utils/constants'
import { roundedNumber } from '@/utils/helper'
import { L2_ASSET_MANAGER_ABI, DEPLOYMENT } from '@/utils'
import MikiCard from './MikiCard'

const items = [
  { key: 'Deposit', value: 'Deposit' },
  { key: 'Withdraw', value: 'Withdraw' },
]

export default function AccountOperations() {
  const [amount, setAmount] = useState('')

  const { address, chainId } = useAccount()
  const { data: balance, refetch: refetchBalance } = useBalance({
    address: address as `0x${string}`,
  })
  const { writeContract, isPending, isSuccess, isError, data } = useWriteContract()
  const addRecentTransaction = useAddRecentTransaction()

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [selected, setSelected] = useState<any>(new Set(['Deposit']))
  const selectedValue = useMemo(() => {
    const value = Array.from(selected).join(', ').replaceAll('_', ' ')
    return value
  }, [selected])

  const handleDeposit = async () => {
    if (chainId !== CHAIN_ID) {
      toast.error('Please connect to Arbitrum Sepolia', { position: 'bottom-right' })
      return
    }

    if (balance) {
      if (balance.value < parseEther((parseFloat(amount) - 0.001).toString())) {
        toast.error('Insufficient balance', { position: 'bottom-right' })
        return
      }
    } else {
      toast.error('Unable to fetch balance', { position: 'bottom-right' })
      return
    }

    // const walletClient = createWalletClient({
    //   chain: arbitrumSepolia,
    //   transport: custom(window.ethereum!),
    // })

    // const [account] = await walletClient.getAddresses()

    // const request = await walletClient.prepareTransactionRequest({
    //   account,
    //   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    //   value: parseEther(amount.toString()),
    // })

    // console.log(request)

    // const signature = await walletClient.signMessage({
    //   account,
    //   message: {
    //     raw: ,
    //   },
    // })

    // console.log(signature)

    writeContract({
      abi: L2_ASSET_MANAGER_ABI,
      address: DEPLOYMENT.l2AssetManager as `0x${string}`,
      functionName: 'depositETH',
      args: [parseEther(amount.toString())],
      value: parseEther(amount.toString()),
    })
  }

  const handleWithdraw = () => {
    // TODO: implement
  }

  const handleSetAmount = useCallback(
    (value: string) => {
      setAmount(value)
    },
    [setAmount],
  )

  const hanndleMax = async (value: bigint | undefined) => {
    if (value) {
      setAmount((parseFloat(formatEther(value)) - 0.001).toString())
    }
  }

  const convertToEther = (value: bigint | undefined) => {
    if (value) {
      const formattedBalance = parseFloat(formatEther(value))
      return roundedNumber(formattedBalance, 4)
    }
    return 0
  }

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        addRecentTransaction({
          hash: data,
          description: 'Deposit ETH',
        })
        toast.success(
          <>
            <p>Deposit successful!</p>
            {'View on'}
            <Link isExternal isBlock showAnchorIcon href={`https://sepolia.arbiscan.io/tx/${data}`}>
              Arbiscan
            </Link>
          </>,
          { position: 'bottom-right' },
        )
      } else {
        toast.success('Deposit successful!', { position: 'bottom-right' })
      }
    } else if (isError) {
      toast.error('Deposit failed', { position: 'bottom-right' })
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (address) {
      refetchBalance()
    }
  }, [address])

  return (
    <div>
      <div className='flex justify-end drop-shadow-customp pb-8'>
        <Select
          items={items}
          defaultSelectedKeys={['Deposit']}
          className='text-green w-36'
          radius='sm'
          onSelectionChange={setSelected}
          renderValue={(items) => {
            return items.map((item) => (
              <p key={item.key} className='text-green pl-1 font-bold text-lg'>
                {item.key!.toString()}
              </p>
            ))
          }}
        >
          {items.map((token) => (
            <SelectItem key={token.key} value={token.value}>
              <span className='text-black'>{token.value}</span>
            </SelectItem>
          ))}
        </Select>
      </div>
      <MikiCard width={300} height={300}>
        <div className='flex justify-between items-center px-8 py-10'>
          <span className='font-bold text-black text-xl'>
            {selectedValue === 'Deposit' ? 'Add Funds' : 'Withdraw Funds'}
          </span>
          <div className=''>
            {selectedValue === 'Deposit' ? (
              <div className='flex items-end gap-2 w-full'>
                <div>
                  <Input
                    type='number'
                    label='Amount'
                    labelPlacement='outside'
                    placeholder='0'
                    radius='sm'
                    min={0}
                    step='any'
                    className='w-80'
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
                    onValueChange={handleSetAmount}
                    value={amount.toString()}
                    endContent={
                      <div className='flex gap-1  '>
                        <div className='flex gap-1'>
                          <span className='text-black text-sm'>Balance:</span>
                          <span className='text-black text-sm'>{convertToEther(balance?.value)}</span>
                        </div>
                        <Button
                          color='success'
                          variant='flat'
                          className='h-1/2 min-w-10 px-2'
                          onClick={() => hanndleMax(balance?.value)}
                        >
                          <span className='p-0 m-0'>Max</span>
                        </Button>
                      </div>
                    }
                  />
                </div>
                <div style={{ marginTop: '64px' }}></div>
                <Button
                  isLoading={isPending}
                  radius='sm'
                  onClick={() => handleDeposit()}
                  className='bg-button drop-shadow-button hover:bg-green-100 focus:ring'
                >
                  <span className='text-green font-bold text-lg'>{isPending ? 'Depositing...' : 'Deposit'}</span>
                </Button>
              </div>
            ) : (
              <div className='flex items-end gap-2 w-full'>
                <div>
                  <Input
                    type='text'
                    label='Amount'
                    labelPlacement='outside'
                    placeholder='0.01'
                    radius='sm'
                    className='w-80'
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
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: '64px' }}></div>
                <Button
                  isLoading={isPending}
                  radius='sm'
                  onClick={() => handleWithdraw()}
                  className='bg-button drop-shadow-button hover:bg-green-100 focus:ring'
                >
                  <span className='text-green font-bold text-lg'>{isPending ? 'Withdrawing...' : 'Withdraw'}</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </MikiCard>
    </div>
  )
}
