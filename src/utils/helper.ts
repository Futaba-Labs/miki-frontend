import { ChipColor } from "@/types";

export const roundedNumber = (num: number, decimal: number) => {
  return Math.floor(num * (10 ** decimal)) / (10 ** decimal);
}

export const convertToChainId = (chain: string, mainnet: boolean): number => {
  const name = chain.toLowerCase()
  if (mainnet) {
    return 0;
  } else {
    switch (name) {
      case 'optimism':
        return 11155420
      case 'base':
        return 84532
      default:
        return 0
    }
  }
}

export const convertToChainName = (chainId: number): string => {
  switch (chainId) {
    case 421614:
      return 'Arbitrum Sepolia'
    case 11155420:
      return 'Optimism Sepolia'
    case 84532:
      return 'Base Sepolia'
    default:
      return 'Arbitrum Sepolia'
  }
}

export const omitText = (text: string | undefined, start: number, end: number) => {
  if (!text) return ''
  if (text.length < start + end) return text
  return text.substring(0, start) + '...' + text.substring(text.length - end, text.length)
}

export const calculateTimeDifference = (craetedAt: Date) => {
  const now = new Date()
  const timeZoneOffset = now.getTimezoneOffset()
  const adjustedTime = new Date(now.getTime() + timeZoneOffset * 60 * 1000)
  const adjustedCreatedAt = new Date(craetedAt.getTime() + craetedAt.getTimezoneOffset() * 60 * 1000)
  const differenceInMilliseconds = Math.abs(adjustedTime.getTime() - adjustedCreatedAt.getTime())
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000)
  const differenceInMinutes = Math.floor(differenceInSeconds / 60)
  const differenceInHours = Math.floor(differenceInMinutes / 60)
  const differenceInDays = Math.floor(differenceInHours / 24)
  const differenceInYears = Math.floor(differenceInDays / 365)

  if (differenceInMinutes < 1) {
    return 'just now'
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} mins ago`
  } else if (differenceInHours < 24) {
    const remainingMinutes = differenceInMinutes % 60
    return `${differenceInHours} hours ${remainingMinutes} mins ago`
  } else if (differenceInDays < 365) {
    const remainingHours = differenceInHours % 24
    return `${differenceInDays} days ${remainingHours} hours ago`
  } else {
    const remainingDays = differenceInDays % 365
    return `${differenceInYears} years ${remainingDays} days ago`
  }
}

export const getExploerUrl = (chainId: number): string => {
  switch (chainId) {
    case 5:
      return 'https://goerli.etherscan.io/'
    case 11155111:
      return 'https://sepolia.etherscan.io/'
    case 420:
      return 'https://goerli-optimism.etherscan.io/'
    case 80001:
      return 'https://mumbai.polygonscan.com/'
    case 421613:
      return 'https://goerli.arbiscan.io/'
    case 421614:
      return 'https://sepolia.arbiscan.io/'
    case 11155420:
      return 'https://sepolia-optimism.etherscan.io/'
    case 84532:
      return 'https://sepolia.basescan.org/'
    default:
      return 'https://mumbai.polygonscan.com/'
  }
}

export const getChainIconUrl = (chainId: number) => {
  switch (chainId) {
    case 421614:
      return '/logo/arbitrum.svg'
    case 11155420:
      return '/logo/optimism.svg'
    case 84532:
      return '/logo/base.svg'
    default:
      return '/logo/arbitrum.svg'
  }
}

export const getColor = (status: string): ChipColor => {
  switch (status) {
    case 'SUCCESS':
      return 'success'
    case 'ERROR':
      return 'danger'
    default:
      return 'secondary'
  }
}
