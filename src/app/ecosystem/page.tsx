'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation, Trans } from 'react-i18next';

type Item = {
  key: string;
  title: string;
  descKey: string;
  highlight?: boolean;
  badge?: string;
  href?: string;
};

export default function Ecosystem() {
  const { t } = useTranslation('ecosystem');

  // Ordem estratégica + destaques (sem MoonSwap)
  const items: Item[] = [
    { key: 'moonplus', title: 'Moon+', descKey: 'moonplus', highlight: true, badge: 'RWA', href: '/moonplus' },
    { key: 'mnr', title: 'MoonRise Token (MNR)', descKey: 'mnr', highlight: true, badge: 'Base', href: '/tokenomics' },
    { key: 'transparency', title: 'Transparência & MasterVault', descKey: 'transparency', highlight: true, badge: 'Segurança', href: '/transparency' },
    { key: 'moonwallet', title: 'MoonWallet', descKey: 'moonwallet', href: '/appmoonrise' },
    { key: 'moonbuy', title: 'MoonBuy', descKey: 'moonbuy' },
    { key: 'moonbank', title: 'MoonBank', descKey: 'moonbank' }
  ];

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

        {/* Grid com destaque (amarelo) em RWA, Base e Transparência */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const isHighlight = Boolean(item.highlight);
            const cardClasses = [
              'relative block border p-6 rounded-xl transition transform hover:scale-[1.02] text-left',
              'bg-neutral-900/40 focus:outline-none',
              isHighlight
                ? 'border-yellow-500/70 ring-1 ring-yellow-500/30 hover:border-yellow-400'
                : 'border-gray-700 hover:border-gray-500'
            ].join(' ');

            return (
              <Link key={item.key} href={item.href ?? '#'} className={cardClasses} aria-label={item.title}>
                {item.badge && (
                  <span
                    className={[
                      'absolute -top-3 left-4 text-[11px] tracking-wide',
                      'px-2 py-0.5 rounded-full',
                      isHighlight
                        ? 'bg-yellow-500 text-black'
                        : 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
                    ].join(' ')}
                  >
                    {item.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm break-words">{t(item.descKey)}</p>
              </Link>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="mt-14">
          <p className="text-gray-300 text-lg">
            {t('cta.subtitle')}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/presales"
              className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-400 transition"
              aria-label={t('cta.presale')}
            >
              {t('cta.presale')}
            </a>
            <a
              href="/transparency"
              className="inline-block border border-yellow-500 text-yellow-500 px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 hover:text-black transition"
              aria-label={t('cta.transparency')}
            >
              {t('cta.transparency')}
            </a>
          </div>
        </div>
      </div>

      <footer className="w-full mt-20 py-6 text-center text-sm text-gray-500">
        {new Date().getFullYear()} © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
      </footer>
    </section>
  );
}
