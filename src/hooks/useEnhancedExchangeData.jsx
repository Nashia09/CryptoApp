import { useState, useEffect, useCallback } from 'react';

// Mock exchange data for fallback
const MOCK_EXCHANGES = [
  {
    id: "binance",
    name: "Binance",
    year_established: 2017,
    country: "Cayman Islands",
    url: "https://www.binance.com",
    image: "https://assets.coingecko.com/markets/images/52/small/binance.jpg",
    trust_score: 10,
    trust_score_rank: 1,
    trade_volume_24h_btc: 512345.89,
    trade_volume_24h_btc_normalized: 512345.89
  },
  {
    id: "coinbase",
    name: "Coinbase Exchange",
    year_established: 2012,
    country: "United States",
    url: "https://www.coinbase.com",
    image: "https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png",
    trust_score: 10,
    trust_score_rank: 2,
    trade_volume_24h_btc: 98765.43,
    trade_volume_24h_btc_normalized: 98765.43
  },
  {
    id: "kraken",
    name: "Kraken",
    year_established: 2011,
    country: "United States",
    url: "https://www.kraken.com",
    image: "https://assets.coingecko.com/markets/images/29/small/kraken.jpg",
    trust_score: 10,
    trust_score_rank: 3,
    trade_volume_24h_btc: 45678.91,
    trade_volume_24h_btc_normalized: 45678.91
  },
  {
    id: "kucoin",
    name: "KuCoin",
    year_established: 2017,
    country: "Seychelles",
    url: "https://www.kucoin.com",
    image: "https://assets.coingecko.com/markets/images/61/small/kucoin.png",
    trust_score: 9,
    trust_score_rank: 4,
    trade_volume_24h_btc: 34567.89,
    trade_volume_24h_btc_normalized: 34567.89
  },
  {
    id: "bybit_spot",
    name: "Bybit",
    year_established: 2018,
    country: "British Virgin Islands",
    url: "https://www.bybit.com",
    image: "https://assets.coingecko.com/markets/images/698/small/bybit_spot.png",
    trust_score: 9,
    trust_score_rank: 5,
    trade_volume_24h_btc: 23456.78,
    trade_volume_24h_btc_normalized: 23456.78
  },
  {
    id: "bitfinex",
    name: "Bitfinex",
    year_established: 2012,
    country: "British Virgin Islands",
    url: "https://www.bitfinex.com",
    image: "https://assets.coingecko.com/markets/images/4/small/BItfinex.png",
    trust_score: 9,
    trust_score_rank: 6,
    trade_volume_24h_btc: 12345.67,
    trade_volume_24h_btc_normalized: 12345.67
  },
  {
    id: "gate",
    name: "Gate.io",
    year_established: 2013,
    country: "Cayman Islands",
    url: "https://gate.io/",
    image: "https://assets.coingecko.com/markets/images/60/small/gate_io_logo1.jpg",
    trust_score: 9,
    trust_score_rank: 7,
    trade_volume_24h_btc: 10987.65,
    trade_volume_24h_btc_normalized: 10987.65
  },
  {
    id: "okx",
    name: "OKX",
    year_established: 2013,
    country: "Seychelles",
    url: "https://www.okx.com",
    image: "https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.png",
    trust_score: 8,
    trust_score_rank: 8,
    trade_volume_24h_btc: 9876.54,
    trade_volume_24h_btc_normalized: 9876.54
  },
  {
    id: "gemini",
    name: "Gemini",
    year_established: 2014,
    country: "United States",
    url: "https://gemini.com/",
    image: "https://assets.coingecko.com/markets/images/50/small/gemini.jpg",
    trust_score: 8,
    trust_score_rank: 9,
    trade_volume_24h_btc: 8765.43,
    trade_volume_24h_btc_normalized: 8765.43
  },
  {
    id: "huobi",
    name: "Huobi Global",
    year_established: 2013,
    country: "Seychelles",
    url: "https://www.huobi.com",
    image: "https://assets.coingecko.com/markets/images/25/small/1481589873352.png",
    trust_score: 8,
    trust_score_rank: 10,
    trade_volume_24h_btc: 7654.32,
    trade_volume_24h_btc_normalized: 7654.32
  },
];

const useEnhancedExchangeData = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [sortBy, setSortBy] = useState('trust_score_rank');
  const [sortDir, setSortDir] = useState('asc');
  
  const fetchExchanges = useCallback(async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);
    
    try {
      const url = 'https://api.coingecko.com/api/v3/exchanges';
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange data');
      }
      
      const data = await response.json();
      setExchanges(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching exchange data:', err);
      setError('Network error. Using backup data.');
      setExchanges([...MOCK_EXCHANGES]);
      setUsingMockData(true);
      setLoading(false);
    }
  }, []);
  
  // Sort and filter exchanges
  const processExchanges = useCallback(() => {
    // First filter by search term
    let filtered = exchanges;
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = exchanges.filter(exchange => 
        exchange.name.toLowerCase().includes(searchLower) || 
        (exchange.country && exchange.country.toLowerCase().includes(searchLower))
      );
    }
    
    // Then sort
    const sorted = [...filtered].sort((a, b) => {
      // Get values to compare
      let valueA = a[sortBy];
      let valueB = b[sortBy];
      
      // Handle missing values
      if (valueA === undefined || valueA === null) return 1;
      if (valueB === undefined || valueB === null) return -1;
      
      // String comparison
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      // Compare based on sort direction
      if (sortDir === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    // Paginate
    const start = (page - 1) * perPage;
    const end = start + perPage;
    
    return {
      data: sorted.slice(start, end),
      totalPages: Math.ceil(sorted.length / perPage),
      totalItems: sorted.length
    };
  }, [exchanges, search, sortBy, sortDir, page, perPage]);
  
  // Get processed data
  const { data: paginatedExchanges, totalPages, totalItems } = processExchanges();
  
  // Initial fetch on component mount
  useEffect(() => {
    fetchExchanges();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchExchanges, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchExchanges]);
  
  // Handle search
  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setPage(1); // Reset to first page when searching
  };
  
  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle direction if clicking the same column
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setSortBy(column);
      setSortDir('asc');
    }
  };
  
  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  
  return {
    exchanges: paginatedExchanges,
    loading,
    error,
    usingMockData,
    search,
    sortBy,
    sortDir,
    page,
    perPage,
    totalPages,
    totalItems,
    handleSearch,
    handleSort,
    handlePageChange,
    setPerPage,
    refetch: fetchExchanges
  };
};

export default useEnhancedExchangeData; 