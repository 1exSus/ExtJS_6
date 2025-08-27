Ext.define('App.view.products.ProductCardWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.productcardwindow',

  width: 400,
  height: 350,
  layout: 'fit',
  modal: true,

  initComponent: function () {
    this.items = [this.createForm()];
    this.callParent(arguments);
  },

  createForm: function () {
    return {
      xtype: 'form',
      reference: 'form',
      bodyPadding: 10,
      defaults: {
        anchor: '100%',
        labelWidth: 80,
      },
      items: [
        {
          xtype: 'displayfield',
          fieldLabel: 'ID',
          name: 'id',
        },
        {
          xtype: 'displayfield',
          fieldLabel: 'Имя',
          name: 'name',
        },
        {
          xtype: 'displayfield',
          fieldLabel: 'Описание',
          name: 'description',
        },
        {
          xtype: 'numberfield',
          fieldLabel: 'Цена',
          name: 'price',
          minValue: 0,
          decimalPrecision: 2,
          step: 5,
          keyNavEnabled: true,
          mouseWheelEnabled: true,
          allowDecimals: true,
          hideTrigger: false,
        },
        {
          xtype: 'numberfield',
          fieldLabel: 'Кол-во',
          name: 'quantity',
          minValue: 0,
          step: 1,
          keyNavEnabled: true,
          mouseWheelEnabled: true,
          allowDecimals: false,
          hideTrigger: false,
        },
      ],
      buttons: [
        {
          text: 'Отмена',
          handler: this.onCancel,
          scope: this,
        },
        {
          text: 'Сохранить',
          formBind: true,
          handler: this.onSave,
          scope: this,
        },
      ],
    };
  },

  onCancel: function () {
    this.close();
  },

  onSave: function () {
    var form = this.down('form');
    if (form.isValid()) {
      var values = form.getValues();
      var record = form.getRecord();

      var priceChanged = parseFloat(values.price) !== record.get('price');
      var quantityChanged = parseInt(values.quantity) !== record.get('quantity');

      if (priceChanged || quantityChanged) {
        Ext.Msg.confirm(
          'Сохранение',
          'Сохранить изменения?',
          function (btn) {
            if (btn === 'yes') {
              record.set('price', parseFloat(values.price));
              record.set('quantity', parseInt(values.quantity));
              this.close();
            }
          },
          this,
        );
      } else {
        this.close();
      }
    }
  },

  loadRecord: function (record) {
    this.setTitle('Карточка товара: ' + record.get('name'));
    this.down('form').getForm().loadRecord(record);
  },
});
