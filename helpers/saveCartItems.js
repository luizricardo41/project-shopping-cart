const saveCartItems = (arrayItems) => {
  const keyItems = 'cartItems';
  localStorage.setItem(keyItems, arrayItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
