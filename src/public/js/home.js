// const API_URL = 'http://localhost:5000';
const API_URL = 'https://calculation-stock.glitch.me';

async function getPrice() {
  const response = await fetch(`${API_URL}/v1/stock/price`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function getStock() {
  const response = await fetch(`${API_URL}/v1/stock`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function addRow() {
  const priceStocks = await getPrice();
  const stocks = await getStock();
  let td;
  let tr;
  let table = document.getElementById('table-stock');
  let count = 0;
  for (const stock of stocks) {
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.innerText = stock.code;
    td.setAttribute('class', 'code');
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText = stock.eps.toLocaleString('vi-vn');
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText = stock.price_rating_1.toLocaleString('vi-vn');
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText = stock.price_rating_2.toLocaleString('vi-vn');
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText = stock.safe_price.toLocaleString('vi-vn');
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText = priceStocks[stock.code].toLocaleString('vi-vn');
    td.setAttribute('id', stock.code);
    if (priceStocks[stock.code] <= stock.safe_price) {
      td.setAttribute('class', 'green');
    } else if (priceStocks[stock.code] > stock.price_rating_2) {
      td.setAttribute('class', 'red');
    } else {
      td.setAttribute('class', 'orange');
    }
    tr.appendChild(td);

    table.appendChild(tr);
  }
}

async function updatePrice() {
  const priceStocks = await getPrice();
  const stocks = await getStock();
  let pricetd;
  for (const stock of stocks) {
    pricetd = document.getElementById(stock.code);
    if (pricetd) {
      pricetd.innerText = priceStocks[stock.code].toLocaleString('vi-vn');
      if (priceStocks[stocks.code] <= stock.safe_price) {
        pricetd.setAttribute('class', 'green');
      } else if (priceStocks[stock.code] > stock.price_rating_2) {
        pricetd.setAttribute('class', 'red');
      } else {
        pricetd.setAttribute('class', 'orange');
      }
    }
  }
}
addRow();
setInterval(updatePrice, 3000);
