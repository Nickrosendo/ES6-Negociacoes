"use strict";

System.register([], function (_export, _context) {
	"use strict";

	var _createClass, NegociacaoList;

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

			_export("NegociacaoList", NegociacaoList = function () {
				function NegociacaoList() {
					_classCallCheck(this, NegociacaoList);

					this._negociacoes = [];
				}

				_createClass(NegociacaoList, [{
					key: "add",
					value: function add(negociacao) {

						this._negociacoes.push(negociacao);
					}
				}, {
					key: "clear",
					value: function clear() {

						this._negociacoes = [];
					}
				}, {
					key: "ordena",
					value: function ordena(criterio) {
						this._negociacoes.sort(criterio);
					}
				}, {
					key: "ordenaReverso",
					value: function ordenaReverso() {
						this._negociacoes.reverse();
					}
				}, {
					key: "volume",
					get: function get() {
						return this._negociacoes.reduce(function (total, n) {
							return total + n.volume;
						}, 0);
					}
				}, {
					key: "negociacao",
					get: function get() {
						return [].concat(this._negociacoes);
					}
				}]);

				return NegociacaoList;
			}());

			_export("NegociacaoList", NegociacaoList);
		}
	};
});
//# sourceMappingURL=NegociacaoList.js.map