'use client'

import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import {
  FaNetworkWired, FaHome, FaPiggyBank, FaProjectDiagram, FaChartPie
} from 'react-icons/fa'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

export default function TokenomicsPage() {
  const { t } = useTranslation('tokenomics')

  const distribution = t('distribution', { returnObjects: true }) as { label: string; title: string }[]
  const funds = t('funds', { returnObjects: true }) as { title: string; desc: string }[]

  const COLORS = ['#a855f7', '#38bdf8', '#22c55e', '#facc15', '#0ea5e9', '#f97316', '#ef4444', '#6b7280']

  return (
    <main className="bg-black text-white py-20 px-6 space-y-24">
      {/* TÍTULO PRINCIPAL */}
      <section className="text-center max-w-5xl mx-auto">
        <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-bold text-purple-400 mb-6 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] tracking-tight">
          {t('title')}
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          <Trans t={t} i18nKey="intro" components={{ strong: <strong /> }} />
        </p>
      </section>

      {/* SUPPLY */}
      <section className="max-w-4xl mx-auto bg-[#0e162a] p-6 rounded-xl border border-purple-700 shadow-xl text-sm space-y-3">
        <p><strong>🧱 {t('supplyLabels.name')}:</strong> {t('supply.name')}</p>
        <p><strong>🪙 {t('supplyLabels.symbol')}:</strong> {t('supply.symbol')}</p>
        <p><strong><FaNetworkWired className="inline mr-2" />{t('supplyLabels.network')}:</strong> {t('supply.network')}</p>
        <p><strong>📦 {t('supplyLabels.total')}:</strong> {t('supply.total')}</p>
        <p><strong>🔥 {t('supplyLabels.burned')}:</strong> {t('supply.burned')}</p>
        <p><strong>🔄 {t('supplyLabels.circulating')}:</strong> {t('supply.circulating')}</p>
      </section>

      {/* DISTRIBUIÇÃO + GRÁFICO */}
      <section className="w-full max-w-7xl mx-auto text-center space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-300">{t('distributionTitle')}</h2>

        <div className="mx-auto" style={{ width: '100%', maxWidth: 600, height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distribution.map((d, i) => ({ name: d.title, value: parseFloat(d.label) }))}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {distribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderRadius: '8px',
                  border: '1px solid #a855f7',
                  color: '#fff',
                  fontSize: '14px',
                }}
                labelStyle={{ color: '#a855f7' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

       <p className="text-gray-400 text-sm max-w-2xl mx-auto">
  {t('distributionNote')}
</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm font-bold max-w-5xl mx-auto">
          {/* Liquidez em linha inteira */}
          <div className="col-span-1 md:col-span-3 bg-[#1a1f3b] px-5 py-6 rounded-xl border border-purple-800 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out">
            <p className="text-purple-300 text-lg">{distribution[0].label}</p>
            <p className="text-gray-200 mt-1 text-sm">{distribution[0].title}</p>
          </div>

          {/* Próximos 6 cards em 2 linhas de 3 */}
          {distribution.slice(1).map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1a1f3b] px-5 py-6 rounded-xl border border-purple-800 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <p className="text-purple-300 text-lg">{item.label}</p>
              <p className="text-gray-200 mt-1 text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* USO DE FUNDOS */}
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-purple-400 tracking-tight">{t('fundsTitle')}</h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed text-base">{t('fundsText')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[FaHome, FaPiggyBank, FaProjectDiagram, FaChartPie].map((Icon, idx) => (
            <div
              key={idx}
              className="bg-[#111827] p-6 rounded-xl border border-purple-500 hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-in-out"
            >
              <Icon className="text-purple-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">{funds[idx]?.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{funds[idx]?.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ENCERRAMENTO */}
      <section className="text-center mt-24">
        <p className="text-gray-400 mt-4 max-w-xl mx-auto text-base leading-relaxed">
          {t('closing.phrase')}
        </p>
      </section>
    </main>
  )
}
