Ext.define('App.view.main.MainPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.mainpanel',

  title: 'Панель управления товарами',
  layout: 'border',

  initComponent: function () {
    this.items = [
      {
        region: 'north',
        height: 50,
        bodyPadding: 10,
        items: [this.createToolbar()],
      },
      {
        region: 'center',
        xtype: 'tabpanel',
        reference: 'mainTabPanel',
        items: [this.createWelcomeTab()],
      },
    ];

    this.callParent(arguments);
  },

  createToolbar: function () {
    return {
      xtype: 'toolbar',
      items: [
        {
          text: 'Товары',
          iconCls: 'x-fa fa-cubes',
          handler: this.onProductsClick,
          scope: this,
        },
        {
          text: 'Выход',
          iconCls: 'x-fa fa-sign-out',
          handler: this.onLogoutClick,
          scope: this,
        },
      ],
    };
  },

  createWelcomeTab: function () {
    return {
      title: 'Добро пожаловать',
      html: '<div style="padding: 20px; text-align: center;"><h1>Добро пожаловать в систему</h1><p>Используйте кнопки выше для навигации</p></div>',
    };
  },

  onProductsClick: function () {
    this.fireEvent('showProducts');
  },

  onLogoutClick: function () {
    App.controller.AuthController.logout();
    this.fireEvent('logout');
  },
});
