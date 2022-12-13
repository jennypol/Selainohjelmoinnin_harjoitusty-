//import { IncomeExpenses } from "./IncomeExpenses";

const balance = document.getElementById('balance');
const keskikulutus = document.getElementById('keskikulutus');
const kokonaiskustannukset= document.getElementById('kokonaiskustannukset');
const kilometrit = document.getElementById('kilometrit');
const kulut = document.getElementById('kulut');
const litrat = document.getElementById('litrat');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const polttoaine = document.getElementById('litratmaara');
const kilsat = document.getElementById('kilometritmaara');


// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
      polttoaine: +polttoaine.value,
      kilsat: +kilsat.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
    polttoaine.value = '';
    kilsat.value = '';
  }
}

// randomi id
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// lisätään tapahtuma Dom luetteloon
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // lisätään luokka muuttujaan
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// Päivitetään muuttujat
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const amountslitrat = transactions.map(transaction => transaction.polttoaine);
  const amountskilsat = transactions.map(transaction => transaction.kilsat);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const totaleurot = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const totallitrat = (
    amountslitrat.filter(item => item > 0).reduce((acc, item) => (acc += item), 0)
  ).toFixed(2);

  const totalkilsat = (
    amountskilsat.filter(item => item > 0).reduce((acc, item) => (acc += item), 0)
  ).toFixed(2);
 
  
  const total100litrat = (totallitrat/totalkilsat*100).toFixed(2);
  const total100eurot = (totaleurot/totalkilsat*100).toFixed(2);

  //balance.innerText = `${total}€`;
  keskikulutus.innerText = `${total100litrat}l`; 
  kokonaiskustannukset.innerText = `${total100eurot}€`;
  kilometrit.innerText = `${totalkilsat}km`;
  kulut.innerText = `${totaleurot}€`;
  litrat.innerText = `${totallitrat}l`;
  
}

// Poistetaan ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// päivitetään tapahtumat
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);