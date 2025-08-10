'use client'
import { useEffect, useState } from 'react'
import translator from '@/lib/Translator'

export default function useForceLang() {
  const [lang, setLang] = useState(translator.currentLang)

  useEffect(() => {
    const id = setInterval(() => {
      if (translator.currentLang !== lang) {
        setLang(translator.currentLang)
      }
    }, 100)

    return () => clearInterval(id)
  }, [lang])

  return lang
}
