'use strict';

System.register(['../services/NegociacaoService', '../views/NegociacoesView', '../views/MensagemView', '../models/NegociacaoList', '../models/Mensagem', '../helpers/Bind', '../helpers/DateHelper', '../models/Negociacao'], function (_export, _context) {
	"use strict";

	var NegociacaoService, NegociacoesView, MensagemView, NegociacaoList, Mensagem, Bind, DateHelper, Negociacao, _createClass, NegociacaoController, negociacaoController;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_servicesNegociacaoService) {
			NegociacaoService = _servicesNegociacaoService.NegociacaoService;
		}, function (_viewsNegociacoesView) {
			NegociacoesView = _viewsNegociacoesView.NegociacoesView;
		}, function (_viewsMensagemView) {
			MensagemView = _viewsMensagemView.MensagemView;
		}, function (_modelsNegociacaoList) {
			NegociacaoList = _modelsNegociacaoList.NegociacaoList;
		}, function (_modelsMensagem) {
			Mensagem = _modelsMensagem.Mensagem;
		}, function (_helpersBind) {
			Bind = _helpersBind.Bind;
		}, function (_helpersDateHelper) {
			DateHelper = _helpersDateHelper.DateHelper;
		}, function (_modelsNegociacao) {
			Negociacao = _modelsNegociacao.Negociacao;
		}],
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

			NegociacaoController = function () {
				function NegociacaoController() {
					_classCallCheck(this, NegociacaoController);

					var $ = document.querySelector.bind(document);
					this._data = $("#data");
					this._quantidade = $("#quantidade");
					this._valor = $("#valor");
					this._negociacaoView = new NegociacoesView($('#negociacaoView'));
					this._listaNegociacoes = new Bind(new NegociacaoList(), this._negociacaoView, ['add', 'clear', 'ordena', 'ordenaReverso']);
					this._mensagemView = new MensagemView($('#mensagemView'));
					this._mensagem = new Bind(new Mensagem(), this._mensagemView, ['texto', 'classe']);
					this._ordemAtual = '';
					this._service = new NegociacaoService();
					this._init();
				}

				_createClass(NegociacaoController, [{
					key: '_init',
					value: function _init() {
						var _this = this;

						this._service.lista().then(function (negociacoes) {
							return negociacoes.forEach(function (negociacao) {
								_this._listaNegociacoes.add(negociacao);
								_this._mensagem.texto = "Negociações obtidas com sucesso";
								_this._mensagem.classe = "alert alert-success";
							});
						}).catch(function (erro) {
							_this._mensagem.texto = erro;
							_this._mensagem.classe = "alert alert-danger";
						});
					}
				}, {
					key: 'add',
					value: function add(event) {
						var _this2 = this;

						event.preventDefault();
						var negociacao = this._criaNegociacao();

						this._service.cadastra(negociacao).then(function (mensagem) {
							_this2._listaNegociacoes.add(negociacao);
							_this2._mensagem.texto = mensagem;
							_this2._mensagem.classe = "alert alert-success";
							_this2._limpaForm();
						}).catch(function (erro) {
							_this2._mensagem.texto = erro;
							_this2._mensagem.classe = "alert alert-danger";
						});
					}
				}, {
					key: 'importaAllNegociacoes',
					value: function importaAllNegociacoes() {
						var _this3 = this;

						this._service.importa(this._listaNegociacoes.negociacao).then(function (negociacoes) {
							return negociacoes.forEach(function (negociacao) {
								_this3._listaNegociacoes.add(negociacao);
								_this3._mensagem.texto = "Negociações importadas com sucesso";
								_this3._mensagem.classe = "alert alert-success";
							});
						}).catch(function (erro) {
							_this3._mensagem.texto = erro;
							_this3._mensagem.classe = "alert alert-danger";
						});
					}
				}, {
					key: 'importaEssaSemanaNegociacoes',
					value: function importaEssaSemanaNegociacoes() {
						var _this4 = this;

						this._service.getNegociacaoSemana().then(function (negociacoes) {
							negociacoes.forEach(function (negociacao) {
								return _this4._listaNegociacoes.add(negociacao);
							});
							_this4._mensagem.texto = "Negociações da semana importadas com sucesso";
							_this4._mensagem.classe = "alert alert-success";
						}).catch(function (erro) {
							_this4._mensagem.texto = erro;
							_this4._mensagem.classe = "alert alert-danger";
						});
					}
				}, {
					key: 'importaSemanaPassadaNegociacoes',
					value: function importaSemanaPassadaNegociacoes() {
						var _this5 = this;

						this._service.getNegociacaoSemanaPassada().then(function (negociacoes) {
							negociacoes.forEach(function (negociacao) {
								return _this5._listaNegociacoes.add(negociacao);
							});
							_this5._mensagem.texto = "Negociações da semana passada importadas com sucesso";
							_this5._mensagem.classe = "alert alert-success";
						}).catch(function (erro) {
							_this5._mensagem.texto = erro;
							_this5._mensagem.classe = "alert alert-danger";
						});
					}
				}, {
					key: 'importaSemanaRetrasadaNegociacoes',
					value: function importaSemanaRetrasadaNegociacoes() {
						var _this6 = this;

						this._service.getNegociacaoSemanaRetrasada().then(function (negociacoes) {
							negociacoes.forEach(function (negociacao) {
								return _this6._listaNegociacoes.add(negociacao);
							});
							_this6._mensagem.texto = "Negociações da semana retrasada importadas com sucesso";
							_this6._mensagem.classe = "alert alert-success";
						}).catch(function (erro) {
							_this6._mensagem.texto = erro;
							_this6._mensagem.classe = "alert alert-danger";
						});
					}
				}, {
					key: 'apaga',
					value: function apaga() {
						var _this7 = this;

						this._service.apaga().then(function (mensagem) {
							_this7._mensagem.texto = mensagem;
							_this7._mensagem.classe = "alert alert-warning";
							_this7._listaNegociacoes.clear();
						}).catch(function (erro) {
							_this7._mensagem.texto = erro;
							_this7._mensagem.classe = "alert alert-danger";
						});
					}
				}, {
					key: 'ordena',
					value: function ordena(coluna) {
						if (this._ordemAtual == coluna) {
							this._listaNegociacoes.ordenaReverso();
						} else {
							this._listaNegociacoes.ordena(function (a, b) {
								return a[coluna] - b[coluna];
							});
						}
						this._ordemAtual = coluna;
					}
				}, {
					key: '_criaNegociacao',
					value: function _criaNegociacao() {
						return new Negociacao(DateHelper.StringToDate(this._data.value), parseInt(this._quantidade.value), parseFloat(this._valor.value));
					}
				}, {
					key: '_limpaForm',
					value: function _limpaForm() {

						this._data.value = "";
						this._quantidade.value = 1;
						this._valor.value = 0.0;

						this._data.focus();
					}
				}]);

				return NegociacaoController;
			}();

			negociacaoController = new NegociacaoController();
			function currentInstance() {
				return negociacaoController;
			}

			_export('currentInstance', currentInstance);
		}
	};
});
//# sourceMappingURL=NegociacaoController.js.map