const fetchItem = (id) => {
  const result = fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((data) => data.json())
  .catch((error) => error);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
