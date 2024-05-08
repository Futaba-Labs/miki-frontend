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
