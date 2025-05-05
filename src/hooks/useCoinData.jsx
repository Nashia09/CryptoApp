import { useState, useEffect, useCallback } from 'react';

// Mock data in case API fails
const MOCK_COINS = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 51235.42,
    market_cap: 1002342542378,
    market_cap_rank: 1,
    total_volume: 28456721045,
    price_change_percentage_24h: 2.34,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 2476.89,
    market_cap: 298745634521,
    market_cap_rank: 2,
    total_volume: 12756823409,
    price_change_percentage_24h: 1.02,
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    current_price: 567.42,
    market_cap: 89674562134,
    market_cap_rank: 3,
    total_volume: 2345876129,
    price_change_percentage_24h: -0.75,
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    current_price: 0.56,
    market_cap: 28745612367,
    market_cap_rank: 4,
    total_volume: 1283746591,
    price_change_percentage_24h: -1.23,
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 145.78,
    market_cap: 56847612345,
    market_cap_rank: 5,
    total_volume: 2987456123,
    price_change_percentage_24h: 3.45,
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.45,
    market_cap: 23478561234,
    market_cap_rank: 6,
    total_volume: 987645123,
    price_change_percentage_24h: 0.21,
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    current_price: 0.12,
    market_cap: 18457612345,
    market_cap_rank: 7,
    total_volume: 876545678,
    price_change_percentage_24h: -2.34,
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    current_price: 7.56,
    market_cap: 12345678901,
    market_cap_rank: 8,
    total_volume: 765432123,
    price_change_percentage_24h: 1.12,
  },
  {
    id: "tron",
    symbol: "trx",
    name: "TRON",
    image: "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png",
    current_price: 0.13,
    market_cap: 9876543210,
    market_cap_rank: 9,
    total_volume: 543216789,
    price_change_percentage_24h: 0.87,
  },
  {
    id: "litecoin",
    symbol: "ltc",
    name: "Litecoin",
    image: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
    current_price: 78.45,
    market_cap: 7654321098,
    market_cap_rank: 10,
    total_volume: 432165789,
    price_change_percentage_24h: -0.67,
  }
];

const useCoinData = (perPage = 50) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [totalPages, setTotalPages] = useState(0);
  const [usingMockData, setUsingMockData] = useState(false);

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);
    
    try {
      // Try different cryptocurrency data APIs
      const apis = [
        // CoinGecko API
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`,
        // CoinCap API as fallback
        `https://api.coincap.io/v2/assets?limit=${perPage}&offset=${(page-1)*perPage}`
      ];
      
      let data = null;
      let source = '';
      
      // Try CoinGecko first
      try {
        const response = await fetch(apis[0], {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          // Add timeout to prevent hanging
          signal: AbortSignal.timeout(5000)
        });
        
        if (response.ok) {
          data = await response.json();
          source = 'coingecko';
        } else {
          throw new Error('CoinGecko API failed');
        }
      } catch (err) {
        // If CoinGecko fails, try CoinCap
        try {
          const response = await fetch(apis[1], {
            headers: {
              'Accept': 'application/json'
            },
            signal: AbortSignal.timeout(5000)
          });
          
          if (response.ok) {
            const rawData = await response.json();
            // Transform CoinCap data to match CoinGecko format
            data = rawData.data.map(coin => ({
              id: coin.id,
              symbol: coin.symbol.toLowerCase(),
              name: coin.name,
              image: `https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`,
              current_price: parseFloat(coin.priceUsd),
              market_cap: parseFloat(coin.marketCapUsd),
              market_cap_rank: parseInt(coin.rank),
              total_volume: parseFloat(coin.volumeUsd24Hr),
              price_change_percentage_24h: parseFloat(coin.changePercent24Hr),
            }));
            source = 'coincap';
          } else {
            throw new Error('CoinCap API failed');
          }
        } catch (fallbackErr) {
          // If both APIs fail, use mock data
          console.warn('Using mock data as both APIs failed', err, fallbackErr);
          data = [...MOCK_COINS];
          setUsingMockData(true);
          source = 'mock';
        }
      }
      
      // Set data based on source
      if (source === 'coingecko' || source === 'mock') {
        setCoins(data);
        setTotalPages(Math.ceil(2000 / perPage));
      } else if (source === 'coincap') {
        setCoins(data);
        setTotalPages(Math.ceil(2000 / perPage));
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching coin data:', err);
      setError('Network error. Using backup data.');
      setCoins([...MOCK_COINS]);
      setUsingMockData(true);
      setTotalPages(1);
      setLoading(false);
    }
  }, [page, perPage, sortBy]);

  useEffect(() => {
    fetchCoins();
    
    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      fetchCoins();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [fetchCoins]);
  
  // Filter coins based on search text
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );
  
  // Function to handle search input change
  const handleSearch = (searchText) => {
    setSearch(searchText);
  };
  
  // Function to handle sort change
  const handleSort = (sortOption) => {
    setSortBy(sortOption);
  };
  
  // Function to handle pagination
  const handlePage = (newPage) => {
    setPage(newPage);
  };

  return {
    coins: filteredCoins,
    loading,
    error,
    page,
    totalPages,
    search,
    sortBy,
    usingMockData,
    handleSearch,
    handleSort,
    handlePage,
    refetch: fetchCoins
  };
};

export default useCoinData; 