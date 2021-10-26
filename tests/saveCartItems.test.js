const saveCartItems = require('../helpers/saveCartItems');

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: jest.fn(),
  },
});

describe('4 - Teste a função saveCartItems', () => {
  it('verifica se ao chamar a função "saveCartItems", com o argumento "<ol><li>item</li></ol>", o método localStorage.setItem é chamado:', () => {
    saveCartItems('<ol><li>item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('verifica se ao chamar a função "saveCartItems", com o argumento "<ol><li>item</li></ol>", o método localStorage.setItem é chamado com os parâmetros "cartItems" e o valor passado como argumento:', () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>item</li></ol>');
  });
});
