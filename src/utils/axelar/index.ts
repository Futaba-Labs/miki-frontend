import { AxelarQueryAPI, Environment } from '@axelar-network/axelarjs-sdk';

export const getFee = async () => {
  const sdk = new AxelarQueryAPI({
    environment: Environment.TESTNET,
  });

  const fee = await sdk.estimateGasFee(
    "arbitrum-sepolia",
    "mantle-sepolia",
    500000
  );

  return BigInt(fee.toString())
}
