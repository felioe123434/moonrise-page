'use client'

import React from 'react'
import Hero from './components/Hero'



export default function Page() {
  return (
    <div className="bg-black text-white scroll-smooth">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 space-y-20">
        
        <Hero />
      </div>
    </div>
  )
}
