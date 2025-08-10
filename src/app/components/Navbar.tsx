'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import translator from '@/lib/Translator';
import PresalePanel from './presalepanel';

const languages = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' }
];

export default function Navbar() {
  const { t, i18n } = useTranslation('navbar');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showPresale, setShowPresale] = useState(false);

  const switchLanguage = (selectedLang: string) => {
    translator.setLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('lang', selectedLang);
    setShowLangMenu(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem('lang');

    if (!stored) {
      const browserLang = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : '';
      const matched = languages.find(l => browserLang.startsWith(l.code));
      const defaultLang = matched?.code || 'en';
      switchLanguage(defaultLang);
    } else {
      i18n.changeLanguage(stored);
    }
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="w-full bg-black border-b border-gray-800 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
            <img
              src="/moonrise-logo.png"
              alt="MoonRise Logo"
              width={32}
              height={32}
            />
            <span className="text-white font-bold text-lg tracking-wide">{t('brand')}</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-white">
            <Link href="/">{t('menu.home')}</Link>
            <Link href="/moonchain">{t('menu.moonchain')}</Link>
            <Link href="/appmoonrise">{t('menu.products')}</Link>
            <Link href="/about">{t('menu.about')}</Link>
            <Link href="/contact">{t('menu.contact')}</Link>
            <a
              href="https://t.me/moonriseofficialcommunity"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-black px-3 py-1 rounded"
            >
              {t('buttons.community')}
            </a>
            <button
              onClick={() => setShowPresale(true)}
              className="bg-yellow-500 text-black px-3 py-1 rounded"
            >
              {t('buttons.presale')}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 rounded"
                aria-label="Mudar idioma"
              >
                <FaGlobe className="text-white" />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border rounded-md shadow-lg text-sm max-h-96 overflow-y-auto z-50">
                  {languages.map(({ code, label, flag }) => (
                    <button
                      key={code}
                      onClick={() => switchLanguage(code)}
                      className="block w-full px-4 py-2 text-white text-left hover:bg-zinc-800"
                    >
                      {flag} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="text-white md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 text-white text-sm px-4">
            <Link href="/" onClick={closeMenu}>{t('menu.home')}</Link>
            <Link href="/moonchain" onClick={closeMenu}>{t('menu.moonchain')}</Link>
            <Link href="/appmoonrise" onClick={closeMenu}>{t('menu.products')}</Link>
            <Link href="/about" onClick={closeMenu}>{t('menu.about')}</Link>
            <Link href="/contact" onClick={closeMenu}>{t('menu.contact')}</Link>
            <a
              href="https://t.me/moonriseofficialcommunity"
              onClick={closeMenu}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-black px-3 py-1 rounded text-center"
            >
              {t('buttons.community')}
            </a>
            <button
              onClick={() => { setShowPresale(true); closeMenu(); }}
              className="bg-yellow-500 text-black px-3 py-1 rounded text-center"
            >
              {t('buttons.presale')}
            </button>
            <div className="mt-2 max-h-96 overflow-y-auto space-y-2">
              {languages.map(({ code, label, flag }) => (
                <button
                  key={code}
                  onClick={() => switchLanguage(code)}
                  className="flex items-center gap-2 border border-white px-3 py-2 rounded text-white w-full"
                >
                  <span>{flag}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* MODAL DE PRÉ-VENDA */}
      {showPresale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 px-4">
          <PresalePanel />
          <button
            onClick={() => setShowPresale(false)}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded"
            aria-label="Fechar painel de pré-venda"
          >
            {t('closeButton')}
          </button>
        </div>
      )}
    </>
  );
}
