var baseUrl = "https://api.coinranking.com/v2/coins"
var proxyUrl = "https://cors-anywhere.herokuapp.com/"
var coinsData = []
// var current_page = 1
// var records_per_page = 10;
var apiUrl = `${proxyUrl}${baseUrl}`;

const pageSize = 10;
let curPage = 1;

async function renderTable(page = 1) {
  await getData()

  if (page == 1) {
    prevButton.style.visibility = "hidden";
  } else {
    prevButton.style.visibility = "visible";
  }

  if (page == numPages()) {
    nextButton.style.visibility = "hidden";
  } else {
    nextButton.style.visibility = "visible";
  }

  // create html
  var cryptoCoin = "";
  coinsData.filter((row, index) => {
    let start = (curPage - 1) * pageSize;
    let end = curPage * pageSize;
    if (index >= start && index < end) return true;
  }).forEach(coin => {
    cryptoCoin += "<tr>";
    cryptoCoin += `<td> ${parseFloat(coin.btcPrice).toFixed(6)} </td>`;
    cryptoCoin += `<td> ${coin.rank}</td>`;
    cryptoCoin += `<td> ${coin.tier} </td>`;
    cryptoCoin += `<td> ${coin.name}</td>`;
    cryptoCoin += `<td> $${Math.round(coin.price)} Billion</td>`;
    cryptoCoin += `<td> ${coin.symbol}</td>`; "<tr>";
  });
  document.getElementById("data").innerHTML = cryptoCoin;
}

function previousPage() {
  if (curPage > 1) {
    curPage--;
    renderTable(curPage);
  }
}

function nextPage() {
  if ((curPage * pageSize) < coinsData.length) {
    curPage++;
    renderTable(curPage);
  }
}

renderTable()

function numPages() {
  return Math.ceil(coinsData.length / pageSize);
}

document.querySelector('#nextButton').addEventListener('click', nextPage, false);
document.querySelector('#prevButton').addEventListener('click', previousPage, false);
//Fetch Data from API
async function getData() {
  const response = await fetch(apiUrl)
  const coins = await response.json()
  coinsData = coins.data.coins
}
