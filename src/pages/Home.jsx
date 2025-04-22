import React from 'react'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Features } from '../components/Features'
import FAQSection from '../components/Faq'

export const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Features />
      <FAQSection />
    </div>
  )
}
