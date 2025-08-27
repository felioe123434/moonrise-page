import { bsc } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(process.env.NEXT_PUBLIC_BSC_RPC_URL || 'https://bsc-dataseed.binance.org'),
  },
  connectors: [
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
      showQrModal: false,
    }),
  ],
  ssr: true,
  // (Opcional) Descoberta de múltiplas wallets injetadas:
  // multiInjectedProviderDiscovery: true,
  // (Opcional) custom storage:
  // storage: createStorage({ storage: typeof window !== 'undefined' ? window.localStorage : undefined }),
});
