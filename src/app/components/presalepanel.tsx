'use client'

import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import contractAbi from '../../abi/PresaleABI.json'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useDisconnect, useChainId, useWalletClient, useReconnect } from 'wagmi'
import { useTranslation } from 'react-i18next'

const contractAddress = '0xeBa712f83323559E8d827302b6C7945343307F00'
const tokenAddress = '0xF46ca5A735E024B3F0aaBC5dfe242b5cA16B1278'
const tokenSymbol = 'MNR'
const tokenDecimals = 18
const minBuy = 0.005

function sanitizeBnbInput(value: string): string {
  let clean = value.replace(',', '.').replace(/[^0-9.]/g, '')
  const parts = clean.split('.')
  if (parts.length > 2) clean = parts[0] + '.' + parts.slice(1).join('')
  return clean
}

export default function PresalePanel() {
 const { t, i18n } = useTranslation('presale')
  const isPT = i18n.language.startsWith('pt')
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address, chainId: 56 })
  const chainId = useChainId()
  const { data: walletClient } = useWalletClient()
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

  const formatFiat = (value: number, currency: string) => {
    const symbol = currency === 'BRL' ? 'R$' : '$'
    const formatted = value.toFixed(5).replace('.', ',')
    return `${symbol} ${formatted}`
  }

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd,brl')
        const data = await res.json()
        setBnbToBRL(data.binancecoin.brl)
        setBnbToUSD(data.binancecoin.usd)
      } catch (err) {
        console.error('Erro ao buscar cotação BNB:', err)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const checkReceipt = async () => {
      const lastTx = localStorage.getItem('moonrise-last-tx')
      if (!lastTx) return
      try {
        const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org')
        const receipt = await provider.getTransactionReceipt(lastTx)
        if (receipt?.status === 1) {
          setShowSuccess(true)
          localStorage.removeItem('moonrise-last-tx')
          fetchPresaleData()
        }
      } catch {}
    }
    checkReceipt()
    const interval = setInterval(checkReceipt, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetchPresaleData()
  }, [])

  useEffect(() => {
    const valueBNB = parseFloat(bnbAmount)
    if (bnbAmount && price > 0 && !isNaN(valueBNB)) {
      setTokensToReceive(Number((valueBNB / price).toFixed(2)))
    } else {
      setTokensToReceive(0)
    }
  }, [bnbAmount, price])

  useEffect(() => {
    if (!isConnected && typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
    }
  }, [isConnected])

  const fetchPresaleData = async () => {
    try {
      setLoading(true)
      const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org')
      const contract = new ethers.Contract(contractAddress, contractAbi, provider)
      const phase = await contract.currentPhase()
      const currentPrice = await contract.getCurrentPrice()
      const info = await contract.getPhaseInfo(phase)
      setCurrentPhase(Number(phase))
      setPrice(Number(ethers.formatEther(currentPrice)))
      setSold(Number(ethers.formatUnits(info[1], 18)))
      setCap(Number(ethers.formatUnits(info[0], 18)))
    } catch {
      setError(t('error_fetch'))
    } finally {
      setLoading(false)
    }
  }

  const executeBuy = async () => {
    setError('')
    const valueBNB = parseFloat(sanitizeBnbInput(bnbAmount))
    const fixedString = valueBNB.toFixed(6)

    if (!isConnected) return setError(t('error_wallet'))
    if (!walletClient) return setError(t('error_connection'))
    if (!bnbAmount || valueBNB < minBuy || isNaN(valueBNB)) return setError(t('error_minimum', { min: minBuy }))
    if (Number(balance?.formatted || 0) < valueBNB) return setError(t('error_balance'))
    if (chainId !== 56) return setError(t('error_network'))

    try {
      setBuying(true)
      const provider = new ethers.BrowserProvider(walletClient.transport)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi, signer)
      const value = ethers.parseEther(fixedString)
      const tx = await contract.buy({ value })
      localStorage.setItem('moonrise-last-tx', tx.hash)
      await tx.wait()
      setShowSuccess(true)
      setBnbAmount('')
      fetchPresaleData()
      localStorage.removeItem('moonrise-last-tx')
    } catch (err: any) {
      setError(err?.message?.toString() || t('error_unknown'))
    } finally {
      setBuying(false)
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBnbAmount(sanitizeBnbInput(e.target.value))
  }

  const copyAddress = async () => {
    if (!address) return
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    } catch {
      setError(t('error_copy'))
    }
  }

  const copyTokenAddress = async () => {
    try {
      await navigator.clipboard.writeText(tokenAddress)
      alert(t('copied'))
    } catch {
      alert(t('error_copy_token'))
    }
  }

  const valueBNB = parseFloat(sanitizeBnbInput(bnbAmount))
  const isValid = valueBNB >= minBuy && !isNaN(valueBNB)


  return (
  <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-xl bg-[#0a0a0a] border border-purple-700 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
      <div className="bg-[#111827] p-6 sm:p-8 rounded-xl space-y-5 shadow-inner">
        {localStorage.getItem('moonrise-last-tx') && !showSuccess && (
          <p className="text-yellow-400 text-center text-sm">{t('verifying_tx')}</p>
        )}

        {showSuccess ? (
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-purple-500 uppercase tracking-wide">
              {t('success_title')}
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mt-2">
              {t('success_desc_line1')}<br />
              <span className="text-white font-bold">{t('success_desc_line2')}</span>
            </p>
            <div className="bg-black border border-purple-600 p-4 rounded-xl text-sm mt-4">
              <p><span className="text-purple-400">📍 {t('network')}:</span> Binance Smart Chain (BSC)</p>
              <p><span className="text-purple-400">📬 {t('token')}:</span> {tokenSymbol}</p>
              <p><span className="text-purple-400">🔢 {t('decimals')}:</span> {tokenDecimals}</p>
              <div className="flex items-center justify-between break-all text-xs text-white/80 mt-2">
                <span className="truncate max-w-[85%]">{tokenAddress}</span>
                <button onClick={copyTokenAddress} className="bg-purple-600 hover:bg-purple-700 text-xs px-2 py-1 rounded">📋</button>
              </div>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 text-white font-bold rounded uppercase tracking-wider mt-6"
            >
              {t('buy_again')}
            </button>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-yellow-400 to-white tracking-wide uppercase">
                {t('intro_title')}
              </h1>
              <p className="text-base text-yellow-300 font-medium">
                {t('intro_subtitle')}
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>{t('phase')}:</strong> {currentPhase + 1}</p>
              <p>
                <strong>{t('price')}:</strong> {price.toFixed(8)} BNB
                <span className="text-gray-400 text-xs ml-1">
                  (~{
                    isPT && bnbToBRL ? formatFiat(price * bnbToBRL, 'BRL') :
                    !isPT && bnbToUSD ? formatFiat(price * bnbToUSD, 'USD') : '...'
                  })
                </span>
              </p>
              <p><strong>{t('sold')}:</strong> {sold.toLocaleString()}</p>
            </div>

            {isConnected && (
              <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                <span>{t('wallet')}:</span>
                <span className="flex items-center gap-2">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                  <button onClick={copyAddress} className="bg-gray-800 px-2 rounded">📋</button>
                  {copied && <span className="text-green-400">{t('copied')}</span>}
                  <button onClick={() => disconnect()} className="bg-red-700 px-2 rounded">{t('disconnect')}</button>
                </span>
              </div>
            )}

            <div className="flex justify-between text-sm text-gray-400">
              <span>{t('balance')}:</span>
              <span>{isConnected && balance?.formatted ? Number(balance.formatted).toFixed(4) : '--'} BNB</span>
            </div>

            <div className="flex gap-2 w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder={t('input_placeholder')}
                  value={bnbAmount}
                  onChange={handleInput}
                  className="w-full p-3 pr-16 rounded-lg bg-black text-white placeholder-gray-500 border border-purple-500 focus:ring-2 focus:ring-purple-600"
                  disabled={!isConnected}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => isConnected && balance?.formatted && setBnbAmount(Number(balance.formatted).toFixed(4))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs"
                >{t('max')}</button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {!isValid && !error && <p className="text-sm text-yellow-400">⚠ {t('error_minimum', { min: minBuy })}</p>}

            <p className="text-sm text-white">{t('receive')} <strong className="text-yellow-400">{tokensToReceive} MNR</strong></p>

            {!isConnected ? (
              <div className="w-full flex justify-center">
                <ConnectButton showBalance={false} chainStatus="icon" />
              </div>
            ) : (
              <button
                onClick={executeBuy}
                disabled={buying || !isValid}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg disabled:opacity-40 transition-all"
              >
                ✅ {buying ? t('processing') : t('confirm')}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  </section>
)
}
