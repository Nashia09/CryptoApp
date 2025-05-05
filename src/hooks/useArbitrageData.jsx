import { useState, useEffect, useCallback } from 'react';

// Mock arbitrage data for fallback
const MOCK_ARBITRAGE_DATA = [
  {
    coin: "Bitcoin",
    minPrice: 50825.42,
    maxPrice: 51450.18,
    minExchange: "Kraken",
    maxExchange: "Binance",
    arbitragePercentage: "1.23",
    profitPotential: "62458.00"
  },
  {
    coin: "Ethereum",
    minPrice: 2419.85,
    maxPrice: 2487.32,
    minExchange: "Coinbase",
    maxExchange: "Bitfinex",
    arbitragePercentage: "2.79",
    profitPotential: "6747.00"
  },
  {
    coin: "Ripple",
    minPrice: 0.54,
    maxPrice: 0.57,
    minExchange: "Kraken",
    maxExchange: "KuCoin",
    arbitragePercentage: "5.56",
    profitPotential: "300.00"
  },
  {
    coin: "Cardano",
    minPrice: 0.44,
    maxPrice: 0.46,
    minExchange: "Coinbase",
    maxExchange: "Binance",
    arbitragePercentage: "4.55",
    profitPotential: "200.00"
  },
  {
    coin: "Solana",
    minPrice: 143.25,
    maxPrice: 147.86,
    minExchange: "KuCoin",
    maxExchange: "Binance",
    arbitragePercentage: "3.22",
    profitPotential: "461.00"
  },
  {
    coin: "Dogecoin",
    minPrice: 0.116,
    maxPrice: 0.122,
    minExchange: "Kraken",
    maxExchange: "Binance",
    arbitragePercentage: "5.17",
    profitPotential: "60.00"
  },
  {
    coin: "Polkadot",
    minPrice: 7.42,
    maxPrice: 7.65,
    minExchange: "Bitfinex",
    maxExchange: "KuCoin",
    arbitragePercentage: "3.10",
    profitPotential: "23.00"
  }
];

const useArbitrageData = () => {
  const [arbitrageData, setArbitrageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);
  
  // Selected coins for arbitrage comparison (top coins)
  const selectedCoins = ['bitcoin', 'ethereum', 'ripple', 'cardano', 'solana', 'dogecoin', 'polkadot'];
  
  // Selected exchanges to compare
  const exchanges = ['binance', 'coinbase', 'kraken', 'kucoin', 'bitfinex'];

  const fetchArbitrageData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);
    
    try {
      // Fetch tickers for each coin on different exchanges with timeout to prevent hanging
      const promises = selectedCoins.map(async (coin) => {
        try {
          const url = `https://api.coingecko.com/api/v3/coins/${coin}/tickers`;
          const response = await fetch(url, {
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            },
            signal: AbortSignal.timeout(8000) // 8 second timeout
          });
          
          if (!response.ok) {
            throw new Error(`Failed to fetch tickers for ${coin}`);
          }
          
          const data = await response.json();
          return { coin, tickers: data.tickers, success: true };
        } catch (err) {
          console.warn(`Error fetching data for ${coin}:`, err);
          // Return empty tickers for this coin
          return { coin, tickers: [], success: false };
        }
      });
      
      const results = await Promise.all(promises);
      
      // Check if all requests failed
      const allFailed = results.every(result => !result.success);
      
      if (allFailed) {
        console.warn('All API requests failed, using mock data.');
        setArbitrageData([...MOCK_ARBITRAGE_DATA]);
        setUsingMockData(true);
        setLoading(false);
        return;
      }
      
      // Process the results to identify arbitrage opportunities
      const arbitrageOpportunities = results
        .filter(result => result.tickers && result.tickers.length > 0)
        .map(result => {
          const { coin, tickers } = result;
          
          // Filter tickers by our selected exchanges
          const relevantTickers = tickers.filter(ticker => 
            exchanges.some(exchange => 
              ticker.market?.identifier?.toLowerCase().includes(exchange.toLowerCase())
            )
          );
          
          // If no relevant tickers found, skip this coin
          if (relevantTickers.length === 0) {
            return null;
          }
          
          // Group by exchange
          const exchangeData = {};
          relevantTickers.forEach(ticker => {
            const exchangeName = ticker.market?.name || 'Unknown';
            if (!exchangeData[exchangeName]) {
              exchangeData[exchangeName] = [];
            }
            exchangeData[exchangeName].push({
              pair: ticker.target,
              price: ticker.last,
              volume: ticker.volume
            });
          });
          
          // Find min and max prices across exchanges
          let minPrice = Number.MAX_VALUE;
          let maxPrice = 0;
          let minExchange = '';
          let maxExchange = '';
          
          Object.entries(exchangeData).forEach(([exchange, data]) => {
            // Use USD pair if available
            const usdPair = data.find(d => d.pair === 'USD' || d.pair === 'USDT');
            if (usdPair) {
              if (usdPair.price < minPrice) {
                minPrice = usdPair.price;
                minExchange = exchange;
              }
              if (usdPair.price > maxPrice) {
                maxPrice = usdPair.price;
                maxExchange = exchange;
              }
            }
          });
          
          // Skip if no valid min/max prices found
          if (minPrice === Number.MAX_VALUE || maxPrice === 0) {
            return null;
          }
          
          // Calculate arbitrage percentage
          const arbitragePercentage = ((maxPrice - minPrice) / minPrice) * 100;
          
          return {
            coin: coin.charAt(0).toUpperCase() + coin.slice(1), // Capitalize
            minPrice,
            maxPrice,
            minExchange,
            maxExchange,
            arbitragePercentage: arbitragePercentage.toFixed(2),
            profitPotential: ((maxPrice - minPrice) * 100).toFixed(2) // For 100 units
          };
        })
        .filter(item => item !== null); // Remove null entries
      
      // If no valid arbitrage opportunities found, use mock data
      if (arbitrageOpportunities.length === 0) {
        console.warn('No valid arbitrage opportunities found, using mock data.');
        setArbitrageData([...MOCK_ARBITRAGE_DATA]);
        setUsingMockData(true);
      } else {
        // Sort by arbitrage percentage (highest first)
        arbitrageOpportunities.sort((a, b) => 
          parseFloat(b.arbitragePercentage) - parseFloat(a.arbitragePercentage)
        );
        
        setArbitrageData(arbitrageOpportunities);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching arbitrage data:', err);
      setError('Network error. Using backup data.');
      setArbitrageData([...MOCK_ARBITRAGE_DATA]);
      setUsingMockData(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArbitrageData();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchArbitrageData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchArbitrageData]);

  return {
    arbitrageData,
    loading,
    error,
    usingMockData,
    refetch: fetchArbitrageData
  };
};

export default useArbitrageData; 