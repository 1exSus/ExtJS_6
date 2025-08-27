Ext.define('App.view.products.ProductsGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.productsgrid',

  title: 'Товары',
  store: Ext.create('App.store.Products'),

  initComponent: function () {
    this.columns = this.createColumns();
    this.dockedItems = [this.createToolbar()];
    this.callParent(arguments);
  },

  createColumns: function () {
    return [
      {
        text: 'ID',
        dataIndex: 'id',
        width: 50,
        sortable: false,
        menuDisabled: true,
      },
      {
        text: 'Имя',
        dataIndex: 'name',
        width: 120,
        sortable: false,
        menuDisabled: true,
        renderer: function (value) {
          return (
            '<span style="color: blue; cursor: pointer; text-decoration: underline;">' +
            value +
            '</span>'
          );
        },
        listeners: {
          click: this.onProductNameClick,
          scope: this,
        },
      },
      {
        text: 'Описание',
        dataIndex: 'description',
        flex: 1,
        sortable: false,
        menuDisabled: true,
      },
      {
        text: 'Цена',
        dataIndex: 'price',
        width: 80,
        menuDisabled: true,
        renderer: function (value) {
          return '$' + value.toFixed(2);
        },
      },
      {
        text: 'Кол-во',
        dataIndex: 'quantity',
        width: 80,
        menuDisabled: true,
        renderer: function (value, meta) {
          if (value === 0) {
            meta.style = 'background-color: #ffcccc; color: #ff0000; font-weight: bold;';
          }
          return value;
        },
      },
    ];
  },

  createToolbar: function () {
    return {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        {
          xtype: 'textfield',
          fieldLabel: 'ID товара',
          labelWidth: 70,
          enableKeyEvents: true,
          listeners: {
            keypress: function (field, e) {
              if (e.getKey() === e.ENTER) this.applyFilters();
            },
            scope: this,
          },
        },
        {
          xtype: 'textfield',
          fieldLabel: 'Описание',
          labelWidth: 70,
          enableKeyEvents: true,
          listeners: {
            keypress: function (field, e) {
              if (e.getKey() === e.ENTER) this.applyFilters();
            },
            scope: this,
          },
        },
        {
          text: 'Сбросить',
          iconCls: 'x-fa fa-refresh',
          handler: this.onResetClick,
          scope: this,
        },
      ],
    };
  },

  onProductNameClick: function (grid, cell, rowIndex, colIndex, e) {
    if (e.target.tagName === 'SPAN') {
      this.fireEvent('showProductCard', grid.getStore().getAt(rowIndex));
    }
  },

  applyFilters: function () {
    var toolbar = this.down('toolbar');
    var idFilter = toolbar.down('textfield[fieldLabel="ID товара"]').getValue();
    var descFilter = toolbar.down('textfield[fieldLabel="Описание"]').getValue();

    var filters = [];

    if (idFilter) {
      filters.push({
        property: 'id',
        value: parseInt(idFilter),
        exactMatch: true,
      });
    }

    if (descFilter) {
      filters.push({
        property: 'description',
        value: descFilter,
        anyMatch: true,
      });
    }

    this.getStore().clearFilter();
    if (filters.length > 0) {
      this.getStore().filter(filters);
    }
  },

  onResetClick: function () {
    var toolbar = this.down('toolbar');
    toolbar.down('textfield[fieldLabel="ID товара"]').reset();
    toolbar.down('textfield[fieldLabel="Описание"]').reset();
    this.getStore().clearFilter();
  },
});
