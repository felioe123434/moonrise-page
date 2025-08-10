import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importações fixas para português e inglês
import navbarPT from '@/locales/pt/navbar.json';
import heroPT from '@/locales/pt/hero.json';
import presalePT from '@/locales/pt/presale.json';
import aboutPT from '@/locales/pt/about.json';
import presalesPT from '@/locales/pt/presales.json';
import moonchainPT from '@/locales/pt/moonchain.json';
import tokenomicsPT from '@/locales/pt/tokenomics.json';
import transparenciaPT from '@/locales/pt/transparencia.json';
import appmoonrisePT from '@/locales/pt/appmoonrise.json';
import contactPT from '@/locales/pt/contact.json';
import ecosystemPT from '@/locales/pt/ecosystem.json';

import navbarEN from '@/locales/en/navbar.json';
import heroEN from '@/locales/en/hero.json';
import presaleEN from '@/locales/en/presale.json';
import aboutEN from '@/locales/en/about.json';
import presalesEN from '@/locales/en/presales.json';
import moonchainEN from '@/locales/en/moonchain.json';
import tokenomicsEN from '@/locales/en/tokenomics.json';
import transparenciaEN from '@/locales/en/transparencia.json';
import appmoonriseEN from '@/locales/en/appmoonrise.json';
import contactEN from '@/locales/en/contact.json';
import ecosystemEN from '@/locales/en/ecosystem.json';

// Idiomas adicionais suportados (com require dinâmico)
const extraLangs = ['es', 'fr', 'de', 'zh', 'ru', 'hi'];

const namespaces = [
  'navbar', 'hero', 'presale', 'about', 'presales',
  'moonchain', 'tokenomics', 'transparencia', 'appmoonrise', 'contact', 'ecosystem' // <- certo
];



// Recursos multilíngues
const resources: any = {
  pt: {
    navbar: navbarPT,
    hero: heroPT,
    presale: presalePT,
    about: aboutPT,
    presales: presalesPT,
    moonchain: moonchainPT,
    tokenomics: tokenomicsPT,
    transparencia: transparenciaPT,
    appmoonrise: appmoonrisePT,
    contact: contactPT,
   ecosystem: ecosystemPT
  },
  en: {
    navbar: navbarEN,
    hero: heroEN,
    presale: presaleEN,
    about: aboutEN,
    presales: presalesEN,
    moonchain: moonchainEN,
    tokenomics: tokenomicsEN,
    transparencia: transparenciaEN,
    appmoonrise: appmoonriseEN,
    contact: contactEN,
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
