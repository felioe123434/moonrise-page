// SPDX-License-Identifier: MIT
'use client';

import { useTranslation } from 'react-i18next';
import { FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

import LegalDisclaimer from '../components/LegalDisclaimer';
import WhitepaperModal from '../components/WhitepaperModal';

const wallets = [
  { key: 'liquidez',        address: '0xA16A619d1C993F05F30383D136cD109b13da4F4B' },
  { key: 'desenvolvimento', address: '0x9fE8a7ccC46121e4D198CdB8285E79CbA63cDE0F' },
  { key: 'marketing',       address: '0x1a2Cc9BDE01Ed6A1272BAb47CDc1550DCa87aAB7' },
  { key: 'ecossistema',     address: '0x31338F1a8Df71E0f486a39357C0FbCd35B912d91' },
  { key: 'reserva',         address: '0x32EDA1bcc430dA56d911dF8881A7aD19a2b55E33' },
  { key: 'fundador',        address: '0x4bD50fa38B5239a4D7Dcf5181D62C2ee20eEa153' }
];

const formatAddress = (addr: string) => addr.slice(0, 6) + '...' + addr.slice(-4);

export default function Transparency() {
  const { t } = useTranslation('transparencia');

  const dna = t('dna', { returnObjects: true }) as string[];
  const proof = t('proof', { returnObjects: true }) as string[];
  const docs = t('docs', { returnObjects: true }) as { token: string; token_url: string; termo: string };
  const badges = t('protection.badges', { returnObjects: true }) as string[];
  const canItems = t('governance.can.items', { returnObjects: true }) as string[];
  const cannotItems = t('governance.cannot.items', { returnObjects: true }) as string[];

  // Novas chaves
  const liquidityItems = t('liquidity.items', { returnObjects: true }) as string[];

  return (
    <main className="bg-black text-white py-16 px-4">
      {/* Título / Intro */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-purple-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
        >
          {t('title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-300"
        >
          {t('intro')}
        </motion.p>
      </section>

      {/* DNA de Transparência */}
      <section className="max-w-3xl mx-auto mt-24 grid gap-4 md:grid-cols-2">
        {Array.isArray(dna) &&
          dna.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gradient-to-br from-[#1e1b4b] to-[#111827] p-5 rounded-xl shadow-lg text-sm text-gray-200"
            >
              {item}
            </motion.div>
          ))}
      </section>

      {/* Provas auditáveis */}
      <section className="max-w-3xl mx-auto mt-20 text-center">
      <motion.h2
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="text-3xl font-bold text-purple-300 mb-4"
>
  {t('proof_title')}
</motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base text-gray-400"
        >
          {t('proof_intro')}
        </motion.p>
        <div className="mt-10 grid gap-4">
          {Array.isArray(proof) &&
            proof.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gradient-to-br from-[#1e1b4b] to-[#111827] p-5 rounded-xl text-sm text-gray-200"
              >
                {item}
              </motion.div>
            ))}
        </div>
      </section>

      {/* Governança temporária e transparente */}
      <section className="max-w-3xl mx-auto mt-20 space-y-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-purple-300"
        >
          {t('governance.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base text-gray-400"
        >
          {t('governance.intro')}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1f1b2e] p-6 rounded-lg border border-green-600"
          >
            <h4 className="text-lg font-bold text-green-400 mb-2">{t('governance.can.title')}</h4>
            <ul className="list-disc ml-4 space-y-2 text-sm text-gray-300">
              {Array.isArray(canItems) && canItems.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1f1b2e] p-6 rounded-lg border border-red-600"
          >
            <h4 className="text-lg font-bold text-red-400 mb-2">{t('governance.cannot.title')}</h4>
            <ul className="list-disc ml-4 space-y-2 text-sm text-gray-300">
              {Array.isArray(cannotItems) && cannotItems.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Operação e Soberania (SUBSTITUI MoonChain) */}
      <section className="max-w-3xl mx-auto mt-20 text-center space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-purple-300"
        >
          {t('ops.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base text-gray-400"
        >
          {t('ops.body')}
        </motion.p>
      </section>

      {/* Política de Liquidez & Defesa de Mercado */}
      <section className="max-w-4xl mx-auto mt-12 text-left">
        <h3 className="text-2xl font-semibold mb-3">{t('liquidity.title')}</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {Array.isArray(liquidityItems) && liquidityItems.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </section>

      {/* Economia interna / badges de proteção */}
      <section className="max-w-4xl mx-auto mt-20 text-center space-y-10">
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base text-gray-300"
        >
          {t('protection.summary')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1f1b2e] p-6 rounded-lg border border-purple-600"
        >
          <h4 className="text-xl font-semibold text-purple-300 mb-2">
            {t('protection.internalEconomyTitle')}
          </h4>
          <p className="text-sm text-gray-300">{t('protection.internalEconomy')}</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {Array.isArray(badges) &&
            badges.map((label, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <FaLock className="mx-auto text-purple-400 text-3xl mb-2" />
                <span className="text-sm text-gray-300">{label}</span>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Calendário de Liberação */}
      <section className="max-w-4xl mx-auto mt-20 text-center space-y-10">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-purple-300"
        >
          {t('release_schedule.title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
          {[
            {
              name: t('wallets.liquidez'),
              data: [
                { date: '01/12/2025', amount: '500M MNR' },
                { date: '01/03/2026', amount: '500M MNR' },
                { date: '01/06/2026', amount: '1B MNR' },
                { date: '01/09/2026', amount: '1B MNR' }
              ]
            },
            {
              name: t('wallets.marketing'),
              data: [
                { date: '01/01/2026', amount: '125M MNR' },
                { date: '01/02/2026', amount: '125M MNR' },
                { date: '01/03/2026', amount: '125M MNR' },
                { date: '01/04/2026', amount: '125M MNR' },
                { date: '01/05/2026', amount: '125M MNR' },
                { date: '01/06/2026', amount: '125M MNR' }
              ]
            },
            {
              name: t('wallets.desenvolvimento'),
              data: [
                { date: '01/01/2026', amount: '100M MNR' },
                { date: '01/02/2026', amount: '100M MNR' },
                { date: '01/03/2026', amount: '100M MNR' },
                { date: '01/04/2026', amount: '100M MNR' },
                { date: '01/05/2026', amount: '100M MNR' }
              ]
            },
            {
              name: t('wallets.reserva'),
              data: [
                { date: '01/03/2027', amount: '199.75M MNR' },
                { date: '01/09/2027', amount: '199.75M MNR' }
              ]
            }
          ].map((vault, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#1e1b4b] p-5 rounded-xl border border-purple-800 shadow"
            >
              <h3 className="text-purple-300 font-bold text-lg mb-3">{vault.name}</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                {vault.data.map((release, i) => (
                  <li key={i} className="flex justify-between border-b border-purple-700 pb-1">
                    <span>{release.date}</span>
                    <span>{release.amount}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Por que os tokens estão travados */}
      <section className="max-w-4xl mx-auto mt-28 text-center space-y-6 text-sm text-gray-300">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-purple-300"
        >
          {t('lock_reason.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base text-gray-400 max-w-2xl mx-auto"
        >
          {t('lock_reason.paragraph_1')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base text-gray-400 max-w-2xl mx-auto"
        >
          {t('lock_reason.paragraph_2')}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          href="https://bscscan.com/address/0x4d3abE175ba575D2Ec967Ec19e8224f32EfB1467"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-700 hover:bg-purple-800 transition px-6 py-2 rounded-lg text-white font-semibold shadow mt-4"
        >
          {t('lock_reason.button')}
        </motion.a>
      </section>

      {/* Carteiras oficiais */}
      <section className="max-w-5xl mx-auto mt-20 space-y-8">
        <h2 className="text-3xl font-bold text-purple-300 text-center">{t('wallets_title')}</h2>
        <p className="text-center text-base text-gray-400">{t('wallets_desc')}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wallets.map((item, idx) => {
            const isLast = idx === wallets.length - 1;
            const shouldSpan = wallets.length % 3 === 1 && isLast;
            return (
              <li
                key={idx}
                className={`bg-[#1e1b4b] p-6 rounded-xl border border-purple-700 shadow-md text-sm text-center flex flex-col items-center justify-center ${shouldSpan ? 'md:col-span-3' : ''}`}
              >
                <h3 className="text-white font-semibold mb-1">{t(`wallets.${item.key}`)}</h3>
                <div className="text-xs text-purple-300 break-words">{formatAddress(item.address)}</div>
                <a
                  href={`https://bscscan.com/address/${item.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline text-xs mt-2 inline-block"
                >
                  {t('docs_links.wallet_button')}
                </a>
                {item.key === 'fundador' && (
                  <p className="text-red-400 text-xs mt-2 flex items-center justify-center gap-1">
                    <FaLock className="inline-block text-red-500" /> {t('wallets_locked_note')}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>

            {/* Documentos oficiais */}
      <section className="max-w-3xl mx-auto mt-20 bg-[#111827] p-6 rounded-xl border border-purple-800 text-sm text-gray-300 text-center space-y-4">
        <h2 className="text-xl font-bold text-purple-200 mb-2">{t('docs_title')}</h2>

        <p>
          {docs.token}{' '}
          <a href={docs.token_url} className="underline text-blue-400" target="_blank" rel="noopener noreferrer">
            {t('docs_links.token_explorer')}
          </a>
        </p>

        <p className="text-xs">
         
          {/* ⬇️ Abre a telinha no idioma atual */}
          <LegalDisclaimer triggerKey="disclaimer.trigger" dot />
        </p>

        <p className="text-[12px] flex items-center justify-center gap-2">
        <WhitepaperModal label="Ler o Whitepaper"
         className="text-[12px] text-purple-300 underline underline-offset-4 hover:text-purple-100" />
        </p>
      </section>


      <footer className="w-full mt-20 py-6 text-center text-sm text-gray-500">
        {new Date().getFullYear()} © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
      </footer>
    </main>
  );
}
