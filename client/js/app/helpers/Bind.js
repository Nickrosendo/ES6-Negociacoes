'use strict';

System.register(['../services/ProxyFactory'], function (_export, _context) {
  "use strict";

  var ProxyFactory, Bind;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_servicesProxyFactory) {
      ProxyFactory = _servicesProxyFactory.ProxyFactory;
    }],
    execute: function () {
      _export('Bind', Bind = function Bind(model, view, props) {
        _classCallCheck(this, Bind);

        var proxy = ProxyFactory.create(model, props, function (model, classe) {
          return view.update(model, classe);
        });
        return proxy;
      });

      _export('Bind', Bind);
    }
  };
});
//# sourceMappingURL=Bind.js.map