'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'
import contractAbi from '../../abi/PresaleABI.json'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
  useAccount,
  useBalance,
  useDisconnect,
  useChainId,
  useWalletClient,
  useReconnect,
  useSwitchChain,
} from 'wagmi'
import { useTranslation } from 'react-i18next'

/** === Config === */
const contractAddress = '0xeBa712f83323559E8d827302b6C7945343307F00'
const tokenAddress    = '0xF46ca5A735E024B3F0aaBC5dfe242b5cA16B1278'
const tokenSymbol     = 'MNR'
const tokenDecimals   = 18
const minBuy          = 0.005
const BSC_CHAIN_ID    = 56

/** === Utils === */
const sanitizeBnbInput = (v: string) => {
  let clean = v.replace(',', '.').replace(/[^0-9.]/g, '')
  const parts = clean.split('.')
  if (parts.length > 2) clean = parts[0] + '.' + parts.slice(1).join('')
  return clean
}
const nf = (n: number, d = 2) =>
  isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: d }) : '0'
const fmtFiat = (v: number, c: 'USD'|'BRL', digits?: number) => {
  const d = digits ?? (v < 1 ? 5 : 2)
  return new Intl.NumberFormat(
    c === 'BRL' ? 'pt-BR' : 'en-US',
    { style: 'currency', currency: c, minimumFractionDigits: d, maximumFractionDigits: d }
  ).format(v)
}

export default function PresalePanel() {
  const { t, i18n } = useTranslation('presale')
  const isPT = i18n.language?.toLowerCase().startsWith('pt')

  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address, chainId: BSC_CHAIN_ID })
  const chainId = useChainId()
  const { data: walletClient } = useWalletClient()
  const { switchChain } = useSwitchChain()
  useReconnect()

  const [currentPhase, setCurrentPhase] = useState(0)
  const [price, setPrice] = useState(0)
  const [sold, setSold] = useState(0)
  const [cap, setCap] = useState(1)
  const [bnbAmount, setBnbAmount] = useState('')
  const [tokensToReceive, setTokensToReceive] = useState(0)
  const [loading, setLoading] = useState(true)
  const [buying, setBuying] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [bnbToBRL, setBnbToBRL] = useState<number | null>(null)
  const [bnbToUSD, setBnbToUSD] = useState<number | null>(null)
  const [lastTx, setLastTx] = useState<string | null>(null)

  const progress = useMemo(() => (cap ? Math.max(0, Math.min(1, sold / cap)) : 0), [sold, cap])
  const valueBNB = useMemo(() => parseFloat(sanitizeBnbInput(bnbAmount)) || 0, [bnbAmount])
  const isValid = valueBNB >= minBuy && !Number.isNaN(valueBNB)

  /** Linha de cotação inline: (~R$ …) em PT, (~$ …) fora de PT */
  const priceFiatInline = useMemo(() => {
    if (!price) return ''
    const v = isPT
      ? (bnbToBRL ? fmtFiat(price * bnbToBRL, 'BRL', 5) : '')
      : (bnbToUSD ? fmtFiat(price * bnbToUSD, 'USD', 5) : '')
    return v ? `~${v}` : ''
  }, [price, bnbToBRL, bnbToUSD, isPT])

  /** Cotações BNB */
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd,brl')
        const d = await r.json()
        setBnbToBRL(d?.binancecoin?.brl ?? null)
        setBnbToUSD(d?.binancecoin?.usd ?? null)
      } catch {}
    }
    fetchPrices()
    const id = setInterval(fetchPrices, 60_000)
    return () => clearInterval(id)
  }, [])

  /** Ler hash local (SSR-safe) */
  useEffect(() => {
    if (typeof window !== 'undefined') setLastTx(localStorage.getItem('moonrise-last-tx'))
  }, [])

  /** Checar recibo da última tx */
  useEffect(() => {
    if (!lastTx) return
    let alive = true
    const check = async () => {
      try {
        const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org')
        const receipt = await provider.getTransactionReceipt(lastTx)
        if (alive && receipt?.status === 1) {
          setShowSuccess(true)
          if (typeof window !== 'undefined') localStorage.removeItem('moonrise-last-tx')
          setLastTx(null)
          fetchPresaleData()
        }
      } catch {}
    }
    check()
    const id = setInterval(check, 3000)
    return () => { alive = false; clearInterval(id) }
  }, [lastTx])

  /** Ler dados on-chain */
  useEffect(() => { fetchPresaleData() }, [])
  const fetchPresaleData = async () => {
    try {
      setLoading(true)
      const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org')
      const contract = new ethers.Contract(contractAddress, contractAbi, provider)
      const phase = await contract.currentPhase()
      const currentPrice = await contract.getCurrentPrice()
      const info = await contract.getPhaseInfo(phase) // [cap, sold, ...]
      setCurrentPhase(Number(phase))
      setPrice(Number(ethers.formatEther(currentPrice)))
      setSold(Number(ethers.formatUnits(info[1], 18)))
      setCap(Number(ethers.formatUnits(info[0], 18)))
      setError('')
    } catch {
      setError(t('error_fetch'))
    } finally {
      setLoading(false)
    }
  }

  /** Tokens estimados */
  useEffect(() => {
    if (bnbAmount && price > 0) setTokensToReceive(Number(((valueBNB / price) || 0).toFixed(2)))
    else setTokensToReceive(0)
  }, [bnbAmount, price, valueBNB])

  /** MAX com reserva de gás dinâmica (TypeScript-safe) */
  const setMaxSpend = async () => {
    if (!isConnected || !balance?.formatted) return
    const bal = parseFloat(balance.formatted)
    if (bal <= 0) return

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum)
      const signer   = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi as any, signer)

      let estGas: bigint
      try {
        const minWei = ethers.parseEther(minBuy.toFixed(6))
        estGas = await (contract as any).estimateGas['buy']({ value: minWei })
      } catch {
        estGas = BigInt(130000) // fallback
      }

      const fee = await provider.getFeeData()
      const gasPrice =
        (fee.gasPrice as bigint | null) ??
        (fee.maxFeePerGas as bigint | null) ??
        BigInt(3000000000) // 3 gwei

      // 20% buffer: (x * 12) / 10 => 1.2x
      const weiReserve = (gasPrice * estGas * BigInt(12)) / BigInt(10)
      const reserve    = Number(ethers.formatEther(weiReserve))

      const reserveClamped = Math.min(Math.max(reserve, 0.00007), 0.00025)
      const maxSpend = Math.max(0, bal - reserveClamped)
      setBnbAmount(maxSpend > 0 ? maxSpend.toFixed(6) : '')
    } catch {
      const reserve = Math.min(Math.max(bal * 0.0035, 0.00007), 0.00025)
      const maxSpend = Math.max(0, bal - reserve)
      setBnbAmount(maxSpend > 0 ? maxSpend.toFixed(6) : '')
    }
  }

  /** Comprar */
  const executeBuy = async () => {
    try {
      setError('')
      if (!isConnected) throw new Error(t('error_wallet'))
      if (!walletClient) throw new Error(t('error_connection'))
      if (!isValid) throw new Error(t('error_minimum', { min: minBuy }))
      if (Number(balance?.formatted || 0) < valueBNB) throw new Error(t('error_balance'))
      if (chainId !== BSC_CHAIN_ID) throw new Error(t('error_network'))

      setBuying(true)
      const provider = new ethers.BrowserProvider((window as any).ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi, signer)

      const fixed = valueBNB.toFixed(6)
      const tx = await contract.buy({ value: ethers.parseEther(fixed) })

      if (typeof window !== 'undefined') {
        localStorage.setItem('moonrise-last-tx', tx.hash)
        setLastTx(tx.hash)
      }

      await tx.wait()
      setShowSuccess(true)
      setBnbAmount('')
      await fetchPresaleData()
    } catch (err: any) {
      setError(err?.message?.toString?.() || t('error_unknown'))
    } finally {
      setBuying(false)
    }
  }

  /** Utilidades */
  const copyAddr = async (val: string) => {
    try {
      await navigator.clipboard.writeText(val)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    } catch {
      setError(t('error_copy'))
    }
  }

  const addTokenToWallet = async () => {
    try {
      // @ts-ignore
      await window.ethereum?.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: { address: tokenAddress, symbol: tokenSymbol, decimals: tokenDecimals }
        },
      })
    } catch {
      setError(t('error_unknown'))
    }
  }

  /** === UI === */
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-purple-700/60 bg-gradient-to-b from-[#0c0c0f] to-[#0a0a0a] p-1 shadow-2xl">
        <div className="rounded-2xl bg-[#0b0b12] p-6 sm:p-8 space-y-5">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-yellow-400 to-white tracking-wide uppercase">
              {t('intro_title')}
            </h1>
            <p className="text-base text-yellow-300 font-medium">
              {t('intro_subtitle')}
            </p>
          </div>

          {/* Network warning */}
          {isConnected && chainId !== BSC_CHAIN_ID && (
            <div className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span>⚠ {t('error_network')}</span>
                <button
                  onClick={() => switchChain?.({ chainId: BSC_CHAIN_ID })}
                  className="px-3 py-1 rounded bg-yellow-600 hover:bg-yellow-700 text-black font-semibold"
                >
                  {t('switch_network') || 'Trocar para BSC'}
                </button>
              </div>
            </div>
          )}

          {/* Métricas (empilhadas) */}
          <div className="space-y-2 text-sm text-gray-300">
            <div><strong>{t('phase')}:</strong> {currentPhase + 1}</div>

            {/* Preço com cotação na frente */}
            <div className="flex items-baseline gap-2">
              <span>
                <strong>{t('price')}:</strong> {price ? price.toFixed(8) : '...'} BNB
              </span>
              {priceFiatInline && (
                <span className="text-xs text-gray-400">({priceFiatInline})</span>
              )}
            </div>

            <div>
              <strong>{t('sold')}:</strong> {nf(sold, 0)} / {nf(cap, 0)} MNR
            </div>
          </div>

          {/* Progresso */}
          <div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Carteira */}
          {isConnected && (
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>{t('wallet')}:</span>
              <span className="flex items-center gap-2">
                {address?.slice(0, 6)}...{address?.slice(-4)}
                <button onClick={() => copyAddr(address!)} className="bg-gray-800 px-2 rounded">📋</button>
                {copied && <span className="text-green-400">{t('copied')}</span>}
                <button onClick={() => disconnect()} className="bg-red-700/90 px-2 rounded">{t('disconnect')}</button>
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm text-gray-400">
            <span>{t('balance')}:</span>
            <span>{isConnected && balance?.formatted ? Number(balance.formatted).toFixed(4) : '--'} BNB</span>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                placeholder={t('input_placeholder')}
                value={bnbAmount}
                onChange={(e) => setBnbAmount(sanitizeBnbInput(e.target.value))}
                className="w-full p-3 pr-16 rounded-lg bg-black text-white placeholder-gray-500 border border-purple-500 focus:ring-2 focus:ring-purple-600"
                disabled={!isConnected}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={setMaxSpend}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs"
              >
                {t('max')}
              </button>
            </div>

            <div className="text-xs text-gray-400">
              ⚠ {t('error_minimum', { min: minBuy })} • {t('price_fiat_hint') || 'Conversões são estimativas.'}
            </div>
          </div>

          {/* Botão de adicionar token (abaixo do input, só conectado) */}
          {isConnected && (
            <div className="flex justify-end">
              <button
                onClick={addTokenToWallet}
                className="px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-white text-xs"
                title={t('add_token') || 'Adicionar token à carteira'}
              >
                + {tokenSymbol} • {t('add_token') || 'Adicionar token'}
              </button>
            </div>
          )}

          {/* Conversões & Recebimento */}
          <div className="text-sm">
            <div className="text-white">
              {t('receive')} <strong className="text-yellow-400">{nf(tokensToReceive, 2)} {tokenSymbol}</strong>
            </div>
            {valueBNB > 0 && (
              <div className="text-xs text-gray-400">
                ≈ {bnbToBRL ? fmtFiat(valueBNB * bnbToBRL, 'BRL') : '...'} • {bnbToUSD ? fmtFiat(valueBNB * bnbToUSD, 'USD') : '...'}
              </div>
            )}
          </div>

          {/* Estados */}
          {loading && <div className="text-center text-sm text-purple-300">{t('loading') || 'Carregando…'}</div>}
          {lastTx && !showSuccess && <p className="text-yellow-400 text-center text-sm">{t('verifying_tx')}</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Ações */}
          {!isConnected ? (
            <div className="w-full flex justify-center">
              <ConnectButton showBalance={false} chainStatus="icon" />
            </div>
          ) : (
            <button
              onClick={executeBuy}
              disabled={buying || !isValid || chainId !== BSC_CHAIN_ID}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg disabled:opacity-40 transition-all"
            >
              {buying ? `⏳ ${t('processing')}` : `✅ ${t('confirm')}`}
            </button>
          )}

          {/* Sucesso */}
          {showSuccess && (
            <div className="rounded-xl border border-purple-600 p-4 mt-2">
              <h3 className="text-2xl font-bold text-purple-400 text-center">{t('success_title')}</h3>
              <p className="text-sm text-gray-300 text-center mt-1">
                {t('success_desc_line1')} <br />
                <span className="text-white font-semibold">{t('success_desc_line2')}</span>
              </p>

              <div className="bg-black/60 border border-purple-600 p-3 rounded-xl text-sm mt-4">
                <p><span className="text-purple-400">📍 {t('network')}:</span> Binance Smart Chain (BSC)</p>
                <p><span className="text-purple-400">📬 {t('token')}:</span> {tokenSymbol}</p>
                <p><span className="text-purple-400">🔢 {t('decimals')}:</span> {tokenDecimals}</p>
                <div className="flex items-center justify-between break-all text-xs text-white/80 mt-2">
                  <span className="truncate max-w-[85%]">{tokenAddress}</span>
                  <button onClick={() => copyAddr(tokenAddress)} className="bg-purple-600 hover:bg-purple-700 text-xs px-2 py-1 rounded">📋</button>
                </div>
              </div>

              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={addTokenToWallet}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 text-white font-semibold rounded"
                >
                  + {tokenSymbol} • {t('add_token') || 'Adicionar token'}
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 text-white font-bold rounded uppercase tracking-wider"
                >
                  {t('buy_again')}
                </button>
              </div>
            </div>
          )}

          {/* Rodapé */}
          <p className="text-[11px] text-center text-gray-500">
            © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}
