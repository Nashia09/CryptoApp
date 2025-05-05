import React, { useState } from 'react';
import useCoinData from '../hooks/useCoinData';

export const CoinTable = () => {
  const [perPage, setPerPage] = useState(20);
  const {
    coins,
    loading,
    error,
    page,
    totalPages,
    search,
    sortBy,
    handleSearch,
    handleSort,
    handlePage
  } = useCoinData(perPage);

  // Mapping for sort options
  const sortOptions = [
    { value: 'market_cap_desc', label: 'Market Cap (High to Low)' },
    { value: 'market_cap_asc', label: 'Market Cap (Low to High)' },
    { value: 'volume_desc', label: 'Volume (High to Low)' },
    { value: 'volume_asc', label: 'Volume (Low to High)' },
    { value: 'id_asc', label: 'Name (A-Z)' },
    { value: 'id_desc', label: 'Name (Z-A)' },
    { value: 'price_asc', label: 'Price (Low to High)' },
    { value: 'price_desc', label: 'Price (High to Low)' }
  ];

  // Function to format numbers with commas
  const formatNumber = (number, maximumFractionDigits = 2) => {
    return new Intl.NumberFormat('en-US', { 
      maximumFractionDigits 
    }).format(number);
  };

  // Function to format currency
  const formatCurrency = (number, maximumFractionDigits = 2) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits
    }).format(number);
  };

  // Function to determine price change color
  const getPriceChangeColor = (priceChange) => {
    if (!priceChange) return 'text-gray-500';
    return priceChange >= 0 ? 'text-green-500' : 'text-red-500';
  };

  if (loading && coins.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-lg text-red-700 mb-4">
        <p className="font-semibold">Error loading data:</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with search and filters */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="w-full lg:w-1/3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search coins..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-auto">
          <div className="w-full sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-32">
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value={10}>10 rows</option>
              <option value={20}>20 rows</option>
              <option value={50}>50 rows</option>
              <option value={100}>100 rows</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 tracking-wider">#</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 tracking-wider">Coin</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 tracking-wider">Price</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 tracking-wider">24h Change</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 tracking-wider">Market Cap</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-600 tracking-wider">Volume (24h)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {coins.length > 0 ? (
              coins.map((coin, index) => (
                <tr 
                  key={coin.id} 
                  className="hover:bg-blue-50 transition-colors duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(page - 1) * perPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={coin.image} 
                        alt={coin.name} 
                        className="h-8 w-8 rounded-full" 
                      />
                      <div>
                        <div className="font-medium text-gray-900">{coin.name}</div>
                        <div className="text-gray-500 uppercase text-xs">{coin.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(coin.current_price)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getPriceChangeColor(coin.price_change_percentage_24h)}`}>
                    {coin.price_change_percentage_24h ? `${coin.price_change_percentage_24h.toFixed(2)}%` : '0.00%'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(coin.market_cap, 0)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(coin.total_volume, 0)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  {search ? 'No coins match your search criteria' : 'No coin data available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing page {page} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 border rounded-md text-sm font-medium ${
              page === 1
                ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => handlePage(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 border rounded-md text-sm font-medium ${
              page === totalPages
                ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}; 