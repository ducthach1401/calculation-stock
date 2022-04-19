const API_URL = 'http://localhost:5000';

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
  for (const stock of stocks) {
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.innerText = stock.code;
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
    td.setAttribute('id', stock);
    tr.appendChild(td);

    table.appendChild(tr);
  }
}

async function updatePrice() {
  const priceStocks = await getPrice();
  let pricetd;
  for (let key in priceStocks) {
    pricetd = document.getElementById(key);
    console.log(key);
    pricetd.innerText = priceStocks[key].toLocaleString('vi-vn');
  }
}
addRow();
setInterval(updatePrice, 3000);
