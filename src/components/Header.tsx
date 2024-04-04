'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Header() {
  return (
    <div className='flex justify-between p-3'>
      <p className='text-white text-lg'>Miki</p>
      <div>
        <ConnectButton />
      </div>
    </div>
  )
}
