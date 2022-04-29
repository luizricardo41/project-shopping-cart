function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function insertTotalValue(total) {
  const formatValue = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const heading = document.querySelector('.total-price');
  heading.innerText = `Total: ${formatValue}`;
}

function sumTotalPrice(price) {
  let totalValue = 0;
  const totalSave = localStorage.getItem('total');
  if (totalSave === '') {
    totalValue += Number(price);
  } else {
    totalValue = (Number(price) + Number(totalSave)).toFixed(2);
  }  
  localStorage.setItem('total', totalValue);
  insertTotalValue(Number(totalValue));
}

function removeSaveItems(price) {
  const saveItems = JSON.parse(getSavedCartItems());
  const indexProduct = saveItems.findIndex((item) => item.salePrice === Number(price));
  console.log(indexProduct);
  saveItems.splice(indexProduct, 1);
  saveCartItems(JSON.stringify(saveItems));
  console.log(saveItems);
}

function cartItemClickListener(event) {
  const liCart = event.target;
  liCart.parentNode.removeChild(liCart);
  removeSaveItems(`${event.target.title}`);
  sumTotalPrice(`-${event.target.title}`);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.title = salePrice;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function saveProducts(object) {
  let arrayItems = [];
  const saveItems = getSavedCartItems();
  if (!saveItems) {
    arrayItems.push(object);
  } else {
    arrayItems = JSON.parse(saveItems);
    arrayItems.push(object);
  }
  saveCartItems(JSON.stringify(arrayItems));
}

async function findProduct() {
  const createLiCart = document.querySelector('.cart__items');
  const product = document.querySelector('#selected');
  const sku = getSkuFromProductItem(product);
  const item = await fetchItem(sku);
  const objItem = {
    sku,
    name: item.title,
    salePrice: item.price,
  };

  const liCart = createCartItemElement(objItem);
  createLiCart.appendChild(liCart);

  saveProducts(objItem);
  sumTotalPrice(`${item.price}`);
}

function addIdSelected(event) {
  const el = event.target.parentNode;
  el.id = 'selected';
  findProduct();
  el.id = '';
}

function initializeButtons() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((btn) => {
    btn.addEventListener('click', addIdSelected);
  });
}

function verifySaveData() {
  const saveItems = getSavedCartItems();
  const items = JSON.parse(saveItems);
  const createLiCart = document.querySelector('.cart__items');

  if (saveItems) {
    items.forEach((item) => {
      const liCart = createCartItemElement(item);
      createLiCart.appendChild(liCart);
    });
  }
}

async function implementData(data) {
  const createSectionItems = document.querySelector('.items');
  const { results } = await fetchProducts(data);
  results.forEach((item) => {
    const objectItems = {
      name: item.title,
      sku: item.id,
      image: item.thumbnail,
    };
    const sectionItems = createProductItemElement(objectItems);
    createSectionItems.appendChild(sectionItems);
  });
  initializeButtons();
  verifySaveData();
  sumTotalPrice('0');
}

function removeItemsCart() {
  const allItems = document.querySelectorAll('.cart__item');
  const parentItem = document.getElementsByTagName('ol');
  allItems.forEach((item) => {
    parentItem[0].removeChild(item);
  });
  localStorage.clear();
  sumTotalPrice('0');
}

function removeLoading() {
  const header = document.querySelector('.header');
  const loadingMessage = document.querySelector('.loading');
  header.removeChild(loadingMessage);
  const clearCart = document.querySelector('.empty-cart');
  clearCart.addEventListener('click', removeItemsCart);
}

window.onload = () => {
  implementData('computador');
  removeLoading();
};
