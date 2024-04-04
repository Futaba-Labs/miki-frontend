'use client'

import * as React from 'react'
import { RainbowKitProvider, getDefaultWallets, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { argentWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { MIKI_THEME } from '@/utils'
import { ThemeProvider } from 'styled-components'
import { NextUIProvider } from '@nextui-org/react'

const { wallets } = getDefaultWallets()

const config = getDefaultConfig({
  appName: 'Miki',
  projectId: 'c13230bdeda8ef025c25dc3b6c03e873',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [arbitrumSepolia],
  ssr: true,
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider theme={MIKI_THEME}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
    </NextUIProvider>
  )
}
