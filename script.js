const cryptoList = document.getElementById('crypto-list');
const select = document.getElementById('options');
const loggedElem = document.querySelectorAll('.logged');
const notLoggedElem = document.querySelectorAll('.not-logged');

const imagePanel = document.querySelector('#hist > .not-logged');

const registerElem = document.querySelector('.register');
const registerBtn = document.querySelector('#register-btn');
const registerText = document.querySelectorAll('.register-text');

const loginElem = document.querySelector('.login');
const loginBtn = document.querySelector('#login-btn');
const loginText = document.querySelector('.login-text');

const logoutText = document.querySelector('.logout-text');

const btnAdicionar = document.querySelector('.adc-funds');
const btnConcludeAdd = document.querySelector('#concluir-compra');
const btnAddBack = document.querySelector('#voltar-compra');

const btnComprar = document.getElementById('btn-comprar');
const btnVender = document.getElementById('btn-vender');

const walletElem = document.querySelectorAll('#wallet');

const createCustomImage = (imageSource, imageClass) => {
  const img = document.createElement('img');
  img.src = imageSource;
  img.className = imageClass;
  return img;
}

const verifyBlanks = () => {
  const username = registerElem.querySelector('.username').value;
  const password = registerElem.querySelectorAll('.password');
  return (username && password[0].value && password[1].value);
}

const verifyPassword = () => {
  const passwords = registerElem.querySelectorAll('.password');
  return passwords[0].value === passwords[1].value;
}

const createUser = () => {
  if (!verifyBlanks()) {
    console.log('Fields cannot be blank');
    return;
  }
  if (!verifyPassword()) {
    console.log('Password mut match confirmation!');
    return
  }
  loginElem.style.display = 'block';
  registerElem.style.display = 'none';
  const username = registerElem.querySelector('.username').value;
  const password = registerElem.querySelector('.password').value;
  const usersData = JSON.parse(localStorage.getItem('usersData'));
  if (!usersData) {
    localStorage.setItem(username, JSON.stringify({
      username,
      password,
      funds: 0,
      positions: {},
      history: '',
    }));
  }
  registerElem.querySelector('.username').value = '';
  registerElem.querySelectorAll('.password').forEach((e) => e.value = '');
}

const loginLogout = (block, none) => {
  block.forEach((e) => e.style.display = 'block');
  none.forEach((e) => e.style.display = 'none');
}

const loginRegister = (block, none) => {
  block.style.display = 'block';
  none.style.display = 'none';
}

const login = () => {
  const usr = loginElem.querySelector('.username').value;
  const pwd = loginElem.querySelector('.password').value;
  const user = JSON.parse(localStorage.getItem(usr));
  const { username,password } = user;
  if (pwd === password) {
    loginLogout(loggedElem, notLoggedElem);
    document.querySelector('.user-text').innerHTML = `Bem-vindo(a), <span id="${username}">${username}</span>!`;
    sessionStorage.setItem('logged', 'true');
    sessionStorage.setItem('username', username);
    document.querySelector('#history').innerHTML = user.history;
  } else {
    console.log('Incorrect User and/or Password');
  }
  loginElem.querySelector('.username').value = '';
  loginElem.querySelector('.password').value = '';
}

const createElement = (tag, ...classNames) => {
  const e = document.createElement(tag);
  if (!classNames.length) return e;
  e.className = classNames.join(' ');
  return e;
}

const listListener = (event) => {
  const targetId = event.target.dataset.symbol;
  const optionsChildren = Array.from(select.children);
  const toRemove = optionsChildren.find((child) => child.hasAttribute('selected'));
  if (toRemove) toRemove.removeAttribute('selected');
  select.querySelector(`.${targetId}`).setAttribute('selected', '');
}

const listCrypto = async () => {
  const list = await fetchCryptoList();
  cryptoList.innerHTML = '';
  list.forEach(({ symbol, price }, index) => {
    const text = `<span data-symbol="${symbol}">${symbol.substring(0, symbol.length - 3)}</span> ${parseFloat(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
    const li = createElement('li', 'item-list');
    li.innerHTML = text;
    li.dataset.symbol = symbol;
    li.addEventListener('click', listListener);
    cryptoList.appendChild(li);
    if(index < 12 && imagePanel.children.length < 12) {
      imagePanel.appendChild(createCustomImage(`/images/${symbol.substring(0, symbol.length - 3)}.png`, 'logo'));
    }
  });
}

async function cryptOptions () {
  const list = await fetchCryptoList();
  list.forEach(({ symbol }) => {
    const option = createElement('option', symbol);
    option.value = symbol;
    option.innerText = symbol.substring(0, symbol.length - 3);
    select.appendChild(option);
  });
}

window.onload = async () => {
  
  if (JSON.parse(sessionStorage.getItem('logged'))) {
    loginLogout(loggedElem, notLoggedElem);
    const user = sessionStorage.getItem('username');
    document.querySelector('.user-text').innerHTML = `Bem-vindo(a), <span id="${user}">${user}</span>!`;
    const { history } = JSON.parse(localStorage.getItem(user));
    document.querySelector('#history').innerHTML = history;
  } else {
    loginLogout(notLoggedElem, loggedElem);
    loginRegister(registerElem, loginElem);
  }

  registerText.forEach((e) => e.addEventListener('click', () => loginRegister(registerElem, loginElem)));
  loginText.addEventListener('click', () => loginRegister(loginElem, registerElem));
  logoutText.addEventListener('click', () => {
    backToHomepage();
    loginLogout(notLoggedElem, loggedElem);
    loginRegister(loginElem, registerElem);
    loginRegister(loginElem, walletElem[0]);
    sessionStorage.setItem('logged', 'false');
  });
  
  registerBtn.addEventListener('click', createUser);
  loginBtn.addEventListener('click', login);

  await listCrypto();
  await setInterval(listCrypto, 1000);
  await cryptOptions();
  btnAdicionar.addEventListener('click', addFunds);
  btnConcludeAdd.addEventListener('click', concludeAdd);
  btnAddBack.addEventListener('click', backToHomepage);
  btnComprar.addEventListener('click', () => tradeCrypto('buy'));
  btnVender.addEventListener('click', () => tradeCrypto('sell'));
}