'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HoldingPage() {
  const { t } = useTranslation('about')

  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-hidden">

      
      {/* CONTENT CONTAINER */}
      <section className="flex flex-col items-center justify-center px-6 py-32 text-center space-y-12 max-w-4xl mx-auto">

        {/* TÍTULO */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-white"
        >
          {t('title')}
        </motion.h1>

        {/* SUBTÍTULO */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl"
        >
          {t('subtitle')}
        </motion.p>

        {/* BLOCO CORPORATIVO */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
          className="mt-6 space-y-3 text-base md:text-lg text-white/80"
        >
          {[0, 1, 2].map((i) => (
            <motion.p
              key={i}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {t(`manifesto.${i}`)}
            </motion.p>
          ))}
        </motion.div>

        {/* LINHA DIVISORA */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-20 h-[1.5px] bg-gray-600 opacity-30 mt-12 origin-center"
        />

        {/* FRASE FINAL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm text-gray-500 tracking-wide uppercase mt-6"
        >
          {t('seal')}
        </motion.div>

      </section>
    </main>
  )
}