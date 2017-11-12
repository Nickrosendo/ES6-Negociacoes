'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, stores, version, nomeDb, connection, close, ConnectionFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      stores = ['negociacoes'];
      version = 1;
      nomeDb = 'negociacoesDb';
      connection = null;
      close = null;

      _export('ConnectionFactory', ConnectionFactory = function () {
        function ConnectionFactory() {
          _classCallCheck(this, ConnectionFactory);

          throw new Error("Não é possível instanciar a classe ConnectionFactory");
        }

        _createClass(ConnectionFactory, null, [{
          key: 'getConnection',
          value: function getConnection() {

            return new Promise(function (resolve, reject) {

              var openrequest = window.indexedDB.open(nomeDb, version);

              openrequest.onupgradeneeded = function (e) {
                ConnectionFactory._createStore(e.target.result);
              };

              openrequest.onsuccess = function (e) {
                if (!connection) {

                  connection = e.target.result;
                  close = connection.close.bind(connection);
                  connection.close = function () {
                    throw new Error("Não é possível fechar a conexão diretamente");
                  };
                }
                resolve(connection);
              };

              openrequest.onerror = function (e) {
                console.log('erro connectionFactory:', e.target.error);
                reject(e.target.error.name);
              };
            });
          }
        }, {
          key: '_createStore',
          value: function _createStore(connection) {
            stores.forEach(function (store) {
              if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

              connection.createObjectStore(store, { autoIncrement: true });
            });
          }
        }, {
          key: 'closeConnection',
          value: function closeConnection() {

            if (connection) {
              close();
              connection = null;
            }
          }
        }]);

        return ConnectionFactory;
      }());

      _export('ConnectionFactory', ConnectionFactory);
    }
  };
});
//# sourceMappingURL=ConnectionFactory.js.map