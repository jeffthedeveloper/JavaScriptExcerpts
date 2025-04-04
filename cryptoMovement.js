const history = document.getElementById('history');
const printHistory = (operation, symbol, coinsAmount, currentPrice, value) => {
  const user = document.querySelector('.user-text span').id;  
  const currentPriceBR = currentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const valueBR = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const div = createElement('div');
  if (operation === 'buy') {
    div.className = 'comprada'
    div.innerHTML = `<span>${symbol} - Qtd: ${coinsAmount.toFixed(8)}</span>
    Preço: ${currentPriceBR} <br> Valor da compra: ${valueBR}`;
  } else if (operation === 'sell') {
    div.className = 'vendida'
    div.innerHTML = `<span>${symbol} - Qtd: ${coinsAmount.toFixed(8)}</span>
    Preço: ${currentPriceBR} <br> Valor da venda: ${valueBR}`;
  }
  history.appendChild(div);
  const userObj = JSON.parse(localStorage.getItem(user));
  console.log(userObj);
  userObj.history = history.innerHTML;
  localStorage.setItem(user, JSON.stringify(userObj));
}

const tradeCrypto = async (option) => {
  const user = document.querySelector('.user-text span').id;
  const symbol = document.querySelector('#options').value;
  const cryptoList = await fetchCryptoList();
  const price = parseFloat(cryptoList.find(({ symbol: sy }) => sy === symbol).price);
  const valueInput = parseFloat(document.getElementById('input-value').value);
  const obj = JSON.parse(localStorage.getItem(user));
  const result = valueInput / price;
  if (option === 'buy' && obj.funds >= valueInput) {
    obj.funds -= valueInput;
    !obj.positions[symbol] ? obj.positions[symbol] = result : obj.positions[symbol] += result;
  } else if (option === 'sell' && valueInput <= obj.positions[symbol] * price) {
    obj.funds += valueInput;
    !obj.positions[symbol] ? obj.positions[symbol] = result : obj.positions[symbol] -= result;
  } else {
    throw new Error('Alguma coisa deu errado, por favor tente mais tarde');
  }
  localStorage.setItem(user, JSON.stringify(obj));
  printHistory(option, symbol, result, price, valueInput);
  document.getElementById('input-value').value = '';
}