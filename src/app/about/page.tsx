'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6' // X/Twitter
import LegalDisclaimer from '../components/LegalDisclaimer';


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 * i }
  })
}

export default function AboutCompanyPage() {
  const { t } = useTranslation('about')

  // i18n apenas para textos; LINKS ficam hardcoded abaixo
  const stats = t('stats', { returnObjects: true }) as { value: string; label: string }[]
  const whoParas = t('who.paragraphs', { returnObjects: true }) as string[]
  const purposeItems = t('purpose.items', { returnObjects: true }) as string[]
  const valueItems = t('values.items', { returnObjects: true }) as string[]
  const xpItems = t('experience.items', { returnObjects: true }) as string[]

  // LINKS (fixos no arquivo, sem JSON)
  const EMAIL = 'contact@moonrise.finance'
  const EMAIL_HREF = `mailto:${EMAIL}`
  const TELEGRAM_SUPPORT = 'https://t.me/moonrisesupport'
  const TELEGRAM_COMMUNITY = 'https://t.me/moonriseofficialcommunity'
  const IG_BR = 'https://www.instagram.com/moonriseoficial'
  const IG_EN = 'https://www.instagram.com/moonrise.global'
  const TIKTOK = 'https://www.tiktok.com/@moonriseoficial'
  const TWITTER = 'https://twitter.com/moonriseoficial'
  const { t: tTransp } = useTranslation('transparencia');
  
  return (
    <main className="relative w-full min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">

        {/* HERO */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          className="text-center space-y-6"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-purple-300/80">
            {t('hero.tag')}
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05]">
            <span className="text-white">{t('title')} </span>
            <span className="bg-gradient-to-r from-purple-500 to-yellow-400 bg-clip-text text-transparent">
              Holdings
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-300">
            {t('hero.lead')}
          </p>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i} custom={i} variants={fadeUp}
                className="bg-[#0b0b0b] border border-gray-800 rounded-xl py-4 px-5 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                <div className="text-xs md:text-sm text-gray-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* QUEM SOMOS */}
        <motion.section
          className="mt-20 md:mt-28"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">{t('who.title')}</h2>
          <div className="mx-auto max-w-3xl space-y-4 text-gray-300 text-lg">
            {whoParas.map((p, i) => (<p key={i}>{p}</p>))}
          </div>
        </motion.section>

        {/* PARA QUE VIEMOS & VALORES */}
        <motion.section
          className="mt-16 grid md:grid-cols-2 gap-6"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
        >
          {/* Purpose */}
          <motion.div
            custom={0} variants={fadeUp}
            className="bg-[#0b0b0b] border border-gray-800 hover:border-purple-500/40 transition rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-semibold mb-3">{t('purpose.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              {purposeItems.map((it, i) => (<li key={i}>• {it}</li>))}
            </ul>
          </motion.div>

          {/* Values */}
          <motion.div
            custom={1} variants={fadeUp}
            className="bg-[#0b0b0b] border border-gray-800 hover:border-yellow-400/40 transition rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-semibold mb-3">{t('values.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              {valueItems.map((it, i) => (<li key={i}>• {it}</li>))}
            </ul>
          </motion.div>
        </motion.section>

        {/* NOSSA EXPERIÊNCIA */}
        <motion.section
          className="mt-16"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">{t('experience.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {xpItems.map((it, i) => (
              <motion.div
                key={i} custom={i} variants={fadeUp}
                className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-6 text-gray-300"
              >
                {it}
              </motion.div>
            ))}
          </div>
        </motion.section>

      {/* REGISTRO LEGAL (responsivo) */}
<motion.section
  className="mt-20"
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
>
  <div className="mx-auto max-w-md sm:max-w-2xl text-center px-4">
    <h3 className="text-2xl font-semibold mb-4">{t('legal.title')}</h3>

    <div className="w-full bg-[#0b0b0b] border border-purple-500/30 rounded-2xl p-4 sm:p-5">
      <ul
        className="
          flex flex-col sm:flex-row sm:flex-wrap
          items-center justify-center
          gap-2 sm:gap-0
          sm:divide-x sm:divide-purple-500/30
          text-sm sm:text-base
        "
        aria-label={t('legal.title')}
      >
        <li className="px-0 sm:px-4 text-gray-300 break-words">
          {t('legal.company')}
        </li>
        <li className="px-0 sm:px-4 text-gray-300 break-words">
          {t('legal.place')}
        </li>
        <li className="px-0 sm:px-4 text-gray-300 break-all font-mono">
          {t('legal.id')}
        </li>
      </ul>
    </div>
  </div>
</motion.section>


      {/* CONTATO / FOOTER */}
<motion.section
  className="mt-24"
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
>
  <div className="max-w-3xl mx-auto px-6">
    {/* Card com fundo, borda e sombra */}
    <div className="rounded-2xl bg-[#0b0b0b]/70 border border-gray-800 ring-1 ring-purple-500/10 shadow-[0_0_25px_rgba(168,85,247,0.08)]">
      <div className="py-10 px-6 text-center space-y-5">

        <h3 className="text-3xl md:text-4xl font-extrabold">
          <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
            {t('contact.title')}
          </span>
        </h3>

        <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
          {t('contact.summary')}
        </p>

        {/* E-mail em linha */}
        <a
          href={EMAIL_HREF}
          className="inline-block text-blue-300 hover:text-blue-200 underline break-words"
        >
          {EMAIL}
        </a>

        {/* CTA destacado */}
        <div>
          <a
            href={TELEGRAM_SUPPORT}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group inline-flex items-center gap-2
              rounded-2xl px-6 py-3 text-[15px] font-semibold text-white
              bg-gradient-to-r from-purple-700 to-fuchsia-600
              ring-1 ring-purple-300/30 hover:ring-purple-300/60
              shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)]
              transition focus:outline-none focus:ring-2 focus:ring-purple-400
            "
            aria-label={t('cta.contact')}
          >
            <FaTelegramPlane className="text-base translate-y-[0.5px]" />
            {t('cta.contact')}
          </a>
        </div>

        {/* Separador para dar respiro */}
        <div className="h-px bg-white/10 my-2" />

        {/* Termo (modal) */}
        <div className="text-[12px] text-gray-400 flex items-center justify-center gap-2">
         
          <LegalDisclaimer
            label={tTransp('docs_links.termo_link')}
            className="text-[12px] text-purple-300 underline underline-offset-4 hover:text-purple-100"
          />
        </div>

        {/* Redes Sociais */}
        <div className="pt-6">
          <p className="text-sm text-gray-400 mb-4">Canais Oficiais:</p>
          <div className="flex justify-center gap-6 text-xl">
            {/* Telegram comunidade */}
            <a
              href={TELEGRAM_COMMUNITY}
              target="_blank" rel="noopener noreferrer"
              title="Telegram"
              aria-label="Telegram oficial MoonRise"
              className="hover:text-purple-300 transition"
            >
              <FaTelegramPlane />
            </a>

            {/* Instagram (tooltip simples) */}
            <div className="relative group">
              <button
                type="button"
                title="Instagram"
                aria-label="Perfis do Instagram"
                className="hover:text-purple-300 transition cursor-pointer outline-none"
              >
                <FaInstagram />
              </button>
              <div
                className="absolute hidden group-hover:flex group-focus-within:flex
                           top-7 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700
                           rounded-lg text-sm text-white shadow-md py-2 px-3 z-10
                           min-w-[220px] justify-center"
              >
                <div className="whitespace-nowrap space-y-1 text-center">
                  <a href={IG_BR} target="_blank" rel="noopener noreferrer" className="block hover:text-purple-300">
                    🇧🇷 @moonriseoficial
                  </a>
                  <a href={IG_EN} target="_blank" rel="noopener noreferrer" className="block hover:text-purple-300">
                    🇺🇸 @moonrise.global
                  </a>
                </div>
              </div>
            </div>

            <a
              href={TIKTOK}
              target="_blank" rel="noopener noreferrer"
              title="TikTok"
              aria-label="TikTok oficial MoonRise"
              className="hover:text-purple-300 transition"
            >
              <FaTiktok />
            </a>

            <a
              href={TWITTER}
              target="_blank" rel="noopener noreferrer"
              title="X (Twitter)"
              aria-label="Perfil no X (Twitter)"
              className="hover:text-purple-300 transition"
            >
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
  )
}
