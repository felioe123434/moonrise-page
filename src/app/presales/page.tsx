// SPDX-License-Identifier: MIT
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';
import contractAbi from '../../abi/PresaleABI.json';
import PresalePanel from '../components/presalepanel';

const CONTRACT_ADDRESS = '0xeBa712f83323559E8d827302b6C7945343307F00';

export default function Presales() {
  const { t, i18n } = useTranslation('presales');
  const [showPresale, setShowPresale] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<number | null>(null);
  const [sold, setSold] = useState<number | null>(null);
  const [animatedSold, setAnimatedSold] = useState(0);

  const isPT = i18n.language?.startsWith('pt');
  const [bnbToBRL, setBnbToBRL] = useState<number | null>(null);
  const [bnbToUSD, setBnbToUSD] = useState<number | null>(null);

  // preços reais por fase (BNB)
  const realPrices = [0.0000065959, 0.0000079542, 0.0000086765];

  /* --------- Cotações --------- */
  useEffect(() => {
    let mounted = true;
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd,brl'
        );
        const data = await res.json();
        if (!mounted) return;
        setBnbToBRL(data?.binancecoin?.brl ?? null);
        setBnbToUSD(data?.binancecoin?.usd ?? null);
      } catch (err) {
        console.error('Erro ao buscar cotação BNB:', err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60_000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  /* --------- Fase atual --------- */
  useEffect(() => {
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider);

    const fetchPhase = async () => {
      try {
        const phase = await contract.currentPhase();
        setCurrentPhase(Number(phase));
      } catch (error) {
        console.error('Erro ao buscar fase atual:', error);
      }
    };

    fetchPhase();
    const interval = setInterval(fetchPhase, 15_000);
    return () => clearInterval(interval);
  }, []);

  /* --------- Tokens vendidos --------- */
  useEffect(() => {
    let mounted = true;
    const fetchSold = async () => {
      try {
        const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider);
        const phase = await contract.currentPhase();
        const info = await contract.getPhaseInfo(phase);
        const soldAmount = Math.floor(Number(ethers.formatUnits(info[1], 18)));
        if (!mounted) return;
        setSold(soldAmount);
      } catch (err) {
        console.error('Erro ao buscar tokens vendidos:', err);
        if (mounted) setSold(0);
      }
    };

    fetchSold();
    const interval = setInterval(fetchSold, 15_000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  /* --------- Animação do contador --------- */
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (sold === null) return;
    const start = animatedSold;
    const end = sold;
    const duration = 500;
    const startTs = performance.now();

    const animate = (ts: number) => {
      const p = Math.min(1, (ts - startTs) / duration);
      const value = Math.round(start + (end - start) * p);
      setAnimatedSold(value);
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sold]);

  const fases = [
    { id: 0, title: t('phases.phase1.title'), supply: t('phases.phase1.supply'), price: t('phases.phase1.price') },
    { id: 1, title: t('phases.phase2.title'), supply: t('phases.phase2.supply'), price: t('phases.phase2.price') },
    { id: 2, title: t('phases.phase3.title'), supply: t('phases.phase3.supply'), price: t('phases.phase3.price') },
  ];

  return (
    <>
      {/* MAIN – com padding extra no fim pra nunca encostar no rodapé */}
      <main className="min-h-screen bg-black text-white px-6 pt-20 md:pt-24 pb-16 max-w-5xl mx-auto">
        {/* HERO */}
        <section className="mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t('hero.title')}</h1>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl">{t('hero.description')}</p>
          <button
            onClick={() => setShowPresale(true)}
            className="block mx-auto bg-yellow-500 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-400 transition"
            aria-label={t('hero.button')}
          >
            {t('hero.button')}
          </button>
        </section>

        {/* CONTADOR */}
        <section className="mb-20 flex justify-center">
          <div className="bg-black border border-yellow-500 rounded-xl px-8 py-6 text-center shadow-md w-full max-w-xs">
            <p className="text-sm text-gray-400 mb-2 font-medium">{t('phases.counterTitle')}</p>
            <p
              className="text-4xl font-extrabold text-yellow-400 tracking-wide mb-2"
              aria-live="polite"
              aria-atomic="true"
            >
              {(isPT ? animatedSold.toLocaleString('pt-BR') : animatedSold.toLocaleString('en-US'))} MNR
            </p>
            <a
              href="https://t.me/moonbuynotifications"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-2 block text-center text-xs text-gray-400 hover:text-yellow-400 transition underline"
            >
              {t('phases.notificationsLink')}
            </a>
          </div>
        </section>

        {/* BOTÕES – Tokenomics / Transparência */}
        <section className="mb-16">
          <div className="mx-auto w-full max-w-2xl">
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4">
              <Link href="/tokenomics" className="w-full sm:w-auto" aria-label={t('buttons.tokenomics')}>
                <span className="block w-full text-center px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-semibold text-base shadow-lg hover:opacity-90 active:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
                  📊 {t('buttons.tokenomics')}
                </span>
              </Link>

              <Link href="/transparency" className="w-full sm:w-auto" aria-label={t('buttons.transparency')}>
                <span className="block w-full text-center px-7 py-4 rounded-2xl border border-yellow-500 text-yellow-400 font-semibold text-base shadow-lg hover:bg-yellow-500 hover:text-black active:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition">
                  🔎 {t('buttons.transparency')}
                </span>
              </Link>
            </div>

            <p className="mt-4 text-center text-sm text-gray-300">{t('buttons.helper')}</p>
          </div>
        </section>

        {/* REDE (BNB) */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-2">{t('network.title')}</h2>
          <p className="text-gray-400 max-w-3xl">{t('network.description1')}</p>
          <p className="text-gray-400 mt-4">{t('network.description2')}</p>
        </section>

        {/* ESTRUTURA */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-2">{t('structure.title')}</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-3">
            <li>{t('structure.token')}</li>
            <li>{t('structure.smart')}</li>
            <li>{t('structure.phases')}</li>
            <li>{t('structure.delivery')}</li>
            <li>{t('structure.minimum')}</li>
            <li>{t('structure.network')}</li>
          </ul>

          <p className="mt-4 text-center">
            <a
              href={`https://bscscan.com/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-sm text-yellow-400 hover:underline transition"
            >
              {t('structure.contractLink')}
            </a>
          </p>
        </section>

        {/* FASES */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fases.map((fase, index) => {
              const priceBNB = realPrices[index];
              const fiat = isPT
                ? bnbToBRL ? `R$ ${(priceBNB * (bnbToBRL ?? 0)).toFixed(5)}` : ''
                : bnbToUSD ? `$ ${(priceBNB * (bnbToUSD ?? 0)).toFixed(5)}` : '';

              const isActive = currentPhase === index;
              return (
                <div
                  key={fase.id}
                  className={[
                    'bg-neutral-900 p-6 rounded-xl border transition-all duration-300',
                    'hover:border-yellow-500 hover:shadow-lg',
                    isActive ? 'border-yellow-500 shadow-[0_0_0_3px_rgba(234,179,8,0.15)]' : 'border-neutral-700',
                  ].join(' ')}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <h3 className="text-xl font-bold mb-2">{fase.title}</h3>
                  <p className="text-gray-400 text-sm">{fase.supply}</p>
                  <p className="text-gray-400 text-sm">{fase.price}</p>
                  {fiat && <p className="text-gray-400 text-sm">({fiat})</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* PROPÓSITO */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-2">{t('purpose.title')}</h2>
          <p className="text-gray-400 max-w-3xl">{t('purpose.description')}</p>
        </section>

        {/* UTILIDADE */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-2">{t('utility.title')}</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>{t('utility.use1')}</li>
            <li>{t('utility.use2')}</li>
            <li>{t('utility.use3')}</li>
            <li>{t('utility.use4')}</li>
            <li>{t('utility.use5')}</li>
          </ul>
        </section>

        {/* SEGURANÇA */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-2">{t('security.title')}</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>{t('security.point1')}</li>
            <li>{t('security.point2')}</li>
            <li>{t('security.point3')}</li>
            <li>{t('security.point4')}</li>
          </ul>
        </section>

        {/* ROADMAP */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold mb-6">{t('roadmap.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-neutral-700 bg-neutral-900 text-center hover:border-yellow-500 transition"
              >
                <p className="text-sm font-medium text-white leading-snug">{t(`roadmap.step${i}`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHAMADA FINAL */}
        <section className="mb-16">
          <p className="text-center text-xl font-semibold text-purple-500">{t('call.title')}</p>
          <p className="text-center text-gray-400 mt-4 max-w-3xl mx-auto">{t('call.description')}</p>
        </section>

        {/* DISCLAIMER – separado do footer */}
        <section className="border-t border-neutral-800 pt-6 pb-8">
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-gray-400">
            {t('legal.disclaimer')}
          </p>
        </section>
      </main>

      {/* FOOTER REAL – sempre separado, com espaçamento próprio */}
      <footer className="bg-black">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center text-sm text-gray-500">
          {new Date().getFullYear()} © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
        </div>
      </footer>

      {/* MODAL DE PRÉ-VENDA */}
      {showPresale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <PresalePanel />
          <button
            onClick={() => setShowPresale(false)}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            {t('closeButton')}
          </button>
        </div>
      )}
    </>
  );
}
