'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import PresalePanel from '../components/presalepanel';

export default function MoonChainPage() {
  const { t } = useTranslation('moonchain');
  const [showPresale, setShowPresale] = useState(false); // MESMA LÓGICA DA /presales

  const highlights = t('highlights', { returnObjects: true }) as {
    performance: { title: string; list: string[] };
    integration: { title: string; list: string[] };
  };

  const table = t('table', { returnObjects: true }) as {
    title: string;
    headers: string[];
    rows: string[][];
  };

  const quote = t('quote', { returnObjects: true }) as {
    text: string;
    description: string;
  };

  return (
    <>
      <section className="w-full bg-black text-white min-h-screen px-6 py-24">
        <div className="max-w-6xl mx-auto space-y-24">

          {/* HERO */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-yellow-400 bg-clip-text text-transparent">
                {t('title')}
              </h1>
              <p className="text-lg text-gray-300 max-w-xl">{t('subtitle')}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  onClick={() => setShowPresale(true)} // ABRE O PAINEL
                  variant="outline"
                  className="text-purple-400 border-purple-400 hover:bg-purple-900/20"
                >
                  {t('button_presale')} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <img
                src="/moonchain-phone.png"
                alt="Mock-up do aplicativo MoonChain em um smartphone"
                width={350}
                height={700}
                className="w-[280px] md:w-[350px] h-auto object-contain"
              />
            </div>
          </div>

          {/* DESTAQUES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {['performance', 'integration'].map((key) => (
              <div key={key} className="border border-gray-700 p-6 rounded-2xl bg-neutral-900">
                <h2 className="text-2xl font-semibold mb-2">{highlights[key as 'performance' | 'integration'].title}</h2>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  {highlights[key as 'performance' | 'integration'].list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* TABELA COMPARATIVA */}
          <div>
            <h2 className="text-2xl font-bold mb-6">{table.title}</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase text-gray-400 border-b border-gray-700">
                  <tr>
                    {table.headers.map((head, idx) => (
                      <th key={idx} className="px-4 py-2">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {table.rows.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((col, colIdx) => (
                        <td key={colIdx} className="px-4 py-3">{col}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CITAÇÃO */}
          <div className="bg-gradient-to-r from-yellow-500 to-purple-600 p-1 rounded-xl">
            <div className="bg-black p-6 rounded-xl">
              <p className="text-xl font-semibold mb-2">{quote.text}</p>
              <p className="text-gray-400">{quote.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL DE PRÉ-VENDA */}
      {showPresale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 px-4">
          <PresalePanel />
        <button
  onClick={() => setShowPresale(false)}
  className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded"
>
  {t('closeButton')}
</button>

        </div>
      )}
    </>
  );
}
