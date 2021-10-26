const getSavedCartItems = require('../helpers/getSavedCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
  },
});

describe('4 - Teste a função getSavedCartItems', () => {
  it('verifica se ao chamar a função "getSavedCartItems", o método localStorage.getItem é chamado:', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('verifica se ao chamar a função "getSavedCartItems", o método localStorage.getItem é chamado com o parâmetro "cartItems":', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
