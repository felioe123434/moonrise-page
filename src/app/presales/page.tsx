// SPDX-License-Identifier: MIT
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';
import contractAbi from '../../abi/PresaleABI.json';
import PresalePanel from '../components/presalepanel';
import { FaRocket, FaWater, FaCogs, FaLayerGroup, FaGlobeAmericas } from 'react-icons/fa';

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

  // preços informativos por fase (BNB)
  const realPrices = [0.0000065959, 0.0000079542, 0.0000086765];

  const brandTitle =
    'font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent';

  /* ----------------------------- Cotações ----------------------------- */
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

  /* --------------------------- Fase atual --------------------------- */
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

  /* ----------------------- Tokens vendidos ----------------------- */
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

  /* ---------------------- Animação do contador ---------------------- */
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

  const cardBase = 'relative rounded-xl bg-white/3 border border-white/10 backdrop-blur-[1px]';

  // Normaliza a fase retornada pelo contrato (se vier 1..3, vira 0..2)
  const normalizePhase = (p: number | null) => (p === null ? null : p > 2 ? p - 1 : p);

  return (
    <>
      <main className="min-h-screen bg-black text-white px-6 pt-20 md:pt-24 pb-16 max-w-5xl mx-auto">
        {/* HERO */}
        <section className="mb-14 md:mb-16 text-center">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl ${brandTitle} mb-3 drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]`}>
            {t('hero.title')}
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-7 max-w-3xl mx-auto">
            {t('hero.description')}
          </p>
          <button
            onClick={() => setShowPresale(true)}
            className="inline-flex items-center justify-center bg-yellow-500 text-black px-6 py-2.5 rounded-xl font-semibold hover:bg-yellow-400 active:scale-[0.99] transition shadow-[0_10px_22px_rgba(245,158,11,0.22)]"
            aria-label={t('hero.button')}
          >
            {t('hero.button')} ↗
          </button>
        </section>

        {/* CONTADOR */}
        <section className="mb-16 flex justify-center">
          <div className={`${cardBase} px-7 py-5 text-center w-full max-w-xs`}>
            <span className="pointer-events-none absolute left-0 right-0 -bottom-[1px] h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-xl" />
            <p className="text-xs text-gray-400 mb-1.5 font-medium">{t('phases.counterTitle')}</p>
            <p className="text-3xl md:text-4xl font-extrabold text-yellow-400 tracking-wide mb-1" aria-live="polite" aria-atomic="true">
              {(isPT ? animatedSold.toLocaleString('pt-BR') : animatedSold.toLocaleString('en-US'))} MNR
            </p>
            <a
              href="https://t.me/moonbuynotifications"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-1 block text-center text-[12px] text-gray-400 hover:text-yellow-400 transition underline"
            >
              {t('phases.notificationsLink')}
            </a>
          </div>
        </section>

        {/* BOTÕES – Tokenomics / Transparência */}
        <section className="mb-14">
          <div className="mx-auto w-full max-w-2xl">
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3.5">
              <Link href="/tokenomics" className="w-full sm:w-auto" aria-label={t('buttons.tokenomics')}>
                <span className="block w-full text-center px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-semibold shadow-lg hover:opacity-90 active:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
                  📊 {t('buttons.tokenomics')}
                </span>
              </Link>

              <Link href="/transparency" className="w-full sm:w-auto" aria-label={t('buttons.transparency')}>
                <span className="block w-full text-center px-7 py-3 rounded-xl border border-yellow-500 text-yellow-400 font-semibold shadow-lg hover:bg-yellow-500 hover:text-black active:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition">
                  🔎 {t('buttons.transparency')}
                </span>
              </Link>
            </div>

            <p className="mt-3 text-center text-xs md:text-sm text-gray-300">{t('buttons.helper')}</p>
          </div>
        </section>

        {/* REDE (BNB) */}
        <section className="mb-12">
          <h2 className={`text-xl md:text-2xl mb-2 ${brandTitle}`}>{t('network.title')}</h2>
          <p className="text-gray-400 max-w-3xl">{t('network.description1')}</p>
          <p className="text-gray-400 mt-3">{t('network.description2')}</p>
        </section>

        {/* ESTRUTURA */}
        <section className="mb-12">
          <h2 className={`text-xl md:text-2xl mb-2 ${brandTitle}`}>{t('structure.title')}</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-2">
            <li>{t('structure.token')}</li>
            <li>{t('structure.smart')}</li>
            <li>{t('structure.phases')}</li>
            <li>{t('structure.delivery')}</li>
            <li>{t('structure.minimum')}</li>
            <li>{t('structure.network')}</li>
          </ul>

          <p className="mt-3 text-center">
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
        <section className="mb-16">
          <h2 className={`text-xl md:text-2xl mb-4 ${brandTitle}`}>{t('phases.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fases.map((fase, index) => {
              const priceBNB = realPrices[index];
              const fiat = isPT
                ? bnbToBRL ? `R$ ${(priceBNB * (bnbToBRL ?? 0)).toFixed(5)}` : ''
                : bnbToUSD ? `$ ${(priceBNB * (bnbToUSD ?? 0)).toFixed(5)}` : '';

              const activeIndex = normalizePhase(currentPhase);
              const isActive = activeIndex === index;

              return (
                <div
                  key={fase.id}
                  className={[
                    cardBase,
                    'p-6 relative transition-all duration-300 hover:shadow-[0_10px_24px_rgba(234,179,8,0.12)]',
                    isActive ? 'ring-1 ring-yellow-500/60' : 'ring-0',
                  ].join(' ')}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isActive && (
                    <span
                      className="absolute -top-2 -left-2 bg-yellow-500 text-black text-[10px] font-semibold px-2 py-0.5 rounded-full shadow ring-1 ring-black/20"
                      aria-label={t('phases.activeBadge')}
                      title={t('phases.activeBadge')}
                    >
                      {t('phases.activeBadge')}
                    </span>
                  )}

                  <span className="pointer-events-none absolute left-0 right-0 -bottom-[1px] h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-xl" />
                  <h3 className="text-lg font-bold mb-1">{fase.title}</h3>
                  <p className="text-gray-400 text-sm">{fase.supply}</p>
                  <p className="text-gray-400 text-sm">{fase.price}</p>
                  {fiat && <p className="text-gray-400 text-sm">({fiat})</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* PROPÓSITO */}
        <section className="mb-12">
          <h2 className={`text-xl md:text-2xl mb-2 ${brandTitle}`}>{t('purpose.title')}</h2>
          <p className="text-gray-400 max-w-3xl">{t('purpose.description')}</p>
        </section>

        {/* UTILIDADE */}
        <section className="mb-12">
          <h2 className={`text-xl md:text-2xl mb-2 ${brandTitle}`}>{t('utility.title')}</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>{t('utility.use1')}</li>
            <li>{t('utility.use2')}</li>
            <li>{t('utility.use3')}</li>
            <li>{t('utility.use4')}</li>
            <li>{t('utility.use5')}</li>
          </ul>
        </section>

        {/* SEGURANÇA */}
        <section className="mb-12">
          <h2 className={`text-xl md:text-2xl mb-2 ${brandTitle}`}>{t('security.title')}</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>{t('security.point1')}</li>
            <li>{t('security.point2')}</li>
            <li>{t('security.point3')}</li>
            <li>{t('security.point4')}</li>
          </ul>
        </section>

        {/* ROADMAP */}
        <section className="mb-20">
          <h2 className={`text-xl md:text-2xl mb-5 ${brandTitle}`}>{t('roadmap.title')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { Icon: FaRocket,        text: t('roadmap.step1') },
              { Icon: FaWater,         text: t('roadmap.step2') },
              { Icon: FaCogs,          text: t('roadmap.step3') },
              { Icon: FaLayerGroup,    text: t('roadmap.step4') },
              { Icon: FaGlobeAmericas, text: t('roadmap.step5') },
            ].map(({ Icon, text }, i) => (
              <div
                key={i}
                className={`${cardBase} p-4 text-center hover:translate-y-[-2px] transition`}
              >
                <span className="pointer-events-none absolute left-0 right-0 -bottom-[1px] h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-xl" />
                <Icon className="mx-auto mb-2 text-2xl text-purple-300" aria-hidden="true" focusable="false" />
                <p className="text-sm font-medium text-white leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHAMADA FINAL */}
        <section className="mb-12 text-center">
          <p className={`text-lg font-semibold ${brandTitle}`}>{t('call.title')}</p>
          <p className="text-gray-400 mt-3 max-w-3xl mx-auto">{t('call.description')}</p>
        </section>

        {/* DISCLAIMER */}
        <section className="border-t border-neutral-800 pt-6 pb-8">
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-gray-400">
            {t('legal.disclaimer')}
          </p>
        </section>
      </main>

      {/* FOOTER */}
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
