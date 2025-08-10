// SPDX-License-Identifier: MIT
'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function AppMoonRise() {
  const { t } = useTranslation('appmoonrise');

  const features = t('features', { returnObjects: true }) as string[];
  const diffs = t('differentials', { returnObjects: true }) as string[];

  return (
    <main className="bg-black text-white px-6 py-16 space-y-24 max-w-[1300px] mx-auto">
      {/* HERO */}
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold text-purple-500 tracking-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
        >
          {t('description')}
        </motion.p>

        {/* STATUS + VÍDEO */}
        <div className="mt-12 space-y-6">
          <p className="text-yellow-400 font-semibold text-sm italic">
            {t('status')} — <span className="text-gray-400">{t('status_sub')}</span>
          </p>

          <div className="relative w-[300px] sm:w-[320px] md:w-[360px] mx-auto aspect-[9/19.5]">
  {/* VÍDEO AJUSTADO */}
  <video
    src="/Captura1.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-[5.8%] left-[6.7%] w-[86.7%] h-[88.5%] object-cover rounded-xl z-0"
    style={{ background: '#000' }}
  />
</div>



         <p className="text-sm text-gray-400 max-w-lg mx-auto italic">{t('preview')}</p>

{/* AVISO SOBRE O IDIOMA DO APP */}
<p className="text-sm text-gray-500 max-w-lg mx-auto text-center mt-4">
  {t('language_notice')}
</p>

        </div>
      </section>

      {/* VISÃO & PROPÓSITO */}
      <section className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">{t('visionTitle')}</h2>
        <p className="text-gray-300 leading-relaxed text-lg">{t('vision1')}</p>
        <p className="text-gray-400 leading-relaxed text-md">{t('vision2')}</p>
      </section>

      {/* FUNCIONALIDADES ATIVAS */}
      <section className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-purple-200 mb-6 text-center">
          {t('featuresTitle')}
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-200 text-sm sm:text-base">
          {features.map((item, i) => (
            <li
              key={i}
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* DIFERENCIAIS */}
      <section className="border border-purple-800 p-10 rounded-xl max-w-6xl mx-auto text-center text-gray-200 space-y-6 shadow-xl">
        <h3 className="text-2xl font-bold text-purple-100">{t('differentialsTitle')}</h3>
        <ul className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base">
          {diffs.map((item, i) => (
            <li
              key={i}
              className="bg-zinc-900 p-4 rounded-lg border border-zinc-700 shadow-sm hover:shadow-md transition-all"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ENCERRAMENTO */}
      <section className="text-center space-y-6 mt-20 px-6 max-w-3xl mx-auto">
        <p className="text-gray-400 text-lg italic">{t('closing')}</p>
        <a
          href="https://t.me/moonriseofficialcommunity"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full transition-all"
        >
          {t('cta') || 'Acompanhar Lançamento no Telegram'}
        </a>
      </section>
    </main>
  );
}
