import { Chain } from "@/types";

export enum ChainId {
  ARBITRUM_SEPOLIA = 421614,
  OPTIMISM_SEPOLIA = 11155420,
  BASE_SEPOLIA = 84532,
  BNB_TESTNET = 97,
  MANTLE_SEPOLIA = 5003,
  SCROLL_SEPOLIA = 534351,
  AVALANCHE_FUJI = 43113,
  BLAST_SEPOLIA = 168587773,
  POLYGON_CARDONA = 2442,
  ASTAR_ZKYOTO = 6038361,
  ZKSYNC_SEPOLIA = 300
}

export enum ChainKey {
  ARBITRUM_SEPOLIA = "Arbitrum Sepolia",
  OPTIMISM_SEPOLIA = "Optimism Sepolia",
  BASE_SEPOLIA = "Base Sepolia",
  BNB_TESTNET = "BNB Testnet",
  MANTLE_SEPOLIA = "Mantle Sepolia",
  SCROLL_SEPOLIA = "Scroll Sepolia",
  AVALANCHE_FUJI = "Avalanche Fuji",
  BLAST_SEPOLIA = "Blast Sepolia",
  POLYGON_CARDONA = "Polygon Cardona",
  ASTAR_ZKYOTO = "Astar Zkyoto",
  ZKSYNC_SEPOLIA = "Zksync Sepolia"
}

export const REGISTRY: Record<ChainKey, Chain> = {
  [ChainKey.ARBITRUM_SEPOLIA]: {
    id: ChainId.ARBITRUM_SEPOLIA,
    explorer: 'https://sepolia.arbiscan.io',
    logo: '/logo/arbitrum.svg'
  },
  [ChainKey.BASE_SEPOLIA]: {
    id: ChainId.BASE_SEPOLIA,
    explorer: 'https://sepolia.basescan.org',
    logo: '/logo/base.svg'
  },
  [ChainKey.OPTIMISM_SEPOLIA]: {
    id: ChainId.OPTIMISM_SEPOLIA,
    explorer: 'https://sepolia-optimism.etherscan.io',
    logo: '/logo/optimism.svg'
  },
  [ChainKey.MANTLE_SEPOLIA]: {
    id: ChainId.MANTLE_SEPOLIA,
    explorer: 'https://explorer.sepolia.mantle.xyz',
    logo: '/logo/mantle.svg'
  },
  [ChainKey.SCROLL_SEPOLIA]: {
    id: ChainId.SCROLL_SEPOLIA,
    explorer: 'https://sepolia.scrollscan.com',
    logo: '/logo/scroll.svg'
  },
  [ChainKey.AVALANCHE_FUJI]: {
    id: ChainId.AVALANCHE_FUJI,
    explorer: 'https://testnet.snowtrace.io',
    logo: '/logo/avalanche.svg'
  },
  [ChainKey.BNB_TESTNET]: {
    id: ChainId.BNB_TESTNET,
    explorer: 'https://testnet.bscscan.com',
    logo: '/logo/bnb.svg'
  },
  [ChainKey.BLAST_SEPOLIA]: {
    id: ChainId.BLAST_SEPOLIA,
    explorer: 'https://testnet.blastscan.io',
    logo: '/logo/blast.png'
  },
  [ChainKey.POLYGON_CARDONA]: {
    id: ChainId.POLYGON_CARDONA,
    explorer: 'https://cardona-zkevm.polygonscan.com',
    logo: '/logo/polygon.svg'
  },
  [ChainKey.ASTAR_ZKYOTO]: {
    id: ChainId.ASTAR_ZKYOTO,
    explorer: 'https://astar-zkevm.explorer.startale.com',
    logo: '/logo/astar.png'
  },
  [ChainKey.ZKSYNC_SEPOLIA]: {
    id: ChainId.ZKSYNC_SEPOLIA,
    explorer: 'https://sepolia.explorer.zksync.io',
    logo: '/logo/zksync.svg'
  }
}

export const getChainKey = (chainId: ChainId): ChainKey => {
  const key = ChainId[chainId] as keyof typeof ChainKey;
  const chainKey = ChainKey[key];
  if (chainKey) return chainKey;
  throw new Error(`No ChainKey for ${chainId}`);
}

export const getChainKeys = (): ChainKey[] => {
  return Object.entries(ChainKey).map(([_, value]) => value);
}

export const getMagicTransferChainKeys = () => {
  return [ChainKey.OPTIMISM_SEPOLIA, ChainKey.BASE_SEPOLIA, ChainKey.SCROLL_SEPOLIA, ChainKey.BLAST_SEPOLIA, ChainKey.ZKSYNC_SEPOLIA]
}

export const getNftChainKeys = () => {
  return [ChainKey.OPTIMISM_SEPOLIA, ChainKey.BASE_SEPOLIA, ChainKey.SCROLL_SEPOLIA, ChainKey.BLAST_SEPOLIA, ChainKey.BNB_TESTNET, ChainKey.AVALANCHE_FUJI, ChainKey.MANTLE_SEPOLIA]
}

export const getChainIdByChainKey = (chainKey: ChainKey): ChainId => {
  const formattedKey = chainKey.replace(/\s+/g, '_').toUpperCase();
  const ck = formattedKey as unknown as keyof typeof ChainId;
  const chainId: ChainId | undefined = ChainId[ck];
  if (chainId) return chainId;
  throw new Error(`No chainId for ${chainKey}`);
}

export const getChainIconUrl = (chainId: number) => {
  const chainKey = getChainKey(chainId)
  return REGISTRY[chainKey].logo
}

export const getExploerUrl = (chainId: number) => {
  const chainKey = getChainKey(chainId)
  return REGISTRY[chainKey].explorer
}

export const convertToChainName = (chainId: number): string => {
  const chainKey = getChainKey(chainId)
  return chainKey.valueOf()
}
