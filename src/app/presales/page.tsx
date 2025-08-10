'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';
import contractAbi from '../../abi/PresaleABI.json';
import PresalePanel from '../components/presalepanel';

const CONTRACT_ADDRESS = '0xeBa712f83323559E8d827302b6C7945343307F00';

export default function presales() {
  const { t, i18n } = useTranslation('presales');
  const [showPresale, setShowPresale] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<number | null>(null);
  const [sold, setSold] = useState<number | null>(null);
  const [animatedSold, setAnimatedSold] = useState(0);

  const isPT = i18n.language.startsWith('pt');
  const [bnbToBRL, setBnbToBRL] = useState<number | null>(null);
  const [bnbToUSD, setBnbToUSD] = useState<number | null>(null);

  const realPrices = [0.0000065959, 0.0000079542, 0.0000086765];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd,brl');
        const data = await res.json();
        setBnbToBRL(data.binancecoin.brl);
        setBnbToUSD(data.binancecoin.usd);
      } catch (err) {
        console.error('Erro ao buscar cotação BNB:', err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider);

    const fetchPhase = async () => {
      try {
        const phase = await contract.currentPhase();
        setCurrentPhase(phase.toNumber());
      } catch (error) {
        console.error('Erro ao buscar fase atual:', error);
      }
    };

    fetchPhase();
    const interval = setInterval(fetchPhase, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSold = async () => {
      try {
        const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider);
        const phase = await contract.currentPhase();
        const info = await contract.getPhaseInfo(phase);
        const soldAmount = Math.floor(Number(ethers.formatUnits(info[1], 18)));
        setSold(soldAmount);
      } catch (err) {
        console.error('Erro ao buscar tokens vendidos:', err);
        setSold(0);
      }
    };

    fetchSold();
    const interval = setInterval(fetchSold, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sold !== null) {
      let start = animatedSold;
      const end = sold;
      const duration = 500;
      const step = (end - start) / (duration / 16);
      let current = start;

      const animate = () => {
        current += step;
        if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
          setAnimatedSold(end);
          return;
        }
        setAnimatedSold(Math.floor(current));
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, [sold]);

  const fases = [
    {
      id: 0,
      title: t('phases.phase1.title'),
      supply: t('phases.phase1.supply'),
      price: t('phases.phase1.price'),
    },
    {
      id: 1,
      title: t('phases.phase2.title'),
      supply: t('phases.phase2.supply'),
      price: t('phases.phase2.price'),
    },
    {
      id: 2,
      title: t('phases.phase3.title'),
      supply: t('phases.phase3.supply'),
      price: t('phases.phase3.price'),
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-black text-white px-6 py-20 md:py-24 max-w-5xl mx-auto">
        {/* HERO */}
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t('hero.title')}</h1>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl">{t('hero.description')}</p>
          <button
            onClick={() => setShowPresale(true)}
            className="bg-yellow-500 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-400 transition"
          >
            {t('hero.button')}
          </button>
        </section>

        {/* CONTADOR */}
        <section className="mb-24 flex justify-center">
          <div className="bg-black border border-yellow-500 rounded-xl px-8 py-6 text-center shadow-md w-full max-w-xs">
            <p className="text-sm text-gray-400 mb-2 font-medium">{t('phases.counterTitle')}</p>
            <p className="text-4xl font-extrabold text-yellow-400 tracking-wide">
              {animatedSold.toLocaleString('pt-BR')} MNR
            </p>
          </div>
        </section>

        {/* BOTÕES */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mx-auto w-full max-w-md">
            <Link href="/tokenomics">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 w-full sm:w-auto">
                {t('buttons.tokenomics')}
              </button>
            </Link>
            <Link href="/transparency">
              <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 w-full sm:w-auto">
                {t('buttons.transparency')}
              </button>
            </Link>
          </div>
        </section>


   {/* REDE */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-2">{t('network.title')}</h2>
          <p className="text-gray-400 max-w-3xl">{t('network.description1')}</p>
          <p className="text-gray-400 mt-4">{t('network.description2')}</p>
        </section>

        {/* ESTRUTURA */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-2">{t('structure.title')}</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>{t('structure.token')}</li>
            <li>{t('structure.smart')}</li>
            <li>{t('structure.phases')}</li>
            <li>{t('structure.delivery')}</li>
            <li>{t('structure.minimum')}</li>
            <li>{t('structure.network')}</li>
          </ul>
        </section>

        {/* FASES */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fases.map((fase, index) => {
              const priceBNB = realPrices[index];
              const fiat = isPT
                ? bnbToBRL ? `R$ ${(priceBNB * bnbToBRL).toFixed(5)}` : ''
                : bnbToUSD ? `$ ${(priceBNB * bnbToUSD).toFixed(5)}` : '';

              return (
                <div
                  key={fase.id}
                  className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 transition-all duration-300 hover:border-yellow-500 hover:shadow-lg"
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
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-2">{t('purpose.title')}</h2>
          <p className="text-gray-400 max-w-3xl">{t('purpose.description')}</p>
        </section>

        {/* UTILIDADE */}
        <section className="mb-20">
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
        <section className="mb-20">
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
                <p className="font-medium text-white">{t(`roadmap.step${i}`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHAMADA FINAL */}
        <section className="mb-32">
          <p className="text-center text-xl font-semibold text-purple-500">{t('call.title')}</p>
          <p className="text-center text-gray-400 mt-4 max-w-3xl mx-auto">{t('call.description')}</p>
        </section>

        {/* DISCLAIMER */}
        <section className="text-sm text-gray-500 border-t border-neutral-800 pt-8 mt-6">
          {t('legal.disclaimer')}
        </section>
      </main>

      {/* MODAL DE PRÉ-VENDA */}
      {showPresale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 px-4">
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
