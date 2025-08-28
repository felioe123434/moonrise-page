'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Activity,
  Network,
  DollarSign,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Building2
} from 'lucide-react';

type Card = { t: string; d: string };
type Step = { t: string; d: string };
type Road = { t: string; d: string };

const featureIcons = [ShieldCheck, Activity, Network, DollarSign, Smartphone, CheckCircle2];

const fadeUp = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: 0.08 * i, ease: 'easeOut' }
});

function arr<T = any>(v: unknown, fallback: T[] = []): T[] {
  return Array.isArray(v) ? (v as T[]) : fallback;
}

export default function MoonPlusPage() {
  const { t } = useTranslation('moonplus');

  const valueCards = arr<Card>(t('value.cards', { returnObjects: true }));
  const steps = arr<Step>(t('how.steps', { returnObjects: true }));
  const roadmap = arr<Road>(t('roadmap.items', { returnObjects: true }));

  return (
    <main className="relative bg-black text-white overflow-hidden">
      {/* BACKDROP premium (igual MoonWallet) */}
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

      {/* RIBBON */}
      <div className="bg-purple-500/10 border-b border-purple-500/20">
        <div className="max-w-[1300px] mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-yellow-400 text-black">
            {t('notice.preop')}
          </span>
          <span className="text-sm text-gray-200">{t('start.target')}</span>
        </div>
      </div>

      <section className="max-w-[1300px] mx-auto px-6 py-16 md:py-24 space-y-16">
        {/* HERO */}
        <div className="flex justify-center">
          <motion.header {...fadeUp(0)} className="w-full max-w-4xl space-y-6">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-purple-300/80">
              {t('hero.kicker')}
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">
              {t('hero.title.l1')}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-amber-300">
                {t('hero.title.l2')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200">{t('hero.subtitle')}</p>

            {/* “pills” como no MoonWallet (sem card) */}
            <div className="flex flex-wrap gap-3">
              {[t('hero.badges.broker'), t('hero.badges.auditable'), t('hero.badges.execution')].map(
                (p, i) => (
                  <span
                    key={i}
                    className="text-xs md:text-sm rounded-full px-3 py-2 text-gray-100 bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-[1px]"
                  >
                    {p}
                  </span>
                )
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="https://t.me/moonriseofficialcommunity"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition shadow-[0_10px_30px_rgba(245,158,11,0.25)]"
              >
                Comunidade Oficial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://t.me/moonrisesupport"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white/5 text-white border border-white/10 hover:bg-white/10 transition"
              >
                Canal de Suporte
              </Link>
            </div>
          </motion.header>
        </div>

        {/* DIVISOR */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* O QUE ENTREGAMOS (lista com linha inferior — sem quadradões) */}
        <motion.section {...fadeUp(1)}>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Building2 className="h-7 w-7 text-purple-300" /> {t('value.title')}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueCards.map((c, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <li key={i} className="group relative rounded-xl p-4 bg-white/3 border border-white/10">
                  <span className="pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-xl" />
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg p-2 bg-white/5 border border-white/10 group-hover:bg-white/10 transition">
                      <Icon className="w-5 h-5 text-purple-200" />
                    </div>
                    <div>
                      <div className="font-semibold">{c.t}</div>
                      <div className="text-gray-300 text-sm mt-1">{c.d}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.section>

        {/* COMO FUNCIONA (mesmo “card leve” com linha inferior) */}
        <motion.section {...fadeUp(2)}>
          <h2 className="text-3xl font-bold mb-6">{t('how.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="relative bg-white/3 border border-white/10 rounded-xl p-4">
                <span className="pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-xl" />
                <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center">
                  <span className="text-sm text-gray-100">{i + 1}</span>
                </div>
                <div className="font-semibold mt-3">{s.t}</div>
                <p className="text-sm text-gray-300 mt-1">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-4">{t('how.note')}</p>
        </motion.section>

        {/* FLUXO DE VALOR (chips, sem caixas) */}
        <motion.section {...fadeUp(3)}>
          <h2 className="text-2xl font-bold mb-2">{t('flow.title')}</h2>
          <p className="text-gray-300 mb-5 max-w-4xl">{t('flow.desc')}</p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 text-sm text-gray-200">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              Pré-venda MNR → Capital
            </span>
            <span className="hidden md:inline text-gray-400">➜</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              Operações Moon+ → Receita
            </span>
            <span className="hidden md:inline text-gray-400">➜</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              Reinvestimento → Liquidez & Expansão
            </span>
          </div>
        </motion.section>

        {/* ROADMAP (painel único estilo “diferenciais”) */}
        <motion.section {...fadeUp(4)}>
          <h2 className="text-2xl font-bold mb-6">{t('roadmap.title')}</h2>
          <div className="relative border border-white/12 rounded-2xl p-8 md:p-10 bg-white/3 backdrop-blur-[1px]">
            <span className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-2xl" />
            <ul className="grid md:grid-cols-3 gap-5">
              {roadmap.map((r, i) => (
                <li key={i} className="rounded-lg border border-white/10 bg-white/4 p-4">
                  <div className="text-sm text-gray-400">{r.t}</div>
                  <div className="text-sm text-gray-300 mt-1">{r.d}</div>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* DISCLAIMER / FOOTER */}
        <motion.section {...fadeUp(5)} className="text-center">
          <p className="text-gray-400 mt-2 max-w-xl mx-auto text-base leading-relaxed">
            {t('disclaimer')}
          </p>
        </motion.section>

        <footer className="w-full mt-20 py-6 text-center text-sm text-gray-500">
          {new Date().getFullYear()} © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
        </footer>
      </section>
    </main>
  );
}
