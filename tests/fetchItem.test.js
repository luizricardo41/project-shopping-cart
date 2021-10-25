const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('ao executar a função fetchItem com o argumento "MLB1615760527", verifica se a função fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamar a função fetchItem com argumento "MLB1615760527", verifica se fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('ao chamar fetchItem("MLB1615760527"), verifica se o retorno é igual ao objeto "item"', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });
  it('verifica se ao chamar a função sem argumento, retorna um erro com a mensagem "You must provide an url"', async () => { 
    const verifyError = await fetchItem();
    expect(verifyError).toEqual(new Error('You must provide an url'));
    });
});
