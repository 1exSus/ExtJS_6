Ext.define('App.store.Products', {
  extend: 'Ext.data.Store',
  model: 'App.model.Product',
  data: [
    { id: 1, name: 'Ноутбук', description: 'Игровой ноутбук', price: 1500.99, quantity: 5 },
    { id: 2, name: 'Мышь', description: 'Беспроводная мышь', price: 25.5, quantity: 0 },
    {
      id: 3,
      name: 'Клавиатура',
      description: 'Механическая клавиатура',
      price: 89.99,
      quantity: 12,
    },
    { id: 4, name: 'Монитор', description: '27-дюймовый монитор', price: 299.99, quantity: 3 },
    { id: 5, name: 'Наушники', description: 'Беспроводные наушники', price: 149.99, quantity: 0 },
  ],
});
