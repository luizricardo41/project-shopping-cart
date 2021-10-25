const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('ao executar a função fetchProducts, verifica se a função fetch foi chamada', () => {
    fetchProducts();
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamar a função fetchProducts com argumento "computador", verifica se fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('ao chamar fetchProducts("computador"), verifica se o retorno é igual ao objeto "computadorSearch"', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });
  it('verifica se ao chamar a função sem argumento, retorna um erro com a mensagem "You must provide an url"', async () => { 
  const verifyError = await fetchProducts();
  expect(verifyError).toEqual(new Error('You must provide an url'));
  });
});
