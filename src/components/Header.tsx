'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Header() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />
    </div>
  )
}
