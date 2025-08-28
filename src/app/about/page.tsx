// SPDX-License-Identifier: MIT
'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import LegalDisclaimer from '../components/LegalDisclaimer';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: 0.1 * i, ease: 'easeOut' },
});

export default function AboutCompanyPage() {
  const { t } = useTranslation('about');
  const { t: tTransp } = useTranslation('transparencia');

  const stats = t('stats', { returnObjects: true }) as { value: string; label: string }[];
  const whoParas = t('who.paragraphs', { returnObjects: true }) as string[];
  const purposeItems = t('purpose.items', { returnObjects: true }) as string[];
  const valueItems = t('values.items', { returnObjects: true }) as string[];
  const xpItems = t('experience.items', { returnObjects: true }) as string[];

  const EMAIL = 'contact@moonrise.finance';
  const EMAIL_HREF = `mailto:${EMAIL}`;
  const TELEGRAM_SUPPORT = 'https://t.me/moonrisesupport';
  const TELEGRAM_COMMUNITY = 'https://t.me/moonriseofficialcommunity';
  const IG_BR = 'https://www.instagram.com/moonriseoficial';
  const IG_EN = 'https://www.instagram.com/moonrise.global';
  const TIKTOK = 'https://www.tiktok.com/@moonriseoficial';
  const TWITTER = 'https://twitter.com/moonriseoficial';

  const cardBase = 'relative rounded-2xl bg-white/3 border border-white/10 backdrop-blur-[1px]';
  const lineTop  = 'absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-2xl';

  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* BACKDROP premium (coeso com MoonWallet) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 -left-40 h-[720px] w-[720px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side,#a855f7 0%,transparent 70%)', opacity: .18 }}
        />
        <div
          className="absolute -bottom-64 -right-40 h-[640px] w-[640px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side,#f59e0b 0%,transparent 70%)', opacity: .14 }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        {/* HERO */}
        <motion.div {...fade(0)} className="text-center space-y-6">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-purple-300/80">
            {t('hero.tag')}
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05]">
            <span className="text-white">{t('title')}{' '}</span>
            <span className="bg-gradient-to-r from-purple-500 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              Holdings
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-300">
            {t('hero.lead')}
          </p>

          {/* STATS – cartões leves com linha inferior */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                {...fade(i)}
                className={`${cardBase} py-4 px-5 text-center`}
              >
                <span className="pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-2xl" />
                <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                <div className="text-xs md:text-sm text-gray-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* QUEM SOMOS – texto limpo com divisores sutis */}
        <motion.section {...fade(1)} className="mt-20 md:mt-28">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">{t('who.title')}</h2>
          <div className="mx-auto max-w-3xl space-y-6 text-gray-300 text-lg">
            {whoParas.map((p, i) => (
              <div key={i}>
                <p>{p}</p>
                <div className="mt-6 h-px bg-gradient-to-r from-white/12 to-transparent" />
              </div>
            ))}
          </div>
        </motion.section>

        {/* PARA QUE VIEMOS & VALORES – painéis leves */}
        <section className="mt-16 grid md:grid-cols-2 gap-6">
          <motion.div {...fade(0)} className={`${cardBase} p-6 md:p-8`}>
            <span className={lineTop} />
            <h3 className="text-2xl font-semibold mb-3">{t('purpose.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              {purposeItems.map((it, i) => <li key={i}>• {it}</li>)}
            </ul>
          </motion.div>

          <motion.div {...fade(1)} className={`${cardBase} p-6 md:p-8`}>
            <span className={lineTop} />
            <h3 className="text-2xl font-semibold mb-3">{t('values.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              {valueItems.map((it, i) => <li key={i}>• {it}</li>)}
            </ul>
          </motion.div>
        </section>

        {/* NOSSA EXPERIÊNCIA – cartões leves */}
        <motion.section {...fade(2)} className="mt-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">{t('experience.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {xpItems.map((it, i) => (
              <motion.div key={i} {...fade(i)} className={`${cardBase} p-6 text-gray-300`}>
                <span className={lineTop} />
                {it}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* REGISTRO LEGAL – painel com divisores */}
        <motion.section {...fade(3)} className="mt-20">
          <div className="mx-auto max-w-md sm:max-w-2xl text-center px-4">
            <h3 className="text-2xl font-semibold mb-4">{t('legal.title')}</h3>

            <div className={`${cardBase} w-full p-4 sm:p-5`}>
              <span className={lineTop} />
              <ul
                className="
                  flex flex-col sm:flex-row sm:flex-wrap items-center justify-center
                  gap-2 sm:gap-0 sm:divide-x sm:divide-white/10
                  text-sm sm:text-base
                "
                aria-label={t('legal.title')}
              >
                <li className="px-0 sm:px-4 text-gray-300 break-words">{t('legal.company')}</li>
                <li className="px-0 sm:px-4 text-gray-300 break-words">{t('legal.place')}</li>
                <li className="px-0 sm:px-4 text-gray-300 break-all font-mono">{t('legal.id')}</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* CONTATO – bloco premium com CTA e redes */}
        <motion.section {...fade(4)} className="mt-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className={`${cardBase} ring-1 ring-purple-500/10 shadow-[0_0_25px_rgba(168,85,247,0.08)]`}>
              <span className={lineTop} />
              <div className="py-10 px-6 text-center space-y-5">
                <h3 className="text-3xl md:text-4xl font-extrabold">
                  <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
                    {t('contact.title')}
                  </span>
                </h3>

                <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
                  {t('contact.summary')}
                </p>

                <a href={EMAIL_HREF} className="inline-block text-blue-300 hover:text-blue-200 underline break-words">
                  contact@moonrise.finance
                </a>

                <div>
                  <a
                    href={TELEGRAM_SUPPORT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-black
                      bg-yellow-500 hover:bg-yellow-400 transition shadow-[0_10px_30px_rgba(245,158,11,0.25)]
                      focus:outline-none focus:ring-2 focus:ring-purple-400
                    "
                    aria-label={t('cta.contact')}
                  >
                    <FaTelegramPlane className="text-base translate-y-[0.5px]" />
                    {t('cta.contact')}
                  </a>
                </div>

                <div className="h-px bg-white/10 my-2" />

                <div className="text-[12px] text-gray-400 flex items-center justify-center gap-2">
                  <LegalDisclaimer
                    label={tTransp('docs_links.termo_link')}
                    className="text-[12px] text-purple-300 underline underline-offset-4 hover:text-purple-100"
                  />
                </div>

                {/* Redes */}
                <div className="pt-6">
                  <p className="text-sm text-gray-400 mb-4">Canais Oficiais:</p>
                  <div className="flex justify-center gap-6 text-xl">
                    <a href={TELEGRAM_COMMUNITY} target="_blank" rel="noopener noreferrer" title="Telegram" aria-label="Telegram oficial MoonRise" className="hover:text-purple-300 transition">
                      <FaTelegramPlane />
                    </a>

                    {/* Instagram com tooltip acessível */}
                    <div className="relative group">
                      <button type="button" title="Instagram" aria-label="Perfis do Instagram" className="hover:text-purple-300 transition cursor-pointer outline-none">
                        <FaInstagram />
                      </button>
                      <div
                        className="absolute hidden group-hover:flex group-focus-within:flex top-7 left-1/2 -translate-x-1/2
                                   bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white shadow-md py-2 px-3 z-10
                                   min-w-[220px] justify-center"
                        role="dialog"
                        aria-label="Perfis do Instagram"
                      >
                        <div className="whitespace-nowrap space-y-1 text-center">
                          <a href={IG_BR} target="_blank" rel="noopener noreferrer" className="block hover:text-purple-300">🇧🇷 @moonriseoficial</a>
                          <a href={IG_EN} target="_blank" rel="noopener noreferrer" className="block hover:text-purple-300">🇺🇸 @moonrise.global</a>
                        </div>
                      </div>
                    </div>

                    <a href={TIKTOK} target="_blank" rel="noopener noreferrer" title="TikTok" aria-label="TikTok oficial MoonRise" className="hover:text-purple-300 transition">
                      <FaTiktok />
                    </a>

                    <a href={TWITTER} target="_blank" rel="noopener noreferrer" title="X (Twitter)" aria-label="Perfil no X (Twitter)" className="hover:text-purple-300 transition">
                      <FaXTwitter />
                    </a>
                  </div>
                </div>

                <p className="text-xs text-gray-500 pt-2">{t('contact.hours')}</p>
              </div>
            </div>
          </div>
        </motion.section>

        <footer className="w-full mt-20 py-6 text-center text-sm text-gray-500">
          {new Date().getFullYear()} © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
        </footer>
      </section>
    </main>
  );
}
