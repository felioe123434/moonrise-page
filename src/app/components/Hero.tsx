// SPDX-License-Identifier: MIT
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Trans, useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'

/** =========================
 *  Tipos
 *  ========================= */
type Kpi = {
  label: string
  value?: string
  countTo?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

/** =========================
 *  Helpers
 *  ========================= */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function useCountUp(target: number, play: boolean, durationMs = 1600, decimals = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!play) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs)
      setVal(parseFloat((target * easeOutCubic(p)).toFixed(decimals)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, play, durationMs, decimals])
  return val
}

function Counter({ to, play, decimals = 0 }: { to: number; play: boolean; decimals?: number }) {
  const val = useCountUp(to, play, 1500, decimals)
  return (
    <>{val.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>
  )
}

function KpiStat({ item, play, emphasize }: { item: Kpi; play: boolean; emphasize?: boolean }) {
  const hasCounter = typeof item.countTo === 'number'
  const number = hasCounter ? undefined : (item.value ?? '')
  return (
    <>
      <div
        className={[
          emphasize ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl',
          'font-extrabold leading-none tracking-tight',
          'bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent',
        ].join(' ')}
      >
        {item.prefix}
        {hasCounter ? (
          <Counter to={item.countTo as number} play={play} decimals={item.decimals ?? 0} />
        ) : (
          number
        )}
        {item.suffix}
      </div>
      <div className="mt-2 text-sm md:text-base text-gray-400">{item.label}</div>
    </>
  )
}

/** =========================
 *  HERO
 *  ========================= */
export default function Hero() {
  const { t } = useTranslation('hero')

  // helper para arrays vindos do i18n
  const arr = <T = any>(key: string, fb: T[] = []): T[] => {
    const v = t(key, { returnObjects: true }) as unknown
    return Array.isArray(v) ? (v as T[]) : fb
  }

  // KPIs virão do JSON — já ordene lá como: [RWA, %, LLC]
  const kpis = arr<Kpi>('kpis')

  // dispara animação de contagem quando entra na viewport
  const kpiRef = useRef<HTMLDivElement | null>(null)
  const kpisInView = useInView(kpiRef, { once: true, amount: 0.35 })

  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      {/* Fundo premium dinâmico (glows + grade técnica) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-40 -left-40 h-[780px] w-[780px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, #a855f7 0%, transparent 70%)' }}
          initial={{ opacity: 0.18, scale: 0.95 }}
          animate={{ opacity: [0.18, 0.28, 0.18], scale: [0.95, 1.02, 0.95] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-56 -right-40 h-[680px] w-[680px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, #f59e0b 0%, transparent 70%)' }}
          initial={{ opacity: 0.14, scale: 1.02 }}
          animate={{ opacity: [0.14, 0.22, 0.14], scale: [1.02, 0.96, 1.02] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-28 pb-14">
        {/* Linha superior */}
        <div className="flex items-center justify-between gap-4">
          <motion.p
            className="text-xs md:text-sm uppercase tracking-[0.25em] text-purple-300/80"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('eyebrow')}
          </motion.p>
          <motion.span
            className="hidden md:inline-flex items-center gap-2 text-xs text-gray-300/90"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_2px_rgba(52,211,153,0.4)]" />
            {t('trustBadge')}
          </motion.span>
        </div>

        {/* Headline */}
        <motion.h1
          className="mt-6 font-extrabold leading-[1.02] tracking-tight text-5xl md:text-7xl lg:text-8xl max-w-[18ch]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Trans
            i18nKey="headline"
            t={t}
            components={{
              1: <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent" />,
              3: <span className="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent" />,
              br: <br />
            }}
          />
        </motion.h1>

        {/* Slogan + Textinho institucional */}
        <motion.p
          className="mt-6 text-lg md:text-2xl text-white/90 max-w-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {t('slogan')}
        </motion.p>
        <motion.p
          className="mt-3 text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('subhead')}
        </motion.p>

        {/* KPIs — 3 cards minimalistas: RWA • % • LLC */}
        <motion.section
          ref={kpiRef}
          className="mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {kpis.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className={[
                  'group relative rounded-xl px-6 md:px-8 py-6',
                  'bg-white/3 backdrop-blur-[1px]',
                  'border border-white/10',
                ].join(' ')}
              >
                {/* acento de marca na base */}
                <span className="pointer-events-none absolute left-0 right-0 -bottom-[1px] h-[2px] opacity-80 bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500" />
                <KpiStat item={item} play={!!kpisInView} emphasize={i === 1} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Linha institucional */}
        <motion.div
          className="mt-6 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {t('institutionalLine')}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/ecosystem"
            className="inline-flex items-center justify-center rounded-xl px-8 py-3 font-semibold bg-white text-black hover:opacity-95 hover:scale-[1.02] active:scale-[0.99] transition will-change-transform shadow-[0_10px_30px_rgba(255,255,255,0.08)]"
          >
            {t('cta.ecosystem')}
          </Link>
          <Link
            href="/presales"
            className="inline-flex items-center justify-center rounded-xl px-8 py-3 font-semibold bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.99] transition will-change-transform shadow-[0_10px_30px_rgba(245,158,11,0.25)]"
          >
            {t('cta.presale')}
          </Link>
        </motion.div>
      </div>

      {/* divisor sutil */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  )
}
