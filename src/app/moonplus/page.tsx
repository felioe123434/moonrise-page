'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-2xl border border-purple-500/40 bg-purple-500/10 text-sm">
      {children}
    </span>
  );
}

type Card = { t: string; d: string };
type Step = { t: string; d: string };
type Road = { t: string; d: string };

export default function MoonPlusPage() {
  const { t } = useTranslation('moonplus');

  // Arrays vindos do i18n
  const valueCards = t('value.cards', { returnObjects: true }) as Card[];
  const steps = t('how.steps', { returnObjects: true }) as Step[];
  const roadmap = t('roadmap.items', { returnObjects: true }) as Road[];

  return (
    <main className="bg-black text-white">
      {/* RIBBON */}
      <div className="bg-purple-500/10 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
          <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-yellow-400 text-black">
            {t('notice.preop')}
          </span>
          <span className="text-sm text-gray-200">{t('start.target')}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <p className="uppercase text-xs tracking-[0.2em] text-gray-300">
          {t('hero.kicker')}
        </p>
        <h1 className="text-5xl font-extrabold leading-tight mt-3">
          {t('hero.title.l1')}{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-amber-300">
            {t('hero.title.l2')}
          </span>
        </h1>
        <p className="text-gray-300 text-lg mt-4 max-w-3xl">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Pill>{t('hero.badges.broker')}</Pill>
          <Pill>{t('hero.badges.auditable')}</Pill>
          <Pill>{t('hero.badges.execution')}</Pill>
        </div>

        {/* LINKS FIXOS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Link
            href="https://t.me/moonrisesupport"
            target="_blank"
            className="px-7 py-3 rounded-2xl bg-purple-500/20 border border-purple-400/30 text-white text-center hover:bg-purple-500/30 transition"
          >
            Canal de Suporte
          </Link>
          <Link
            href="https://t.me/moonriseofficialcommunity"
            target="_blank"
            className="px-7 py-3 rounded-2xl bg-purple-500/20 border border-purple-400/30 text-white text-center hover:bg-purple-500/30 transition"
          >
            Comunidade Oficial
          </Link>
        </div>
      </section>

      {/* O QUE ENTREGAMOS */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">{t('value.title')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {valueCards.map((c, i) => (
            <div key={i} className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5">
              <div className="font-semibold mb-1">{c.t}</div>
              <div className="text-gray-300 text-sm">{c.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">{t('how.title')}</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5">
              <div className="text-sm text-gray-400 mb-1">{i + 1}.</div>
              <div className="font-semibold mb-1">{s.t}</div>
              <div className="text-gray-300 text-sm">{s.d}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-xs mt-4">{t('how.note')}</p>
      </section>

      {/* FLUXO DE VALOR */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">{t('flow.title')}</h2>
        <p className="text-gray-300 mb-3 max-w-4xl">{t('flow.desc')}</p>
      </section>

      {/* ROADMAP */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{t('roadmap.title')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {roadmap.map((r, i) => (
            <div key={i} className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5">
              <div className="text-sm text-gray-400 mb-1">{r.t}</div>
              <div className="text-gray-300 text-sm">{r.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <footer className="max-w-6xl mx-auto px-6 pb-12 text-sm text-gray-500">
        {t('disclaimer')}
        <div className="mt-6 text-center">
          {new Date().getFullYear()} © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
        </div>
      </footer>
    </main>
  );
}
