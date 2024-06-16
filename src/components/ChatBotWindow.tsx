'use client'

import ChatBot from 'react-simple-chatbot'
import { toast } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { parseEther, encodeAbiParameters, createPublicClient, http, encodeFunctionData } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'
import { Options } from '@layerzerolabs/lz-v2-utilities'
import { arbitrumSepolia } from 'viem/chains'
import { CallWithSyncFeeERC2771Request, GelatoRelay, TaskState } from '@gelatonetwork/relay-sdk'
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { DEPLOYMENT, ETH_ADAPTER_ABI, ETH_TOKEN_POOL_ABI, EXAMPLE_DEPLOYMENT } from '@/utils'
import { convertToChainName, getChainIconUrl } from '@/utils/helper'
import { getFee } from '@/utils/axelar'

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#1F8506',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#1F8506',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
}

export default function ChatBotWindow() {
  const chatbotSteps = [
    {
      id: '1',
      message: "Hello! Let's explore Web3 New Chain Adventure. What would you like to do?",
      trigger: 'dapps',
    },
    {
      id: 'dapps',
      options: [
        { value: 'NFT', label: 'NFT Mint', trigger: '3' },
        { value: 'DeFi', label: 'DeFi', trigger: '10' },
      ],
    },
    {
      id: '3',
      message: "Sounds good! Let's get our hands on some new NFTs. Which option would you like to explore?",
      trigger: 'nftOption',
    },
    {
      id: 'nftOption',
      options: [
        { value: 'Free', label: 'Free Mint', trigger: '5' },
        { value: 'Token', label: 'Token Payment', trigger: '7' },
      ],
    },
    {
      id: '5',
      message: 'Which NFT would you like to mint?',
      trigger: '6',
    },
    {
      id: '6',
      options: [
        { value: 'NFT1', label: 'NFT1', trigger: '9' },
        { value: 'NFT2', label: 'NFT2', trigger: '9' },
        { value: 'NFT3', label: 'NFT3', trigger: '9' },
      ],
    },
    {
      id: '7',
      message: 'Which NFT would you like to mint? NFTs are available for minting at a rate of 10 USD each.',
      trigger: '8',
    },
    {
      id: '8',
      options: [
        { value: 'NFT1', label: 'NFT1', trigger: '9' },
        { value: 'NFT2', label: 'NFT2', trigger: '9' },
        { value: 'NFT3', label: 'NFT3', trigger: '9' },
      ],
    },
    {
      id: '9',
      message: 'Which chain do you want to execute the transaction on?',
      trigger: 'chainNFT',
    },
    {
      id: 'chainNFT',
      options: [
        { value: '11155420', label: 'Optimism Sepolia', trigger: '32' },
        { value: '84532', label: 'Base Sepolia', trigger: '32' },
        { value: '5003', label: 'Mantle Sepolia', trigger: '32' },
        { value: '534351', label: 'Scroll Sepolia', trigger: '32' },
        { value: '43113', label: 'Avalanche Fuji', trigger: '32' },
        { value: '97', label: 'BNB Testnet', trigger: '32' },
        { value: '168587773', label: 'Blast Sepolia', trigger: '32' },
      ],
    },
    {
      id: '10',
      message: 'Complete DeFi KYC to update your SBT. Which type of product would you like to experiment?',
      trigger: '11',
    },
    {
      id: '11',
      options: [{ value: 'Lending (AAVE)', label: 'Lending (AAVE)', trigger: '12' }],
    },
    {
      id: '12',
      message: "Let's lend some assets! Currently, you can lend USDC on Solana. How much would you like to lend?",
      trigger: 'amount',
    },
    {
      id: 'amount',
      user: true,
      validator: (value: number) => {
        if (isNaN(value)) {
          return 'value should be a number'
        }

        if (value <= 0) {
          return 'value should be greater than 0'
        }

        return true
      },
      trigger: '30',
    },

    {
      id: '30',
      message: 'Which chain do you want to execute the transaction on?',
      trigger: 'chainLending',
    },
    {
      id: 'chainLending',
      options: [
        { value: '11155420', label: 'Optimism Sepolia', trigger: '32' },
        { value: '84532', label: 'Base Sepolia', trigger: '32' },
        { value: '534351', label: 'Scroll Sepolia', trigger: '32' },
      ],
    },
    {
      id: '32',
      message: 'Great! Check out your transaction',
      end: true,
    },
  ]

  const [dapps, setDapps] = useState(''),
    [nftOption, setNftOption] = useState(''),
    [defiOption, setDefiOption] = useState(''),
    [amount, setAmount] = useState(BigInt(0)),
    [chain, setChain] = useState(0),
    [loading, setLoading] = useState(false)

  const { address } = useAccount()

  const client = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(),
  })

  const relay = new GelatoRelay()

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { writeContract, isPending, isSuccess, isError, data } = useWriteContract()
  const addRecentTransaction = useAddRecentTransaction()

  const handleEnd = ({ values }: { values: Array<string> }) => {
    setChain(parseInt(values[3]))
    if (values[0] === 'NFT') {
      setDapps('NFT')
      setNftOption(values[1])
      if (values[1] === 'Token') {
        setAmount(parseEther('0.001'))
      }
    } else {
      setDapps('DeFi')
      setDefiOption(values[1])
      setAmount(parseEther(values[2]))
    }
    onOpen()
  }

  const relayTxn = () => {
    if (!address) {
      toast.error('Please connect your wallet', { position: 'bottom-right' })
      return
    }

    setLoading(true)

    /* eslint-disable no-async-promise-executor */
    return new Promise<void>(async (resolve, reject) => {
      let data = ''
      if (dapps === 'NFT') {
        const parsedAmount = parseEther(amount.toString())
        const encodedRecipient = encodeAbiParameters([{ type: 'address', name: 'recipient' }], [address])
        const _options = Options.newOptions().addExecutorLzReceiveOption(1000000, 0)
        const params = encodeAbiParameters(
          [
            { type: 'bytes', name: 'options' },
            { type: 'bytes', name: 'sgParams' },
          ],
          [_options.toHex() as `0x${string}`, '0x0'],
        )
        const nft = EXAMPLE_DEPLOYMENT[chain.toString()].nft

        let fee = BigInt(0)
        if (chain === 5003) {
          fee = await getFee()
        } else {
          fee = (await client.readContract({
            address: DEPLOYMENT.ethAdapter as `0x${string}`,
            abi: ETH_ADAPTER_ABI,
            functionName: 'estimateFee',
            args: [address, chain, nft, nft, encodedRecipient, parsedAmount, params],
          })) as bigint
        }

        data = encodeFunctionData({
          abi: ETH_TOKEN_POOL_ABI,
          functionName: 'crossChainContractCallRelay',
          args: [chain, nft, encodedRecipient, fee, params],
        })
      } else {
        const aave = EXAMPLE_DEPLOYMENT[chain.toString()].aave
        const weth = EXAMPLE_DEPLOYMENT[chain.toString()].weth

        const encodedMsg = encodeAbiParameters([{ type: 'address', name: 'weth' }], [weth!])

        data = encodeFunctionData({
          abi: ETH_TOKEN_POOL_ABI,
          functionName: 'crossChainContractCallWithAssetRelay',
          args: [chain, aave, encodedMsg, 0, amount, '0x'],
        })
      }

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
        console.log(relayResponse)
        taskId = relayResponse.taskId
      } catch (error) {
        onClose()
        toast.error('Transfer failed', { position: 'bottom-right' })
        return
      }

      let retry = 0
      const intervalId = setInterval(async () => {
        const status = await relay.getTaskStatus(taskId)
        if (status?.taskState === TaskState.ExecSuccess) {
          if (dapps === 'NFT') {
            toast.success(
              <>
                <p>Transfer successful!</p>
                {'View on'}
                <Link
                  isExternal
                  isBlock
                  showAnchorIcon
                  href={
                    chain === 5003
                      ? `https://testnet.axelarscan.io/gmp/${status.transactionHash}`
                      : `https://testnet.layerzeroscan.com/tx/${status.transactionHash}`
                  }
                >
                  {chain === 5003 ? 'Axelar scan' : 'LayerZero scan'}
                </Link>
              </>,
              { position: 'bottom-right' },
            )
          } else {
            toast.success('Transfer successful!', { position: 'bottom-right' })
          }
          onClose()
          clearInterval(intervalId)
        }

        if (status?.taskState === TaskState.ExecReverted || status?.taskState === TaskState.Cancelled) {
          toast.error('Transfer failed', { position: 'bottom-right' })
          onClose()
          clearInterval(intervalId)
        }

        if (retry > 5) {
          toast.error('Timeout', { position: 'bottom-right' })
          onClose()
          clearInterval(intervalId)
        }

        retry++
      }, 3000) as NodeJS.Timeout
    })
  }

  const sendTxn = async () => {
    if (!address) {
      toast.error('Please connect your wallet', { position: 'bottom-right' })
      return
    }

    let functionName = ''
    let args = []
    if (dapps === 'NFT') {
      const parsedAmount = parseEther(amount.toString())
      const encodedRecipient = encodeAbiParameters([{ type: 'address', name: 'recipient' }], [address])
      const _options = Options.newOptions().addExecutorLzReceiveOption(1000000, 0)
      const params = encodeAbiParameters(
        [
          { type: 'bytes', name: 'options' },
          { type: 'bytes', name: 'sgParams' },
        ],
        [_options.toHex() as `0x${string}`, '0x0'],
      )
      const nft = EXAMPLE_DEPLOYMENT[chain.toString()].nft

      const fee = await client.readContract({
        address: DEPLOYMENT.ethAdapter as `0x${string}`,
        abi: ETH_ADAPTER_ABI,
        functionName: 'estimateFee',
        args: [address, chain, nft, nft, encodedRecipient, parsedAmount, params],
      })
      functionName = 'crossChainContractCall'
      args = [chain, nft, encodedRecipient, fee, params]
    } else {
      const aave = EXAMPLE_DEPLOYMENT[chain.toString()].aave
      const weth = EXAMPLE_DEPLOYMENT[chain.toString()].weth

      const encodedMsg = encodeAbiParameters([{ type: 'address', name: 'weth' }], [weth!])

      functionName = 'crossChainContractCallWithAsset'
      args = [chain, aave, encodedMsg, 0, amount, '0x']
    }

    writeContract({
      address: DEPLOYMENT.ethTokenPool as `0x${string}`,
      abi: ETH_TOKEN_POOL_ABI,
      functionName,
      args,
      value: BigInt(0),
    })
  }

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        addRecentTransaction({
          hash: data,
          description: 'Transfer',
        })
        if (dapps === 'NFT') {
          toast.success(
            <>
              <p>Transfer successful!</p>
              {'View on'}
              <Link isExternal isBlock showAnchorIcon href={`https://testnet.layerzeroscan.com/tx/${data}`}>
                LayerZero scan
              </Link>
            </>,
            { position: 'bottom-right' },
          )
        } else {
          toast.success('Transfer successful!', { position: 'bottom-right' })
        }
      } else {
        toast.success('Transfer successful!', { position: 'bottom-right' })
      }
    } else if (isError) {
      toast.error('Deposit failed', { position: 'bottom-right' })
    }
  }, [isSuccess, isError])

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='z-0'>
          <ChatBot
            headerTitle={'Miki Smart Dapps'}
            botAvatar={'/favicon.png'}
            steps={chatbotSteps}
            handleEnd={handleEnd}
            inputStyle={{ color: 'black' }}
          />
        </div>
      </ThemeProvider>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='z-10'>
        <ModalContent>
          {(onClose) => (
            <ModalContent>
              <ModalHeader className='flex flex-col gap-1 text-black'>Transaction Summary</ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-row justify-between'>
                    <p className='font-bold text-black'>Dapps</p>
                    <p className='text-black'>{dapps}</p>
                  </div>
                  {dapps === 'NFT' ? (
                    <div className='flex flex-row justify-between'>
                      <p className='font-bold text-black'>NFT</p>
                      <p className='text-black'>{nftOption}</p>
                    </div>
                  ) : (
                    <div className='flex flex-row justify-between'>
                      <p className='font-bold text-black'>DeFi</p>
                      <p className='text-black'>{defiOption}</p>
                    </div>
                  )}
                  <div className='flex flex-row justify-between'>
                    <p className='font-bold text-black'>Amount</p>
                    <p className='text-black'>{ethers.formatEther(amount)}</p>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <p className='font-bold text-black'>Destination chain</p>
                    <div className='flex flex-row gap-1'>
                      <div className='flex rounded-full items-center justify-center'>
                        <Image
                          src={getChainIconUrl(chain)}
                          width={20}
                          height={20}
                          alt={convertToChainName(chain)}
                          className='rounded-full'
                        />
                      </div>
                      <p className='text-black'>{convertToChainName(chain)}</p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius='sm'
                  onClick={onClose}
                  className='bg-button drop-shadow-button hover:bg-red-100 focus:ring'
                >
                  <span className='text-red-500 font-bold text-lg'>Cancel</span>
                </Button>
                <Button
                  isLoading={loading}
                  radius='sm'
                  onClick={relayTxn}
                  className='bg-button drop-shadow-button hover:bg-green-200 focus:ring'
                >
                  <span className='text-green font-bold text-lg'>{loading ? 'Signing...' : 'Sign Txn'}</span>
                </Button>
                <Button
                  isLoading={isPending}
                  radius='sm'
                  onClick={sendTxn}
                  className='bg-button drop-shadow-button hover:bg-green-200 focus:ring'
                >
                  <span className='text-green font-bold text-lg'>{isPending ? 'Sending...' : 'Send Txn'}</span>
                </Button>
              </ModalFooter>
            </ModalContent>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
