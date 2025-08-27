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

  // --- helpers
  const parsePercent = (v: string | number): number => {
    if (typeof v === 'number') return v
    // remove tudo que não for dígito, vírgula, ponto, sinal; trata milhar/decimal PT e EN
    const clean = v
      .toString()
      .trim()
      .replace(/[^\d.,-]/g, '')
      .replace(/\.(?=\d{3}(?:\D|$))/g, '') // remove pontos de milhar
      .replace(',', '.')
    const n = Number(clean)
    return Number.isFinite(n) ? n : 0
  }

  const formatPercent = (n: number) =>
    `${new Intl.NumberFormat(i18n.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)}%`

  const chartData = useMemo(
    () =>
      (distribution ?? []).map((d) => ({
        name: d.title,
        value: parsePercent(d.label),
      })),
    [distribution]
  )

  const totalPercent = useMemo(
    () => chartData.reduce((acc, i) => acc + (Number(i.value) || 0), 0),
    [chartData]
  )

  return (
    <main className="bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 space-y-20">
        {/* TITULO */}
        <section className="text-center">
          <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-extrabold text-purple-400 mb-5 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] tracking-tight">
            {t('title')}
          </h1>
          <p className="text-gray-300 mx-auto max-w-3xl text-lg leading-relaxed">
            <Trans t={t} i18nKey="intro" components={{ strong: <strong /> }} />
          </p>
        </section>

        {/* SUPPLY */}
        <section className="mx-auto w-full max-w-5xl bg-[#0e162a] p-6 md:p-8 rounded-2xl border border-purple-700/80 shadow-xl text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <p><strong>🧱 {t('supplyLabels.name')}:</strong> {t('supply.name')}</p>
            <p><strong>🪙 {t('supplyLabels.symbol')}:</strong> {t('supply.symbol')}</p>
            <p><strong><FaNetworkWired className="inline mr-2" aria-hidden="true" />{t('supplyLabels.network')}:</strong> {t('supply.network')}</p>
            <p><strong>📦 {t('supplyLabels.total')}:</strong> {t('supply.total')}</p>
            <p><strong>🔥 {t('supplyLabels.burned')}:</strong> {t('supply.burned')}</p>
            <p><strong>🔄 {t('supplyLabels.circulating')}:</strong> {t('supply.circulating')}</p>
          </div>

          {/* CTAs de confiança */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="/transparency" className="inline-flex items-center justify-center rounded-xl border border-purple-500/70 px-4 py-2 text-sm hover:bg-purple-500/10 transition">🔎 {t('buttons.transparency')}</a>
          
            <a href="https://bscscan.com/token/0xF46ca5A735E024B3F0aaBC5dfe242b5cA16B1278" className="inline-flex items-center justify-center rounded-xl border border-purple-500/70 px-4 py-2 text-sm hover:bg-purple-500/10 transition" target="_blank" rel="noreferrer">🧾 {t('buttons.contract')}</a>
          </div>
        </section>

        {/* DISTRIBUIÇÃO */}
        <section className="w-full max-w-7xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-300">{t('distributionTitle')}</h2>

          <div className="mx-auto" style={{ width: '100%', maxWidth: 640, height: 420 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart role="img" aria-label={t('distributionTitle')}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={130}
                  paddingAngle={2}
                  dataKey="value"
                  isAnimationActive
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
                    fontSize: 14,
                  }}
                  labelStyle={{ color: '#a855f7' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#e5e7eb', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Observações/validação */}
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">{t('distributionNote')}</p>
          {Math.abs(totalPercent - 100) > 0.1 && (
            <p className="text-amber-300 text-xs">⚠️ {t('warnings.totalNot100', { total: formatPercent(totalPercent) })}</p>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm font-bold max-w-5xl mx-auto">
            {distribution[0] && (
              <div className="col-span-1 md:col-span-3 bg-[#1a1f3b] px-5 py-6 rounded-xl border border-purple-800 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out">
                <p className="text-purple-300 text-lg">{formatPercent(parsePercent(distribution[0].label))}</p>
                <p className="text-gray-200 mt-1 text-sm">{distribution[0].title}</p>
              </div>
            )}

            {distribution.slice(1).map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1a1f3b] px-5 py-6 rounded-xl border border-purple-800 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <p className="text-purple-300 text-lg">{formatPercent(parsePercent(item.label))}</p>
                <p className="text-gray-200 mt-1 text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* USO DOS FUNDOS */}
        <section className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-purple-400 tracking-tight">{t('fundsTitle')}</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed text-base">{t('fundsText')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[FaHome, FaPiggyBank, FaProjectDiagram, FaChartPie].map((Icon, idx) => (
              <div
                key={idx}
                className="bg-[#111827] p-6 rounded-xl border border-purple-500/70 hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                <Icon className="text-purple-400 text-4xl mb-4 mx-auto" aria-hidden="true" />
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

         <footer className="w-full mt-20 py-6 text-center text-sm text-gray-500">
        {new Date().getFullYear()} © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
      </footer>
      
      </div>
    </main>
  )
}
