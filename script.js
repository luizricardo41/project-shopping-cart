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

// const createElementPriceTotal = () => {
//   const createSpan = document.createElement('span');
//   createSpan.className = 'total-price';
//   return createSpan;
// };

// function updateValues(totalPrice) {
//   const verifyItem = document.querySelector('.total-price');
//   if (!verifyItem) {
//     const selectLocal = document.querySelector('.cart');
//     const spanElement = createElementPriceTotal();
//     selectLocal.appendChild(spanElement);
//     document.getElementsByClassName('total-price').innerText = `${totalPrice}`;
//   } else {
//     verifyItem.innerText = `${totalPrice}`;
//   }
// }

// const classDivPrices = '.total-price';

// const subPriceTotal = async (id) => {
//   const verifyItem = document.querySelector(classDivPrices);
//   const itemSelected = await fetchItem(id);
//   const priceItem = itemSelected.price;
//   const priceTotal = verifyItem.innerText;
//   const convertString = parseFloat(priceTotal);
//   const subPrices = (convertString - priceItem).toFixed(2);
//   verifyItem.innerText = `${subPrices}`;
// };

const removeItemsStorage = (textItem) => {
  const arraySaved = localStorage.getItem('cartItems');
  const removeId = `${textItem.slice(5, 19)}`;
  const arrayStorage = arraySaved.split(',');
  const findItemSaved = arrayStorage.find((value) => removeId.includes(value));
  const indexOfId = arrayStorage.indexOf(findItemSaved);
  arrayStorage.splice(indexOfId, 1);
  // subPriceTotal(removeId);
  saveCartItems(arrayStorage);
};

function cartItemClickListener(event) {
  const removeItem = event.target;
  removeItem.parentNode.removeChild(removeItem);
  const textItem = removeItem.innerText;
  removeItemsStorage(textItem);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const searchSku = async (skuItem) => {
  const itemSku = await fetchItem(skuItem);
  console.log(skuItem);
  const objectItem = {
    sku: itemSku.id,
    name: itemSku.title,
    salePrice: itemSku.price,
  };
  const createOlElements = document.querySelector('.cart__items');
  const liElements = createCartItemElement(objectItem);
  createOlElements.appendChild(liElements);
};

// const sumPriceTotal = async (id) => {
//   const itemSelected = await fetchItem(id);
//   const priceItem = itemSelected.price;
//   const verifyItem = document.querySelector(classDivPrices);
//   if (!verifyItem) {
//     const selectLocal = document.querySelector('.cart');
//     const spanElement = createElementPriceTotal();
//     selectLocal.appendChild(spanElement);
//     const sumElement = document.querySelector(classDivPrices);
//     sumElement.innerText = `${priceItem}`;
//   } else {
//     const priceTotal = verifyItem.innerText;
//     const convertString = parseFloat(priceTotal);
//     const sumPrices = (convertString + priceItem).toFixed(2);
//     verifyItem.innerText = `${sumPrices}`;
//   }
// };

const saveCartInStorage = (id) => {
  let arrayItems = [];
  const verifyLocalStorage = localStorage.getItem('cartItems');
  if (!verifyLocalStorage) {
    arrayItems.push(id);
    saveCartItems(arrayItems);
  } else {
    arrayItems = verifyLocalStorage.split(',');
    arrayItems.push(id);
    saveCartItems(arrayItems);
  }
};

const findSKU = () => {
  const skuItem = document.querySelector('#selected');
  const idItem = getSkuFromProductItem(skuItem);
  // sumPriceTotal(idItem);
  saveCartInStorage(idItem);
  searchSku(idItem);
};

const addId = (event) => {
  const clickItem = event.target;
  clickItem.parentNode.id = ('selected');
  findSKU();
  clickItem.parentNode.id = '';
};

function initializeButtons() {
  const testeButtons = document.getElementsByClassName('item__add');  
  for (i = 0; i < testeButtons.length; i += 1) {
    testeButtons[i].addEventListener('click', addId);
  } 
}

const receiveDataSaved = () => {
  // const priceSaved = localStorage.getItem('prices');
  const arraySaved = getSavedCartItems();
  if (arraySaved !== undefined) {
    const arrayStorage = arraySaved.split(',');
    arrayStorage.forEach((element) => {
      searchSku(element);
    });
    // const selectLocal = document.querySelector('.cart');
    // const spanElement = createElementPriceTotal();
    // selectLocal.appendChild(spanElement);
    // const sumPrice = document.querySelector('.total-price');
    // sumPrice.innerText = `${priceSaved}`;
  }
};

const clearCartItems = () => {
  const cartItems = document.querySelectorAll('.cart__item');
  const parentCartItems = document.querySelector('.cart__items');
  cartItems.forEach((element) => {
    parentCartItems.removeChild(element);
  });
  localStorage.clear();
};

const clearButton = () => {
  const pushButton = document.querySelector('.empty-cart');
  pushButton.addEventListener('click', clearCartItems);
};

const implementData = async (product) => {
  const dataAPI = await fetchProducts(product);
  const createSectionElements = document.querySelector('.items');
  dataAPI.results.forEach((element) => {
    const objectElement = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const sectionElements = createProductItemElement(objectElement);
    createSectionElements.appendChild(sectionElements);
  });
  clearButton();
  initializeButtons();
  receiveDataSaved();
};

window.onload = () => {
  implementData('computador');
};
