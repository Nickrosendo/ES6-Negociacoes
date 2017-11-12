import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfills/fetch';

let negociacaoController = new currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.add.bind(negociacaoController);
document.querySelector('#btn_apagar').onclick = negociacaoController.apaga.bind(negociacaoController);
document.querySelector('#importarTodas').onclick = negociacaoController.importaAllNegociacoes.bind(negociacaoController);
document.querySelector('#importarEssaSemana').onclick = negociacaoController.importaEssaSemanaNegociacoes.bind(negociacaoController);
document.querySelector('#importarSemanaPassada').onclick = negociacaoController.importaSemanaPassadaNegociacoes.bind(negociacaoController);
document.querySelector('#importarSemanaRetrasada').onclick = negociacaoController.importaSemanaRetrasadaNegociacoes.bind(negociacaoController);

