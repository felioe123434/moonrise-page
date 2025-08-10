'use client';

import {
  FaTelegramPlane,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaFileAlt,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation('contact');

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 flex items-center justify-center">
      <div className="max-w-3xl w-full text-center space-y-12">
        {/* Título */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400">
            {t('title')}
          </h1>
          <p className="text-gray-300 text-lg mt-4">{t('subtitle')}</p>
        </div>

        {/* Redes Sociais */}
        <div>
          <p className="text-sm text-gray-400 mb-3">{t('socialTitle')}</p>
          <div className="flex justify-center gap-6 text-xl">
            <a href="https://t.me/moonrisecomunidadeoficial" target="_blank" title="Telegram">
              <FaTelegramPlane className="hover:text-purple-300 transition" />
            </a>

            {/* Instagram multilíngue */}
            <div className="relative group">
              <FaInstagram className="hover:text-purple-300 transition cursor-pointer" title="Instagram" />
              <div className="absolute hidden group-hover:block top-6 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white shadow-md py-2 px-3 z-10">
                <div className="whitespace-nowrap">
                  <a href="https://www.instagram.com/moonriseoficial" target="_blank" className="block hover:text-purple-300">
                    🇧🇷 @moonriseoficial
                  </a>
                  <a href="https://www.instagram.com/moonrise.global" target="_blank" className="block hover:text-purple-300">
                    🇺🇸 @moonrise.global
                  </a>
                </div>
              </div>
            </div>

            <a href="https://www.tiktok.com/@moonriseoficial" target="_blank" title="TikTok">
              <FaTiktok className="hover:text-purple-300 transition" />
            </a>
            <a href="https://twitter.com/moonriseoficial" target="_blank" title="Twitter">
              <FaTwitter className="hover:text-purple-300 transition" />
            </a>
          </div>
        </div>

        {/* Documentos (com dropdown por idioma) */}
        <div className="text-sm text-gray-300 pt-4">
          <p className="text-white font-medium mb-2">{t('documentsTitle')}</p>
          <details className="bg-zinc-900 rounded-lg border border-zinc-700 p-4">
            <summary className="cursor-pointer text-purple-300 hover:text-purple-200 font-semibold">
              {t('documentsDropdown')}
            </summary>

            <div className="mt-4 space-y-3">
              {/* Whitepaper */}
              <div>
                <p className="text-white font-semibold mb-1">{t('whitepaperLabel')}</p>
                <ul className="space-y-1 pl-4">
                  <li><a href="/whitepaper_PT.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.pt')}</a></li>
                  <li><a href="/whitepaper_EN.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.en')}</a></li>
                  <li><a href="/whitepaper_ES.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.es')}</a></li>
                  <li><a href="/whitepaper_FR.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.fr')}</a></li>
                  <li><a href="/whitepaper_DE.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.de')}</a></li>
                  <li><a href="/whitepaper_ZH.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.zh')}</a></li>
                  <li><a href="/whitepaper_RU.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.ru')}</a></li>
                  <li><a href="/whitepaper_HI.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.hi')}</a></li>
                </ul>
              </div>

              {/* Termo de Responsabilidade */}
              <div className="pt-4">
                <p className="text-white font-semibold mb-1">{t('responsibilityLabel')}</p>
                <ul className="space-y-1 pl-4">
                  <li><a href="/Termo_PT.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.pt')}</a></li>
                  <li><a href="/Termo_EN.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.en')}</a></li>
                  <li><a href="/Termo_ES.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.es')}</a></li>
                  <li><a href="/Termo_FR.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.fr')}</a></li>
                  <li><a href="/Termo_DE.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.de')}</a></li>
                  <li><a href="/Termo_ZH.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.zh')}</a></li>
                  <li><a href="/Termo_RU.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.ru')}</a></li>
                  <li><a href="/Termo_HI.pdf" target="_blank" className="hover:underline text-purple-400">{t('lang.hi')}</a></li>
                </ul>
              </div>
            </div>
          </details>
        </div>

        {/* Compromissos */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6 space-y-4 text-left text-sm text-gray-300">
          <h3 className="text-purple-200 font-bold text-lg">{t('commitmentTitle')}</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>{t('commitment1')}</li>
            <li>{t('commitment2')}</li>
            <li>{t('commitment3')}</li>
          </ul>
        </div>

        {/* Botão Comunidade */}
        <div className="pt-4">
          <a
            href="https://t.me/moonriseofficialcommunity"
            target="_blank"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full transition"
          >
            {t('joinCommunity')}
          </a>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 pt-6 italic">{t('footer')}</p>
      </div>
    </main>
  );
}
