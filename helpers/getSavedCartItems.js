const getSavedCartItems = () => {
  const arraySaved = localStorage.getItem('cartItems');
  if (arraySaved !== '') {
    return arraySaved;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
