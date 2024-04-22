export const DEPLOYMENT: Record<string, string> = {
  "ethTokenPool": "0xa94DB5cAafA10F28DA7633c361556B8399073a1f",
  "usdcTokenPool": "0xe4b09e0961578F593c65540dcAde19C82964327c",
  "l2AssetManager": "0x6165d02D9CC2ee9dE28e27Abb88A34297C09c4b0",
  "ethAdapter": "0x8C6B24F735f97eC1D3eddE595e106CFbA99dA16C",
}

export const EXAMPLE_DEPLOYMENT: Record<string, Partial<Record<string, string>>> = {
  ["84532"]: {
    "nft": "0x7529afb262e776620a52e143d3610299A3F0C013",
    "aave": "0x7529afb262e776620a52e143d3610299A3F0C013"
  }
}