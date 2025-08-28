// SPDX-License-Identifier: MIT
'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Activity,
  Network,
  Download,
  DollarSign,
  Smartphone,
  CheckCircle2,
  Loader2,
  ArrowRightCircle
} from 'lucide-react'

export default function MoonWallet() {
  const { t } = useTranslation('moonwallet')

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

  const TELEGRAM_UPDATES = 'https://t.me/moonriseofficialcommunity'

  const fadeUp = (i = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: 0.08 * i, ease: 'easeOut' }
  })

  /** Ícones simples para dar semântica visual sem depender do texto */
  const featureIcons = [ShieldCheck, Activity, Network, Download, DollarSign, Smartphone]
  const diffIcons = [ShieldCheck, Activity, Network, DollarSign]

  return (
    <main className="relative bg-black text-white overflow-hidden">
      {/* BACKDROP premium */}
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

      <section className="max-w-[1300px] mx-auto px-6 py-16 md:py-24 space-y-16">

        {/* HERO */}
        <div className="flex justify-center">
          <motion.header {...fadeUp(0)} className="w-full max-w-3xl space-y-6">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-purple-300/80">
              {t('badge', 'APP • EXECUÇÃO • ON-CHAIN')}
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-amber-300">
                {t('title')}
              </span>
              <span className="block text-white">
                {t('subtitle', 'controle direto sobre seus ativos')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200">
              {t('description', 'Leitura on-chain, sem custódia e sem intermediários. Precisão e velocidade no que é seu.')}
            </p>

            {/* Barra de provas (pills premium) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                  className="text-xs md:text-sm rounded-full px-3 py-2 text-gray-100 bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-[1px]"
                >
                  {p}
                </span>
              ))}
            </div>

            <p className="text-xs text-gray-500">
              {t('evolving', 'App em evolução contínua — versão, medição e melhoria.')}
            </p>
          </motion.header>
        </div>

        {/* DIVISOR sutil */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* VISÃO */}
        <motion.section {...fadeUp(0)} className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-purple-300">
            {t('visionTitle', 'Mais que uma carteira')}
          </h2>
          <p className="text-gray-200 text-lg">
            {t('vision1', 'Operação real 24/7 direto na blockchain. O que você vê é o que a rede enxerga.')}
          </p>
          <p className="text-gray-400">
            {t('vision2', 'Construída para executores: simples, rápida e precisa.')}
          </p>
        </motion.section>

        {/* FUNCIONALIDADES */}
        {features.length > 0 && (
          <motion.section {...fadeUp(1)} className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold text-purple-200 mb-6 text-center">
              {t('featuresTitle', 'Funcionalidades já em execução')}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {features.map((item, i) => {
                const Icon = featureIcons[i % featureIcons.length]
                return (
                  <li
                    key={i}
                    className="group relative bg-white/3 backdrop-blur-[1px] border border-white/10 rounded-xl p-4 hover:scale-[1.015] transition"
                  >
                    <span className="pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80" />
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-lg p-2 bg-white/5 border border-white/10 group-hover:bg-white/10 transition">
                        <Icon className="w-5 h-5 text-purple-200" />
                      </div>
                      <span className="text-gray-200">{item}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </motion.section>
        )}

        {/* DIFERENCIAIS */}
        {diffs.length > 0 && (
          <motion.section {...fadeUp(2)} className="max-w-6xl mx-auto">
            <div className="relative border border-white/12 rounded-2xl p-8 md:p-10 bg-white/3 backdrop-blur-[1px]">
              <span className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-2xl" />
              <h3 className="text-2xl font-bold text-purple-100 text-center mb-6">
                {t('differentialsTitle', 'Por que é diferente')}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {diffs.map((item, i) => {
                  const Icon = diffIcons[i % diffIcons.length]
                  return (
                    <li key={i} className="bg-white/4 p-4 rounded-lg border border-white/10 flex items-start gap-3">
                      <div className="rounded-lg p-2 bg-white/5 border border-white/10">
                        <Icon className="w-5 h-5 text-purple-200" />
                      </div>
                      <span className="text-gray-200">{item}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.section>
        )}

        {/* STATUS */}
        {(ready.length + progress.length + next.length > 0) && (
          <motion.section {...fadeUp(3)} className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-6">
              {t('statusTitle', 'Status de desenvolvimento')}
            </h3>

            <div className="grid md:grid-cols-3 gap-5">
              {/* Pronto */}
              <StatusColumn
                color="emerald"
                title={t('status.readyTitle', 'Pronto')}
                items={ready}
                Icon={CheckCircle2}
              />
              {/* Em progresso */}
              <StatusColumn
                color="amber"
                title={t('status.progressTitle', 'Em progresso')}
                items={progress}
                Icon={Loader2}
                spin
              />
              {/* Próximo */}
              <StatusColumn
                color="purple"
                title={t('status.nextTitle', 'Próximo')}
                items={next}
                Icon={ArrowRightCircle}
              />
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
            className="inline-flex items-center justify-center gap-2 mt-1 bg-yellow-500 text-black font-semibold py-2.5 px-6 rounded-full hover:bg-yellow-400 transition shadow-[0_10px_30px_rgba(245,158,11,0.25)]"
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

/** Coluna de status com borda colorida e micro-animação */
function StatusColumn({
  color,
  title,
  items,
  Icon,
  spin = false
}: {
  color: 'emerald' | 'amber' | 'purple'
  title: string
  items: string[]
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  spin?: boolean
}) {
  const ringColor =
    color === 'emerald'
      ? 'ring-emerald-500/40'
      : color === 'amber'
      ? 'ring-amber-500/40'
      : 'ring-purple-500/40'

  return (
    <div className={`bg-white/3 backdrop-blur-[1px] border border-white/10 rounded-xl p-6 ring-1 ${ringColor}`}>
      <div className="flex items-center gap-2 text-lg font-semibold mb-3">
        <Icon className={`w-5 h-5 ${spin ? 'animate-spin-slow' : ''}`} />
        <span>{title}</span>
      </div>
      <ul className="space-y-2 text-gray-300 text-sm">
        {items.length ? items.map((it, j) => <li key={j}>• {it}</li>) : <li className="text-gray-500">—</li>}
      </ul>
      <style jsx global>{`
        .animate-spin-slow { animation: spin 2.4s linear infinite; }
      `}</style>
    </div>
  )
}
