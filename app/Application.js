Ext.define('App.Application', {
  extend: 'Ext.app.Application',

  viewport: null,
  loginWindow: null,

  launch: function () {
    this.viewport = Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [],
    });

    this.initValidators();
    this.showLogin();
  },

  initValidators: function () {
    Ext.apply(Ext.form.field.VTypes, {
      price: function (val, field) {
        return /^\d+(\.\d{1,2})?$/.test(val) && parseFloat(val) >= 0;
      },
      priceText: 'Цена должна быть положительным числом с максимум 2 знаками после запятой',

      quantity: function (val, field) {
        return /^\d+$/.test(val) && parseInt(val) >= 0;
      },
      quantityText: 'Количество должно быть целым положительным числом',
    });
  },

  showLogin: function () {
    if (this.loginWindow) {
      this.loginWindow.destroy();
    }

    this.loginWindow = Ext.create('App.view.login.LoginWindow');
    this.loginWindow.on('loginSuccess', this.onLoginSuccess, this);
    this.loginWindow.show();
  },

  onLoginSuccess: function () {
    this.showMainApplication();
  },

  showMainApplication: function () {
    this.viewport.removeAll();

    var mainPanel = Ext.create('App.view.main.MainPanel');
    mainPanel.on('showProducts', this.onShowProducts, this);
    mainPanel.on('logout', this.onLogout, this);

    this.viewport.add(mainPanel);
  },

  onShowProducts: function () {
    if (!App.controller.AuthController.isLoggedIn()) {
      this.showLogin();
      return;
    }

    var mainPanel = this.viewport.down('mainpanel');
    var tabPanel = mainPanel.down('tabpanel');

    var productsGrid = Ext.create('App.view.products.ProductsGrid');
    productsGrid.on('showProductCard', this.onShowProductCard, this);

    var tab = tabPanel.add({
      title: 'Товары',
      layout: 'fit',
      closable: true,
      items: [productsGrid],
    });

    tabPanel.setActiveTab(tab);
  },

  onShowProductCard: function (record) {
    if (!App.controller.AuthController.isLoggedIn()) {
      this.showLogin();
      return;
    }

    var cardWindow = Ext.create('App.view.products.ProductCardWindow');
    cardWindow.loadRecord(record);
    cardWindow.show();
  },

  onLogout: function () {
    this.showLogin();
  },
});
