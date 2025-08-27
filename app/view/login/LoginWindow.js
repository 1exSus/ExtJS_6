Ext.define('App.view.login.LoginWindow', {
  extend: 'Ext.window.Window',
  alias: 'widget.loginwindow',

  title: 'Вход в систему',
  width: 350,
  height: CSSMathMax,
  closable: false,
  resizable: false,
  modal: true,
  bodyPadding: 10,

  initComponent: function () {
    this.items = [this.createLoginForm()];
    this.callParent(arguments);
  },

  createLoginForm: function () {
    return {
      xtype: 'form',
      reference: 'form',
      bodyPadding: 10,
      defaults: {
        xtype: 'textfield',
        allowBlank: false,
        msgTarget: 'under',
        anchor: '100%',
        labelWidth: 80,
      },
      items: [
        {
          fieldLabel: 'Логин',
          name: 'login',
          inputAttrTpl: 'autocomplete="off"',
          value: '',
        },
        {
          fieldLabel: 'Пароль',
          name: 'password',
          inputType: 'password',
          inputAttrTpl: 'autocomplete="new-password"',
          value: '',
        },
      ],
      buttons: [
        {
          text: 'Вход',
          formBind: true,
          handler: this.onLoginSubmit,
          scope: this,
        },
      ],
    };
  },

  onLoginSubmit: function () {
    var form = this.down('form').getForm();
    if (form.isValid()) {
      var values = form.getValues();
      if (App.controller.AuthController.login(values.login, values.password)) {
        this.hide();
        this.fireEvent('loginSuccess');
      } else {
        Ext.Msg.alert('Ошибка', 'Неверный логин или пароль');
      }
    }
  },
});
