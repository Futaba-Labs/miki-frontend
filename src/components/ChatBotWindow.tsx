'use client'

import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'

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
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 'NFT', label: 'NFT Mint', trigger: '3' },
        { value: 'DeFi', label: 'DeFi', trigger: '10' },
      ],
    },
    {
      id: '3',
      message: "Sounds good! Let's get our hands on some new NFTs. Which option would you like to explore?",
      trigger: '4',
    },
    {
      id: '4',
      options: [
        { value: 'Free', label: 'Free Mints', trigger: '5' },
        { value: 'Token', label: 'Token Payments', trigger: '7' },
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
      trigger: '13',
    },
    {
      id: '13',
      user: true,
      trigger: '30',
    },
    {
      id: '30',
      message: 'Which chain do you want to execute the transaction on?',
      trigger: '31',
    },
    {
      id: '31',
      options: [
        { value: '11155420', label: 'Optimism Sepolia', trigger: '32' },
        { value: '84532', label: 'Base Sepolia', trigger: '32' },
      ],
    },
    {
      id: '32',
      message: "Alright, let's proceed with the transaction.",
      end: true,
    },
  ]

  const handleEnd = ({ values }: { values: Array<string> }) => {
    if (values[0] === 'NFT') {
      console.log('NFT')
      if (values[1] === 'Free') {
        console.log('Free')
        console.log('chain: ', values[3])
      } else {
        console.log('Token')
        console.log('chain: ', values[3])
      }
    } else {
      console.log(values)
      console.log('DeFi')
    }
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
