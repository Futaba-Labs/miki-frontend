import { createPublicClient, http } from "viem";
import { arbitrumSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http()
})

export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_API_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
}
