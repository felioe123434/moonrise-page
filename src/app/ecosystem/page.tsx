'use client';

import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

export default function Ecosystem() {
  const { t } = useTranslation('ecosystem');

  return (
    <section className="w-full bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm uppercase text-purple-400 font-semibold tracking-wider mb-4">
          {t('tagline')}
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          <Trans
            i18nKey="title"
            t={t}
            components={{
              1: <span className="text-purple-500" />,
              3: <span className="text-yellow-400" />,
              br: <br />
            }}
          />
        </h1>

        <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          {t('description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-700 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold text-white mb-2">MoonChain</h3>
            <p className="text-gray-400 text-sm break-words">{t('moonchain')}</p>
          </div>

          <div className="border border-gray-700 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold text-white mb-2">MoonWallet</h3>
            <p className="text-gray-400 text-sm break-words">{t('moonwallet')}</p>
          </div>

          <div className="border border-gray-700 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold text-white mb-2">MoonBuy</h3>
            <p className="text-gray-400 text-sm break-words">{t('moonbuy')}</p>
          </div>

          <div className="border border-gray-700 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold text-white mb-2">MoonSwap</h3>
            <p className="text-gray-400 text-sm break-words">{t('moonswap')}</p>
          </div>

          <div className="border border-gray-700 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold text-white mb-2">MoonBank</h3>
            <p className="text-gray-400 text-sm break-words">{t('moonbank')}</p>
          </div>

          <div className="border border-gray-700 p-6 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold text-white mb-2">MoonRise Token (MNR)</h3>
            <p className="text-gray-400 text-sm break-words">{t('mnr')}</p>
          </div>

          <div className="border border-gray-700 p-6 rounded-xl hover:scale-105 transition lg:col-span-3 w-full max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2">Moon+</h3>
            <p className="text-gray-400 text-sm break-words">{t('moonplus')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
