// SPDX-License-Identifier: MIT
'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function AppMoonRise() {
  const { t } = useTranslation('appmoonrise')

  // Helper seguro pra arrays vindos do i18n
  const arr = (key: string, fallback: string[] = []) => {
    const v = t(key, { returnObjects: true }) as unknown
    return Array.isArray(v) ? (v as string[]) : fallback
  }

  // Conteúdos (com fallbacks minimalistas)
  const features = arr('features')
  const diffs = arr('differentials')
  const ready = arr('status.ready')
  const progress = arr('status.progress')
  const next = arr('status.next')

  // Links (mantidos no arquivo)
  const TELEGRAM_UPDATES = 'https://t.me/moonrisecomunidadeoficial'

  const fadeUp = (i = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: 0.08 * i }
  })

  return (
    <main className="bg-black text-white">
      <section className="max-w-[1300px] mx-auto px-6 py-16 md:py-24 space-y-16">

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Textos */}
          <motion.div {...fadeUp(0)} className="space-y-6">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-purple-300/80">
              {t('badge', 'APP • EXECUÇÃO • ON-CHAIN')}
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">
              <span className="text-white">{t('title')}</span>
              <span className="block bg-gradient-to-r from-purple-500 to-yellow-400 bg-clip-text text-transparent">
                {t('subtitle', 'controle direto sobre seus ativos')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-xl">
              {t('description', 'Leitura on-chain, sem custódia e sem intermediários. Precisão e velocidade no que é seu.')}
            </p>

            {/* Barra de provas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              {[
                t('proofs.0', 'Não-custodial'),
                t('proofs.1', 'Leitura on-chain em tempo real'),
                t('proofs.2', 'Multi-chain EVM'),
                t('proofs.3', 'Import inteligente de tokens'),
                t('proofs.4', 'Cotações BRL / USD'),
                t('proofs.5', 'UI fluida para mobile')
              ].map((p, i) => (
                <span
                  key={i}
                  className="text-xs md:text-sm bg-[#0b0b0b] border border-gray-800 rounded-lg px-3 py-2 text-gray-300"
                >
                  {p}
                </span>
              ))}
            </div>

            <p className="text-xs text-gray-500">
              {t('evolving', 'App em evolução contínua — versão, medição e melhoria.')}
            </p>
          </motion.div>

          {/* Mockup / Vídeo */}
          <motion.div {...fadeUp(1)} className="flex justify-center">
            <div className="relative aspect-[9/19.5] w-[290px] sm:w-[320px] md:w-[360px]">
              {/* glow/ring */}
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-b from-purple-600/20 to-yellow-400/10 blur-2xl" />
              <div className="absolute inset-0 rounded-[2rem] bg-[#0a0a0a] border border-gray-800 p-2">
                <div className="relative h-full w-full rounded-[1.4rem] bg-black overflow-hidden">
                  <video
                    src="/video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* DIVISOR */}
        <div className="h-px w-full bg-white/5" />

        {/* VISÃO */}
        <motion.section {...fadeUp(0)} className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-purple-300">{t('visionTitle', 'Mais que uma carteira')}</h2>
          <p className="text-gray-300 text-lg">{t('vision1', 'Operação real 24/7 direto na blockchain. O que você vê é o que a rede enxerga.')}</p>
          <p className="text-gray-400">{t('vision2', 'Construída para executores: simples, rápida e precisa.')}</p>
        </motion.section>

        {/* FUNCIONALIDADES */}
        {features.length > 0 && (
          <motion.section {...fadeUp(1)} className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold text-purple-200 mb-6 text-center">
              {t('featuresTitle', 'Funcionalidades já em execução')}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-200">
              {features.map((item, i) => (
                <li
                  key={i}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 p-4 rounded-xl shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* DIFERENCIAIS */}
        {diffs.length > 0 && (
          <motion.section {...fadeUp(2)} className="max-w-6xl mx-auto">
            <div className="border border-purple-800/60 rounded-2xl p-8 md:p-10 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <h3 className="text-2xl font-bold text-purple-100 text-center mb-6">
                {t('differentialsTitle', 'Por que é diferente')}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-4 text-gray-200">
                {diffs.map((item, i) => (
                  <li key={i} className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}

        {/* STATUS */}
        {(ready.length + progress.length + next.length > 0) && (
          <motion.section {...fadeUp(3)} className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-6">{t('statusTitle', 'Status de desenvolvimento')}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: t('status.readyTitle', 'Pronto'), items: ready, color: 'border-green-600/40' },
                { title: t('status.progressTitle', 'Em progresso'), items: progress, color: 'border-yellow-600/40' },
                { title: t('status.nextTitle', 'Próximo'), items: next, color: 'border-purple-600/40' }
              ].map((col, i) => (
                <div key={i} className={`bg-[#0b0b0b] border ${col.color} rounded-xl p-6`}>
                  <div className="text-lg font-semibold mb-3">{col.title}</div>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    {col.items.length ? col.items.map((it, j) => <li key={j}>• {it}</li>) : <li className="text-gray-500">—</li>}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA FINAL */}
        <motion.section {...fadeUp(4)} className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-gray-400 text-sm italic">
            {t('disclaimer', 'O que você vê é execução real: tokens, saldos e rede ao vivo — sem simulação.')}
          </p>
          <a
            href={TELEGRAM_UPDATES}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 bg-white text-black font-semibold py-2 px-6 rounded-full hover:opacity-90 transition"
          >
            {t('cta', 'Acompanhar lançamento no Telegram')}
          </a>
        </motion.section>

       <footer className="w-full mt-20 py-6 text-center text-sm text-gray-500">
        {new Date().getFullYear()} © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
      </footer>

      </section>
    </main>
  )
}
