'use client'

import { Button } from '@nextui-org/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'

export default function CustomConnectButton() {
  const customConnectButtonStyle = {
    background: 'linear-gradient(23.84deg, rgba(246, 246, 246, 1) 0%, rgba(234, 234, 234, 1) 100%)',
    border: '1px solid transparent',
    borderImage: 'linear-gradient(70.79deg, rgba(254, 254, 255, 1) 12.93%, rgba(197, 205, 217, 1) 100%)',
  }
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    radius='sm'
                    className='drop-shadow-wallet py-5'
                    onClick={openConnectModal}
                    style={customConnectButtonStyle}
                    startContent={<Image src={'/icon/wallet.svg'} alt='wallet' width={18} height={18} />}
                  >
                    <span className='font-bold text-black text-lg'>Connect Wallet</span>
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    radius='sm'
                    className='bg-button drop-shadow-wallet py-5 hover:bg-red-100'
                    onClick={openChainModal}
                    startContent={<Image src={'/icon/wallet_red.svg'} alt='wallet' width={18} height={18} />}
                  >
                    <span className='font-bold text-red-500  text-lg'>Wrong Network</span>
                  </Button>
                )
              }

              return (
                <Button
                  radius='sm'
                  className='drop-shadow-wallet py-5'
                  onClick={openAccountModal}
                  style={customConnectButtonStyle}
                  startContent={<Image src={'/icon/wallet.svg'} alt='wallet' width={18} height={18} />}
                >
                  <span className='font-bold text-black text-lg'>{account.displayName}</span>
                </Button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
