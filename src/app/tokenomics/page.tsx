// SPDX-License-Identifier: MIT
'use client'

import React, { useMemo } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import {
  FaNetworkWired, FaHome, FaPiggyBank, FaProjectDiagram, FaChartPie
} from 'react-icons/fa'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

export default function TokenomicsPage() {
  const { t, i18n } = useTranslation('tokenomics')

  type Dist = { label: string | number; title: string }
  type Fund = { title: string; desc: string }

  const distribution = t('distribution', { returnObjects: true }) as Dist[]
  const funds = t('funds', { returnObjects: true }) as Fund[]

  const COLORS = ['#a855f7', '#38bdf8', '#22c55e', '#facc15', '#0ea5e9', '#f97316', '#ef4444', '#6b7280']

  /* ------------------------- helpers ------------------------- */
  const parsePercent = (v: string | number): number => {
    if (typeof v === 'number') return v
    const clean = v.toString().trim()
      .replace(/[^\d.,-]/g, '')
      .replace(/\.(?=\d{3}(?:\D|$))/g, '')
      .replace(',', '.')
    const n = Number(clean)
    return Number.isFinite(n) ? n : 0
  }

  const formatPercent = (n: number) =>
    `${new Intl.NumberFormat(i18n.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)}%`

  const chartData = useMemo(
    () => (distribution ?? []).map(d => ({ name: d.title, value: parsePercent(d.label) })),
    [distribution]
  )

  const totalPercent = useMemo(
    () => chartData.reduce((acc, i) => acc + (Number(i.value) || 0), 0),
    [chartData]
  )

  /* ------------------------- visual tokens ------------------------- */
  const cardBase = 'relative rounded-xl bg-white/3 border border-white/10 backdrop-blur-[1px]'
  // Padrão de título (mesmo da Transparência / Hero)
  const brandTitle = 'font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent'

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

      <div className="mx-auto w-full max-w-7xl px-6 py-14 space-y-16">
        {/* TITULO */}
        <section className="text-center">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl ${brandTitle} mb-4 drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]`}>
            {t('title')}
          </h1>
          <p className="text-gray-300 mx-auto max-w-3xl text-base md:text-lg leading-relaxed">
            <Trans t={t} i18nKey="intro" components={{ strong: <strong /> }} />
          </p>
        </section>

        {/* SUPPLY (painel leve com “linha” superior) */}
        <section className={`${cardBase} mx-auto w-full max-w-5xl p-6 md:p-8 text-sm`}>
          <span className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <p><strong>🧱 {t('supplyLabels.name')}:</strong> {t('supply.name')}</p>
            <p><strong>🪙 {t('supplyLabels.symbol')}:</strong> {t('supply.symbol')}</p>
            <p><strong><FaNetworkWired className="inline mr-2" aria-hidden="true" />{t('supplyLabels.network')}:</strong> {t('supply.network')}</p>
            <p><strong>📦 {t('supplyLabels.total')}:</strong> {t('supply.total')}</p>
            <p><strong>🔥 {t('supplyLabels.burned')}:</strong> {t('supply.burned')}</p>
            <p><strong>🔄 {t('supplyLabels.circulating')}:</strong> {t('supply.circulating')}</p>
          </div>

          {/* CTAs de confiança (chips) */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="/transparency" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">
              🔎 {t('buttons.transparency')}
            </a>
            <a href="https://bscscan.com/token/0xF46ca5A735E024B3F0aaBC5dfe242b5cA16B1278" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition" target="_blank" rel="noreferrer">
              🧾 {t('buttons.contract')}
            </a>
          </div>
        </section>

        {/* DISTRIBUIÇÃO */}
        <section className="w-full max-w-7xl mx-auto text-center space-y-8">
          <h2 className={`text-2xl md:text-3xl ${brandTitle}`}>{t('distributionTitle')}</h2>

          <div className="mx-auto" style={{ width: '100%', maxWidth: 640, height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart role="img" aria-label={t('distributionTitle')}>
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.25" />
                  </filter>
                </defs>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={86}
                  outerRadius={124}
                  paddingAngle={2}
                  dataKey="value"
                  isAnimationActive
                  stroke="#0b0b0f"
                  strokeWidth={2}
                  filter="url(#shadow)"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value: number, name: string) => [formatPercent(Number(value)), name]}
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    borderRadius: 8,
                    border: '1px solid #a855f7',
                    color: '#fff',
                    fontSize: 14
                  }}
                  labelStyle={{ color: '#a855f7' }}
                />
                <Legend verticalAlign="bottom" height={34} wrapperStyle={{ color: '#e5e7eb', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-gray-400 text-sm max-w-2xl mx-auto">{t('distributionNote')}</p>
          {Math.abs(totalPercent - 100) > 0.1 && (
            <p className="text-amber-300 text-xs">⚠️ {t('warnings.totalNot100', { total: formatPercent(totalPercent) })}</p>
          )}

          {/* Cards leves com “linha” inferior */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm font-bold max-w-5xl mx-auto">
            {distribution[0] && (
              <div className={`${cardBase} col-span-1 md:col-span-3 px-5 py-6 hover:scale-[1.015] transition`}>
                <span className="pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-xl" />
                <p className="text-purple-300 text-lg">{formatPercent(parsePercent(distribution[0].label))}</p>
                <p className="text-gray-200 mt-1 text-sm">{distribution[0].title}</p>
              </div>
            )}

            {distribution.slice(1).map((item, idx) => (
              <div key={idx} className={`${cardBase} px-5 py-6 hover:scale-[1.015] transition`}>
                <span className="pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-xl" />
                <p className="text-purple-300 text-lg">{formatPercent(parsePercent(item.label))}</p>
                <p className="text-gray-200 mt-1 text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* USO DOS FUNDOS */}
        <section className="max-w-6xl mx-auto text-center">
          <h2 className={`mb-4 text-2xl md:text-3xl ${brandTitle}`}>{t('fundsTitle')}</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed text-base">{t('fundsText')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[FaHome, FaPiggyBank, FaProjectDiagram, FaChartPie].map((Icon, idx) => (
              <div key={idx} className={`${cardBase} p-6 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.12)] transition`}>
                <Icon className="text-purple-300 text-4xl mb-4 mx-auto" aria-hidden="true" />
                <h3 className="text-base font-semibold mb-2">{funds[idx]?.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{funds[idx]?.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ENCERRAMENTO */}
        <section className="text-center">
          <p className="text-gray-400 mt-2 max-w-xl mx-auto text-base leading-relaxed">
            {t('closing.phrase')}
          </p>
        </section>

        <footer className="w-full mt-16 py-6 text-center text-sm text-gray-500">
          {new Date().getFullYear()} © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
        </footer>
      </div>
    </main>
  )
}
