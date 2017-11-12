'use strict';

System.register(['./controllers/NegociacaoController', './polyfills/fetch'], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      currentInstance = _controllersNegociacaoController.currentInstance;
    }, function (_polyfillsFetch) {}],
    execute: function () {
      negociacaoController = new currentInstance();


      document.querySelector('.form').onsubmit = negociacaoController.add.bind(negociacaoController);
      document.querySelector('#btn_apagar').onclick = negociacaoController.apaga.bind(negociacaoController);
      document.querySelector('#importarTodas').onclick = negociacaoController.importaAllNegociacoes.bind(negociacaoController);
      document.querySelector('#importarEssaSemana').onclick = negociacaoController.importaEssaSemanaNegociacoes.bind(negociacaoController);
      document.querySelector('#importarSemanaPassada').onclick = negociacaoController.importaSemanaPassadaNegociacoes.bind(negociacaoController);
      document.querySelector('#importarSemanaRetrasada').onclick = negociacaoController.importaSemanaRetrasadaNegociacoes.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map