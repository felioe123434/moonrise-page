// SPDX-License-Identifier: MIT
'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaLock, FaRegCopy, FaCheck } from 'react-icons/fa';

import LegalDisclaimer from '../components/LegalDisclaimer';
import WhitepaperModal from '../components/WhitepaperModal';

/* ----------------------------- Tipos & Utils ----------------------------- */
type Wallet = {
  key: string;
  address: string;
  founder?: boolean;
  warnKey?: string; // ex: wallets_notes.admin
};

const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: 0.08 * i, ease: 'easeOut' },
});

/* ------------------------------- Carteiras ------------------------------- */
/** Ordem 3 · 3 · 2 (última linha: Admin e Fundador mais largos) */
const wallets: Wallet[] = [
  { key: 'liquidez',        address: '0xA16A619d1C993F05F30383D136cD109b13da4F4B' },
  { key: 'desenvolvimento', address: '0x9fE8a7ccC46121e4D198CdB8285E79CbA63cDE0F' },
  { key: 'marketing',       address: '0x1a2Cc9BDE01Ed6A1272BAb47CDc1550DCa87aAB7' },

  { key: 'ecossistema',     address: '0x31338F1a8Df71E0f486a39357C0FbCd35B912d91' },
  { key: 'reserva',         address: '0x32EDA1bcc430dA56d911dF8881A7aD19a2b55E33' },
  { key: 'presale',         address: '0x4Fbc807E6684A0F5F1958D2218044EDb3D59ce9d' },

  { key: 'admin',           address: '0x318A2E00739edBAd92a905355366442ba05f3751', warnKey: 'wallets_notes.admin' },
  { key: 'fundador',        address: '0x4bD50fa38B5239a4D7Dcf5181D62C2ee20eEa153', founder: true },
];

/* --------------------------------- Página -------------------------------- */
export default function Transparency() {
  const { t } = useTranslation('transparencia');

  const dna         = t('dna', { returnObjects: true }) as string[];
  const proof       = t('proof', { returnObjects: true }) as string[];
  const docs        = t('docs', { returnObjects: true }) as { token: string; token_url: string; termo: string };
  const badges      = t('protection.badges', { returnObjects: true }) as string[];
  const canItems    = t('governance.can.items', { returnObjects: true }) as string[];
  const cannotItems = t('governance.cannot.items', { returnObjects: true }) as string[];
  const liquidity   = t('liquidity.items', { returnObjects: true }) as string[];

  const lockUrl     = t('lock_reason.url') as string;

  const cardBase = 'relative rounded-xl bg-white/3 border border-white/10 backdrop-blur-[1px]';

  return (
    <main className="relative bg-black text-white overflow-hidden">
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

      {/* HERO */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-8 text-center">
        <motion.h1 {...fade(0)} className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]">
          {t('title')}
        </motion.h1>
        <motion.p {...fade(1)} className="mt-4 text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
          {t('intro')}
        </motion.p>
      </header>

      {/* DNA (lista com divisores — sem “caixões”) */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {(dna || []).map((item, i) => (
            <motion.div key={i} {...fade(i)} className="text-sm text-gray-200">
              <p>{item}</p>
              <div className="mt-6 h-px bg-gradient-to-r from-white/12 to-transparent" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Provas auditáveis (cards leves com linha superior) */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <motion.h2 {...fade(0)} className="text-3xl font-bold text-purple-300 mb-2">
          {t('proof_title')}
        </motion.h2>
        <motion.p {...fade(1)} className="text-gray-400 max-w-3xl mx-auto">
          {t('proof_intro')}
        </motion.p>

        <div className="mt-8 grid md:grid-cols-2 gap-4 text-left">
          {(proof || []).map((item, i) => (
            <motion.div key={i} {...fade(i)} className={`${cardBase} p-5 text-sm text-gray-200`}>
              <span className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-xl" />
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Governança temporária (painéis com borda sutil) */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.h2 {...fade(0)} className="text-3xl font-bold text-purple-300 text-center">
          {t('governance.title')}
        </motion.h2>
        <motion.p {...fade(1)} className="text-gray-400 text-center max-w-3xl mx-auto mt-2">
          {t('governance.intro')}
        </motion.p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <motion.div {...fade(2)} className={`${cardBase} p-6 ring-1 ring-emerald-500/30`}>
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">{t('governance.can.title')}</h4>
            <ul className="list-disc ml-5 space-y-2 text-sm text-gray-300">
              {(canItems || []).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </motion.div>

          <motion.div {...fade(3)} className={`${cardBase} p-6 ring-1 ring-red-500/30`}>
            <h4 className="text-lg font-semibold text-red-300 mb-2">{t('governance.cannot.title')}</h4>
            <ul className="list-disc ml-5 space-y-2 text-sm text-gray-300">
              {(cannotItems || []).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Operação / Soberania */}
      <section className="max-w-6xl mx-auto px-6 py-10 text-center">
        <motion.h2 {...fade(0)} className="text-3xl font-bold text-purple-300">
          {t('ops.title')}
        </motion.h2>
        <motion.p {...fade(1)} className="text-gray-300 max-w-4xl mx-auto mt-3">
          {t('ops.body')}
        </motion.p>
      </section>

      {/* Liquidez & Defesa de Mercado (painel âmbar leve) */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-2xl font-semibold mb-4">{t('liquidity.title')}</h3>
        <div className={`${cardBase} p-6 ring-1 ring-amber-400/30`}>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
            {(liquidity || []).map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>
      </section>

      {/* Economia interna + Badges */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <motion.p {...fade(0)} className="text-gray-300 max-w-4xl mx-auto">
          {t('protection.summary')}
        </motion.p>

        <motion.div {...fade(1)} className={`${cardBase} mt-6 p-6`}>
          <h4 className="text-xl font-semibold text-purple-300 mb-2">{t('protection.internalEconomyTitle')}</h4>
          <p className="text-sm text-gray-300">{t('protection.internalEconomy')}</p>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {(badges || []).map((label, i) => (
            <motion.div key={i} {...fade(i)} className="text-center">
              <FaLock className="mx-auto text-purple-300 text-3xl mb-2" />
              <span className="text-sm text-gray-300">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Calendário de Liberação */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <motion.h2 {...fade(0)} className="text-3xl font-bold text-purple-300">
          {t('release_schedule.title')}
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {[
            { name: t('wallets.liquidez'),        data: t('release_schedule.liquidez',        { returnObjects: true }) as { date: string; amount: string }[] },
            { name: t('wallets.marketing'),       data: t('release_schedule.marketing',       { returnObjects: true }) as { date: string; amount: string }[] },
            { name: t('wallets.desenvolvimento'), data: t('release_schedule.desenvolvimento', { returnObjects: true }) as { date: string; amount: string }[] },
            { name: t('wallets.reserva'),         data: t('release_schedule.reserva',         { returnObjects: true }) as { date: string; amount: string }[] },
          ].map((vault, idx) => (
            <motion.div key={idx} {...fade(idx)} className={`${cardBase} p-5`}>
              <span className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-xl" />
              <h3 className="text-purple-300 font-semibold text-lg mb-3">{vault.name}</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                {(vault.data || []).map((row, i) => (
                  <li key={i} className="flex justify-between border-b border-white/10 pb-1">
                    <span>{row.date}</span>
                    <span className="font-medium">{row.amount}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Por que os tokens estão travados */}
      <section className="max-w-6xl mx-auto px-6 py-14 text-center">
        <motion.h2 {...fade(0)} className="text-3xl font-bold text-purple-300">
          {t('lock_reason.title')}
        </motion.h2>
        <motion.p {...fade(1)} className="text-base text-gray-400 max-w-3xl mx-auto mt-3">
          {t('lock_reason.paragraph_1')}
        </motion.p>
        <motion.p {...fade(2)} className="text-base text-gray-400 max-w-3xl mx-auto mt-2">
          {t('lock_reason.paragraph_2')}
        </motion.p>

        <motion.a
          {...fade(3)}
          href={lockUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-600 hover:bg-purple-700 transition px-6 py-2 rounded-full text-white font-semibold shadow mt-5 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {t('lock_reason.button')}
        </motion.a>
      </section>

      {/* Carteiras oficiais — grade 3·3·2 (Admin/Fundador mais largos) */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-purple-300 text-center">{t('wallets_title')}</h2>
        <p className="text-center text-base text-gray-400 mt-2">{t('wallets_lead')}</p>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {wallets.map((w, idx) => {
            const spanClass = (w.key === 'admin' || w.key === 'fundador') ? 'lg:col-span-3' : 'lg:col-span-2';
            return (
              <WalletCard
                key={w.key}
                idx={idx}
                spanClass={spanClass}
                label={t(`wallets.${w.key}`)}
                desc={t(`wallets_desc.${w.key}`) as string}
                address={w.address}
                founder={w.founder}
                badgeKey={`wallets_badges.${w.key}`}
                warnKey={w.warnKey}
              />
            );
          })}
        </ul>
      </section>

      {/* Documentos oficiais */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className={`${cardBase} mx-auto max-w-3xl p-6 text-sm text-gray-300 text-center space-y-4`}>
          <span className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-xl" />
          <h2 className="text-xl font-bold text-purple-200">{t('docs_title')}</h2>

          <p>
            {t('docs.token')}{' '}
            <a href={docs.token_url} className="underline text-blue-400" target="_blank" rel="noopener noreferrer">
              {t('docs_links.token_explorer')}
            </a>
          </p>

          <p className="text-xs">
            <LegalDisclaimer triggerKey="disclaimer.trigger" dot />
          </p>

          <p className="text-[12px]">
            <WhitepaperModal
              label={t('whitepaper.label')}
              className="text-[12px] text-purple-300 underline underline-offset-4 hover:text-purple-100"
            />
          </p>
        </div>
      </section>

      <footer className="w-full py-6 text-center text-sm text-gray-500">
        © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
      </footer>
    </main>
  );
}

/* ------------------------------ Subcomponente ---------------------------- */
function WalletCard({
  idx,
  spanClass,
  label,
  desc,
  address,
  founder,
  badgeKey,
  warnKey,
}: {
  idx: number;
  spanClass: string;
  label: string;
  desc: string;
  address: string;
  founder?: boolean;
  badgeKey?: string;
  warnKey?: string;
}) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation('transparencia');

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch { /* noop */ }
  };

  const badge = badgeKey ? (t(badgeKey) as string) : '';

  return (
    <motion.li {...fade(idx)} className={`${spanClass} relative ${'rounded-xl bg-white/3 border border-white/10 backdrop-blur-[1px]'} p-6 shadow-sm flex flex-col`}>
      <span className="pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-xl" />

      {/* Badge (se existir no JSON) */}
      {!!badge && (
        <span className="mb-2 self-start inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-purple-200">
          {badge}
        </span>
      )}

      <h3 className="text-white font-semibold">{label}</h3>
      <p className="mt-1 text-xs text-gray-400 min-h-[36px]">{desc || ''}</p>

      <div className="mt-3 flex items-center gap-2 text-xs text-purple-300">
        <span className="font-mono">{formatAddress(address)}</span>
        <button
          onClick={onCopy}
          className="p-1 rounded-md border border-white/10 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label={t('aria.copy_address')}
          title={t('aria.copy_address')}
        >
          {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy />}
        </button>
      </div>

      <a
        href={`https://bscscan.com/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline text-xs mt-2"
      >
        {t('wallets.view_on_explorer')}
      </a>

      {founder && (
        <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
          <FaLock className="text-red-500" /> {t('wallets_locked_note')}
        </p>
      )}

      {warnKey && <p className="text-amber-300/90 text-[11px] mt-2">{t(warnKey)}</p>}
    </motion.li>
  );
}
