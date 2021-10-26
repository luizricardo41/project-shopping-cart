const getSavedCartItems = () => {
  let arraySaved = localStorage.getItem('cartItems');
  return arraySaved;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
