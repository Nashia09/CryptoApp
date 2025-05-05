import React from 'react';
import useEnhancedExchangeData from '../hooks/useEnhancedExchangeData';

export const EnhancedExchangesTable = () => {
  const {
    exchanges,
    loading,
    error,
    usingMockData,
    search,
    sortBy,
    sortDir,
    page,
    totalPages,
    totalItems,
    handleSearch,
    handleSort,
    handlePageChange,
    setPerPage,
    refetch
  } = useEnhancedExchangeData();

  // Format numbers for display
  const formatNumber = (number, maximumFractionDigits = 2) => {
    if (number === undefined || number === null) return '-';
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits
    }).format(number);
  };

  // Format volume for display
  const formatVolume = (volume) => {
    if (volume === undefined || volume === null) return '-';
    if (volume > 1000000) {
      return `${(volume / 1000000).toFixed(2)}M BTC`;
    } else if (volume > 1000) {
      return `${(volume / 1000).toFixed(2)}K BTC`;
    } else {
      return `${volume.toFixed(2)} BTC`;
    }
  };

  // Get sort direction icon
  const getSortIcon = (column) => {
    if (sortBy !== column) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    if (sortDir === 'asc') {
      return (
        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
  };

  // Create a sortable header cell
  const SortableHeader = ({ column, label }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center">
        <span>{label}</span>
        <span className="ml-2">{getSortIcon(column)}</span>
      </div>
    </th>
  );

  if (loading && exchanges.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Header with search and data status */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="w-full lg:w-1/3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search exchanges by name or country..."
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

        <div className="flex items-center gap-4">
          {usingMockData && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              Using offline data
            </span>
          )}
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            onChange={(e) => setPerPage(Number(e.target.value))}
            defaultValue={10}
          >
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
            <option value={100}>100 rows</option>
          </select>
          
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 p-4 border-b border-red-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exchange
              </th>
              <SortableHeader column="trust_score" label="Trust Score" />
              <SortableHeader column="year_established" label="Year Est." />
              <SortableHeader column="country" label="Country" />
              <SortableHeader column="trade_volume_24h_btc_normalized" label="Volume (24h)" />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exchanges.length > 0 ? (
              exchanges.map((exchange, index) => (
                <tr key={exchange.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exchange.trust_score_rank || index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {exchange.image && (
                        <div className="flex-shrink-0 h-10 w-10 mr-3">
                          <img 
                            className="h-10 w-10 rounded-full" 
                            src={exchange.image} 
                            alt={exchange.name}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=' + exchange.name.substring(0, 1) }}
                          />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{exchange.name}</div>
                        <div className="text-sm text-gray-500">{exchange.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {exchange.trust_score ? (
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className={`h-2.5 rounded-full ${
                              exchange.trust_score >= 8 ? 'bg-green-500' : 
                              exchange.trust_score >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${exchange.trust_score * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{exchange.trust_score}/10</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exchange.year_established || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exchange.country || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {formatVolume(exchange.trade_volume_24h_btc_normalized)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exchange.url ? (
                      <a 
                        href={exchange.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900 hover:underline"
                      >
                        Visit
                      </a>
                    ) : '-'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  {search ? 'No exchanges match your search criteria.' : 'No exchange data available.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing{' '}
          <span className="font-medium">{(page - 1) * exchanges.length + 1}</span>
          {' '}-{' '}
          <span className="font-medium">{Math.min(page * exchanges.length, totalItems)}</span>
          {' '}of{' '}
          <span className="font-medium">{totalItems}</span>
          {' '}exchanges
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
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
            onClick={() => handlePageChange(page + 1)}
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