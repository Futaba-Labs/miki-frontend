import { zeroAddress } from "viem"
import { ChainKey, getChainKey } from "./chain"

export const CORE_DEPLOYMENT: Record<string, string> = {
  "ethTokenPool": "0x6a509D7d555d041E606F6ff8b90f371c9a03Bfca",
  "usdcTokenPool": "0xd4dBE3f0C4351623f0802d1482F0336C89652F1d",
  "l2AssetManager": "0xCE18358DaE886C8c8a8697712Af35fA7bF6227CF",
  "ethAdapter": "0x9B20e595ee83dc514A8cE4be885ceCE14957E78C",
}

export const EXAMPLE_DEPLOYMENT: Record<ChainKey, Partial<Record<string, `0x${string}`>>> = {
  [ChainKey.ARBITRUM_SEPOLIA]: {
    "nft": zeroAddress,
    "aave": zeroAddress,
    "weth": zeroAddress
  },
  [ChainKey.BASE_SEPOLIA]: {
    "nft": "0x6a7A87ae550dD0190f7c844a51a7F9f258EFBdA5",
    "aave": "0xb49D3728F8C069866260B682941F57Bd389669f7",
    "weth": "0x4200000000000000000000000000000000000006"
  },
  [ChainKey.OPTIMISM_SEPOLIA]: {
    "nft": "0xaaD783B36B84Ad14979Ce68DeECb390523784502",
    "aave": "0x71095b39aF9293c57c4904ab3c3A3755183c58f6",
    "weth": "0x4200000000000000000000000000000000000006"
  },
  [ChainKey.MANTLE_SEPOLIA]: {
    "nft": "0xAEe4c88c930447e1c8eD0D170cfC828475b89ade",
    "aave": zeroAddress,
    "weth": zeroAddress
  },
  [ChainKey.SCROLL_SEPOLIA]: {
    "nft": "0x512D68181dDb00f1f3fe5BCA28dD8B5cf2F98Cd0",
    "aave": "0x3b5495960F3214cb1Cc893b21A31BE86F1F2a3b9",
    "weth": "0xb123dCe044EdF0a755505d9623Fba16C0F41cae9"
  },
  [ChainKey.AVALANCHE_FUJI]: {
    "nft": "0xAEe4c88c930447e1c8eD0D170cfC828475b89ade",
    "aave": zeroAddress,
    "weth": zeroAddress
  },
  [ChainKey.BNB_TESTNET]: {
    "nft": "0xAEe4c88c930447e1c8eD0D170cfC828475b89ade",
    "aave": zeroAddress,
    "weth": zeroAddress
  },
  [ChainKey.BLAST_SEPOLIA]: {
    "nft": "0xAEe4c88c930447e1c8eD0D170cfC828475b89ade",
    "aave": zeroAddress,
    "weth": zeroAddress
  },
  [ChainKey.POLYGON_CARDONA]: {
    "nft": "0x43b7C54E750c403565b848235D772A7A04eAB50E",
    "aave": zeroAddress,
    "weth": zeroAddress
  },
  [ChainKey.ASTAR_ZKYOTO]: {
    "nft": "0xc6daDCc6bF602dE9DF7d410d15a1b0fB2cAE1BB7",
    "aave": zeroAddress,
    "weth": zeroAddress
  },
  [ChainKey.ZKSYNC_SEPOLIA]: {
    "nft": zeroAddress,
    "aave": zeroAddress,
    "weth": zeroAddress
  }
}

export const getDeploymentAddress = (chainId: number) => {
  const chainKey = getChainKey(chainId)
  return EXAMPLE_DEPLOYMENT[chainKey]
}
