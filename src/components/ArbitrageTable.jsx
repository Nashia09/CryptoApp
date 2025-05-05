import React from 'react';
import useArbitrageData from '../hooks/useArbitrageData';

export const ArbitrageTable = () => {
  const { arbitrageData, loading, error, refetch } = useArbitrageData();

  // Function to format currency
  const formatCurrency = (number, maximumFractionDigits = 2) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits
    }).format(number);
  };

  if (loading && arbitrageData.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-lg text-red-700 mb-4">
        <p className="font-semibold">Error loading arbitrage data:</p>
        <p>{error}</p>
        <button 
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Arbitrage Opportunities</h3>
        <button 
          onClick={refetch}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 tracking-wider">Coin</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 tracking-wider">Buy At</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 tracking-wider">Sell At</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 tracking-wider">Price Difference</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 tracking-wider">Arbitrage %</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 tracking-wider">Profit Potential (100 units)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {arbitrageData.length > 0 ? (
              arbitrageData.map((item, index) => (
                <tr 
                  key={item.coin + index} 
                  className={`hover:bg-blue-50 transition-colors duration-150 ease-in-out ${
                    parseFloat(item.arbitragePercentage) > 1 
                      ? 'bg-green-50' 
                      : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.coin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.minExchange}</div>
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(item.minPrice)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.maxExchange}</div>
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(item.maxPrice)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(item.maxPrice - item.minPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {item.arbitragePercentage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      parseFloat(item.profitPotential) > 100 
                        ? 'text-green-600' 
                        : 'text-gray-900'
                    }`}>
                      {formatCurrency(item.profitPotential)}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No arbitrage opportunities found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          <p>Note: Prices are refreshed every 5 minutes. Arbitrage opportunities may change rapidly.</p>
          <p>Transaction fees, transfer times, and other costs are not included in these calculations.</p>
        </div>
      </div>
    </div>
  );
}; 