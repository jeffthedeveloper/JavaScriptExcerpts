const BASE_URL_BINANCE = 'https://api.binance.com';

const customFetch = async (base_url, endpoint, callback, info = {}) => {
  const response = await fetch(base_url + endpoint, info);
  const data = await response.json();
  return callback(data);
}

const callbackCryptoList = (data) => data.filter((item) => item.symbol.includes('BRL'));
const fetchCryptoList = () => customFetch(BASE_URL_BINANCE, '/api/v3/ticker/price', callbackCryptoList);
