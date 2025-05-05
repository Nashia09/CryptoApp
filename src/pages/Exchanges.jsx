import React from 'react';
import { EnhancedExchangesTable } from '../components/EnhancedExchangesTable';

const Exchanges = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Cryptocurrency Exchanges</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Compare the world's top cryptocurrency exchanges by trading volume, trust score, and more.
          Find the best platform for your trading needs.
        </p>
      </div>

      <div className="mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Exchange ratings are based on trust scores (which consider factors like liquidity, trading volume, and security),
                age of the exchange, regulatory compliance, and more. Always do your own research before trading.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <EnhancedExchangesTable />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="text-blue-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Security First</h3>
          <p className="text-gray-600">
            Look for exchanges with high trust scores, which often indicates strong security measures, cold storage for funds, and regular security audits.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="text-blue-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Trading Volume</h3>
          <p className="text-gray-600">
            Higher trading volumes generally indicate better liquidity, which means easier buying and selling of assets at stable prices with minimal slippage.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="text-blue-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Regulatory Compliance</h3>
          <p className="text-gray-600">
            Consider exchanges that operate in countries with clear cryptocurrency regulations and those that comply with KYC (Know Your Customer) and AML (Anti-Money Laundering) requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Exchanges; 