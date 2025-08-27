import { bsc } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
      showQrModal: false,
    }),
  ],
  autoConnect: true,
});
