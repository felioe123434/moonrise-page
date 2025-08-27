'use client';

import React, { useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
if (!projectId) {
  throw new Error('Defina NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID no .env.local');
}

/** Redes suportadas (BSC) */
const networks = [bsc];

/** WAGMI + VIEM */
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  chains: networks,
  transports: {
    [bsc.id]: http(process.env.NEXT_PUBLIC_BSC_RPC_URL || 'https://bsc-dataseed.binance.org'),
  },
  ssr: true,
});

type AppKitInstance = { open: () => void; close?: () => void };

declare global {
  interface Window {
    __APPKIT__?: AppKitInstance;
  }
}

/** Cria o AppKit 1x no client e força z-index máximo */
export function ensureAppKit(): AppKitInstance | null {
  if (typeof window === 'undefined') return null;
  if (!window.__APPKIT__) {
    window.__APPKIT__ = createAppKit({
      adapters: [wagmiAdapter],
      projectId,
      networks,
      metadata: {
        name: 'MoonRise',
        description: 'Pré-venda MoonRise',
        url: 'https://moonrise.finance',
        icons: ['/favicon.ico'],
      },
      themeMode: 'dark',
      themeVariables: {
        '--w3m-accent': '#7c3aed',
        '--w3m-border-radius-master': '16px',
        '--w3m-z-index': '2147483647', // 👑 garante modal acima de qualquer overlay
      },
      features: {
        email: false,
        socials: [],  // remove Google/Gmail/Discord etc.
        swaps: false,
      },
    }) as unknown as AppKitInstance;
  }
  return window.__APPKIT__!;
}

/** Helper global pra abrir o modal */
export function openWalletModal() {
  ensureAppKit()?.open();
}

const queryClient = new QueryClient();

/** Provider raiz */
export function Providers({ children }: { children: React.ReactNode }) {
  // Prepara o AppKit assim que o app hidratar (evita “primeiro clique não abre”)
  useEffect(() => {
    ensureAppKit();
  }, []);

  // @ts-ignore – o adapter expõe wagmiConfig
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
