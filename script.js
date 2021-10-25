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

// function cartItemClickListener(event) {
//   // coloque seu código aqui
// }

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.addEventListener('click', cartItemClickListener);
  return li;
}

const searchSku = async (skuItem) => {
  const itemSku = await fetchItem(skuItem);
  const objectItem = {
    sku: itemSku.id,
    name: itemSku.title,
    salePrice: itemSku.price,
  };
  const createOlElements = document.querySelector('.cart__items');
  const liElements = createCartItemElement(objectItem);
  createOlElements.appendChild(liElements);
};

const findSKU = () => {
  const skuItem = document.querySelector('#selected');
  const idItem = getSkuFromProductItem(skuItem);
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
  initializeButtons();
};

window.onload = () => {
  implementData('computador');
};
