'use client'

import ChatBot from 'react-simple-chatbot'
import { toast } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { parseEther, encodeAbiParameters, createPublicClient, http, encodeFunctionData } from 'viem'
import { useAccount } from 'wagmi'
import { Options } from '@layerzerolabs/lz-v2-utilities'
import { arbitrumSepolia } from 'viem/chains'
import { CallWithSyncFeeERC2771Request, GelatoRelay, TaskState } from '@gelatonetwork/relay-sdk'
import { Link } from '@nextui-org/react'
import { ethers } from 'ethers'
import { DEPLOYMENT, ETH_ADAPTER_ABI, ETH_TOKEN_POOL_ABI, EXAMPLE_DEPLOYMENT } from '@/utils'

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

const Review = () => {
  return <div></div>
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
        { value: 'NFT1', label: 'NFT1', trigger: '30' },
        { value: 'NFT2', label: 'NFT2', trigger: '30' },
        { value: 'NFT3', label: 'NFT3', trigger: '30' },
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
        { value: 'NFT1', label: 'NFT1', trigger: '30' },
        { value: 'NFT2', label: 'NFT2', trigger: '30' },
        { value: 'NFT3', label: 'NFT3', trigger: '30' },
      ],
    },
    {
      id: '10',
      message: 'Complete DeFi KYC to update your SBT. Which type of product would you like to experiment?',
      trigger: '11',
    },
    {
      id: '11',
      options: [{ value: 'Lending', label: 'Lending', trigger: '12' }],
    },
    {
      id: '12',
      message: "Let's lend some assets! Currently, you can lend USDC on Solana. How much would you like to lend?",
      trigger: 'amount',
    },
    {
      id: 'amount',
      user: true,
      trigger: '30',
    },
    {
      id: '30',
      message: 'Which chain do you want to execute the transaction on?',
      trigger: 'chain',
    },
    {
      id: 'chain',
      options: [
        { value: '11155420', label: 'Optimism Sepolia', trigger: '32' },
        { value: '84532', label: 'Base Sepolia', trigger: '32' },
      ],
    },
    {
      id: '32',
      message: 'Great! Check out your summary',
      trigger: 'review',
    },
    {
      id: 'review',
      component: <Review />,
      asMessage: true,
      trigger: 'update',
    },
    {
      id: 'update',
      message: 'Would you like to update some field?',
      trigger: 'update-question',
    },
    {
      id: 'update-question',
      options: [
        { value: 'yes', label: 'Yes', trigger: '1' },
        { value: 'no', label: 'No', trigger: '33' },
      ],
    },
    {
      id: '33',
      message: "Alright, let's proceed with the transaction.",
      end: true,
    },
  ]

  const { address } = useAccount()

  const client = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(),
  })

  const relay = new GelatoRelay()

  const handleEnd = ({ values }: { values: Array<string> }) => {
    if (!address) {
      toast.error('Please connect your wallet', { position: 'bottom-right' })
      return
    }

    const dstChianId = parseInt(values[3])
    /* eslint-disable no-async-promise-executor */
    return new Promise<void>(async (resolve, reject) => {
      let amount = 0
      let data = ''
      if (values[0] === 'NFT') {
        console.log('NFT')
        if (values[1] !== 'Free') {
          amount = 0.001
        }

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
        const nft = EXAMPLE_DEPLOYMENT[dstChianId.toString()].nft

        const fee = await client.readContract({
          address: DEPLOYMENT.ethAdapter as `0x${string}`,
          abi: ETH_ADAPTER_ABI,
          functionName: 'estimateFee',
          args: [address, dstChianId, nft, nft, encodedRecipient, parsedAmount, params],
        })

        data = encodeFunctionData({
          abi: ETH_TOKEN_POOL_ABI,
          functionName: 'crossChainContractCallRelay',
          args: [dstChianId, nft, encodedRecipient, fee, params],
        })
      } else {
        const amount = parseEther(values[2])

        const aave = EXAMPLE_DEPLOYMENT[dstChianId.toString()].aave
        const weth = EXAMPLE_DEPLOYMENT[dstChianId.toString()].weth

        const encodedMsg = encodeAbiParameters([{ type: 'address', name: 'weth' }], [weth!])

        data = encodeFunctionData({
          abi: ETH_TOKEN_POOL_ABI,
          functionName: 'crossChainContractCallWithAssetRelay',
          args: [dstChianId, aave, encodedMsg, 0, amount, '0x'],
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
        toast.error('Transfer failed', { position: 'bottom-right' })
        return
      }

      let retry = 0
      const intervalId = setInterval(async () => {
        const status = await relay.getTaskStatus(taskId)
        if (status?.taskState === TaskState.ExecSuccess) {
          if (values[0] === 'NFT') {
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
          } else {
            toast.success('Transfer successful!', { position: 'bottom-right' })
          }

          clearInterval(intervalId)
        }

        if (status?.taskState === TaskState.ExecReverted || status?.taskState === TaskState.Cancelled) {
          toast.error('Transfer failed', { position: 'bottom-right' })
          clearInterval(intervalId)
        }

        if (retry > 5) {
          toast.error('Timeout', { position: 'bottom-right' })
          clearInterval(intervalId)
        }

        retry++
      }, 3000)
    })
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle={'Miki Smart Dapps'}
          botAvatar={'/favicon.png'}
          steps={chatbotSteps}
          handleEnd={handleEnd}
        />
      </ThemeProvider>
    </>
  )
}
