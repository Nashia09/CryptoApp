import React from 'react'
import { CoinTable } from '../components/CoinTable'
import { ArbitrageTable } from '../components/ArbitrageTable'

const Trade = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Trade with Confidence</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Access real-time market data and trade on the world's most reliable platform. 
          Get started with our advanced trading tools and competitive rates.
        </p>
      </div>

      <div className="mb-16">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Cryptocurrency Market</h2>
          <div className="text-sm text-gray-500">
            Data updates every 60 seconds
          </div>
        </div>
        <CoinTable />
      </div>

      <div className="mb-16">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Arbitrage Opportunities</h2>
          <div className="text-sm text-gray-500">
            Find price differences across exchanges
          </div>
        </div>
        <ArbitrageTable />
      </div>
    </div>
  )
}

export default Trade