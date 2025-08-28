import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importações fixas para português e inglês
import navbarPT from '@/locales/pt/navbar.json';
import heroPT from '@/locales/pt/hero.json';
import presalePT from '@/locales/pt/presale.json';
import aboutPT from '@/locales/pt/about.json';
import presalesPT from '@/locales/pt/presales.json';
import moonplusPT from '@/locales/pt/moonplus.json';
import tokenomicsPT from '@/locales/pt/tokenomics.json';
import transparenciaPT from '@/locales/pt/transparencia.json';
import moonwalletPT from '@/locales/pt/moonwallet.json';
import legalPT from '@/locales/pt/legal.json';
import ecosystemPT from '@/locales/pt/ecosystem.json';

import navbarEN from '@/locales/en/navbar.json';
import heroEN from '@/locales/en/hero.json';
import presaleEN from '@/locales/en/presale.json';
import aboutEN from '@/locales/en/about.json';
import presalesEN from '@/locales/en/presales.json';
import moonplusEN from '@/locales/en/moonplus.json';
import tokenomicsEN from '@/locales/en/tokenomics.json';
import transparenciaEN from '@/locales/en/transparencia.json';
import moonwalletEN from '@/locales/en/moonwallet.json';
import legalEN from '@/locales/en/legal.json';
import ecosystemEN from '@/locales/en/ecosystem.json';

// Idiomas adicionais suportados (com require dinâmico)
const extraLangs = ['es', 'fr', 'de', 'zh', 'ru', 'hi'];

const namespaces = [
  'navbar', 'hero', 'presale', 'about', 'presales',
  'moon+', 'tokenomics', 'transparencia', 'moonwallet', 'legal', 'ecosystem' // <- certo
];



// Recursos multilíngues
const resources: any = {
  pt: {
    navbar: navbarPT,
    hero: heroPT,
    presale: presalePT,
    about: aboutPT,
    presales: presalesPT,
    moonplus: moonplusPT,
    tokenomics: tokenomicsPT,
    transparencia: transparenciaPT,
    moonwallet: moonwalletPT,
    legal: legalPT,
   ecosystem: ecosystemPT
  },
  en: {
    navbar: navbarEN,
    hero: heroEN,
    presale: presaleEN,
    about: aboutEN,
    presales: presalesEN,
    moonplus: moonplusEN,
    tokenomics: tokenomicsEN,
    transparencia: transparenciaEN,
    moonwallet: moonwalletEN,
    legal: legalEN,
    ecosystem: ecosystemEN

  }
};

// Carga dinâmica dos extras
extraLangs.forEach((lang) => {
  if (!resources[lang]) resources[lang] = {};
  namespaces.forEach((ns) => {
    try {
      resources[lang][ns] = require(`@/locales/${lang}/${ns}.json`);
    } catch {
      resources[lang][ns] = {};
    }
  });
});

i18next.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'pt',
  ns: namespaces,
  defaultNS: 'navbar',
  interpolation: {
    escapeValue: false
  }
});

const translator = {
  setLanguage(lang: string) {
    i18next.changeLanguage(lang);
  },
  t(key: string, options?: any): any {
    return i18next.t(key, options);
  },
  get currentLang(): string {
    return i18next.language;
  }
};

export default translator;
