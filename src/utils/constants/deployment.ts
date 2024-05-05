export const DEPLOYMENT: Record<string, string> = {
  "ethTokenPool": "0x6a509D7d555d041E606F6ff8b90f371c9a03Bfca",
  "usdcTokenPool": "0xd4dBE3f0C4351623f0802d1482F0336C89652F1d",
  "l2AssetManager": "0xCE18358DaE886C8c8a8697712Af35fA7bF6227CF",
  "ethAdapter": "0x9B20e595ee83dc514A8cE4be885ceCE14957E78C",
}

export const EXAMPLE_DEPLOYMENT: Record<string, Partial<Record<string, string>>> = {
  ["84532"]: {
    "nft": "0x6a7A87ae550dD0190f7c844a51a7F9f258EFBdA5",
    "aave": "0xb49D3728F8C069866260B682941F57Bd389669f7"
  },
  ["11155420"]: {
    "nft": "0x71095b39aF9293c57c4904ab3c3A3755183c58f6",
    "aave": "0xaaD783B36B84Ad14979Ce68DeECb390523784502"
  }
}
