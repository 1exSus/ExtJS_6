Ext.define('App.controller.AuthController', {
  singleton: true,
  isAuthenticated: false,

  login: function (login, password) {
    if (login === 'admin' && password === 'padmin') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  },

  logout: function () {
    this.isAuthenticated = false;
  },

  isLoggedIn: function () {
    return this.isAuthenticated;
  },
});
