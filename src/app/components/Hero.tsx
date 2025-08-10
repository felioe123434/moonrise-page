'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation, Trans } from 'react-i18next';
import Link from 'next/link';

export default function Hero() {
  const { t } = useTranslation('hero');

  return (
    <section className="w-full bg-black text-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* Texto */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-sm uppercase text-purple-400 font-semibold tracking-wider mb-4">
            {t('tagline')}
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            <Trans
              i18nKey="title"
              t={t}
              components={{
                1: <span className="text-purple-500" />,
                3: <span className="text-yellow-400" />,
                br: <br />
              }}
            />
          </h1>

          <p className="text-base md:text-xl text-gray-400 max-w-md mx-auto md:mx-0 mb-8 leading-relaxed">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
            <Link
              href="/ecosystem"
              className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 hover:scale-105 transition duration-300 text-center"
            >
              {t('ecosystemBtn')}
            </Link>

            <Link
              href="/presales"
              className="bg-yellow-500 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-400 hover:scale-105 transition duration-300 text-center"
            >
              {t('presaleBtn')}
            </Link>
          </div>
        </div>


        {/* Imagem mockup do app */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/moonrise-app-mockup.png"
            alt="App MoonRise"
            width={360}
            height={760}
            className="w-[260px] md:w-[360px] drop-shadow-2xl mb-[-60px] md:mb-0"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
