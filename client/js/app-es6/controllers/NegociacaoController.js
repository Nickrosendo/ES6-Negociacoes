import { NegociacaoService } from '../services/NegociacaoService'
import { NegociacoesView } from '../views/NegociacoesView'
import { MensagemView } from '../views/MensagemView'
import { NegociacaoList } from '../models/NegociacaoList'
import { Mensagem } from '../models/Mensagem'
import { Bind } from '../helpers/Bind' 
import { DateHelper } from '../helpers/DateHelper' 
import { Negociacao } from '../models/Negociacao'


class NegociacaoController {

	constructor() {
		let $ = document.querySelector.bind(document);
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

	_init() {

		this._service
			.lista()
			.then(negociacoes =>
				negociacoes.forEach(negociacao => {
					this._listaNegociacoes.add(negociacao)
					this._mensagem.texto = "Negociações obtidas com sucesso";
					this._mensagem.classe = "alert alert-success";
				})
			)
			.catch(erro => {
				this._mensagem.texto = erro;
				this._mensagem.classe = "alert alert-danger";
			})
	}

	add(event) {
		event.preventDefault();
		let negociacao = this._criaNegociacao();


		this._service
			.cadastra(negociacao)
			.then(mensagem => {
				this._listaNegociacoes.add(negociacao);
				this._mensagem.texto = mensagem;
				this._mensagem.classe = "alert alert-success";
				this._limpaForm();
			})
			.catch(erro => {
				this._mensagem.texto = erro;
				this._mensagem.classe = "alert alert-danger";
			})
	}

	importaAllNegociacoes() {
		this._service
			.importa(this._listaNegociacoes.negociacao)
			.then(negociacoes =>	
				negociacoes.forEach( negociacao => {
					this._listaNegociacoes.add(negociacao);
					this._mensagem.texto = "Negociações importadas com sucesso";
					this._mensagem.classe = "alert alert-success";
				})
			)
			.catch(erro => {
				this._mensagem.texto = erro;
				this._mensagem.classe = "alert alert-danger";
			})

	}

	importaEssaSemanaNegociacoes() {

		this._service
			.getNegociacaoSemana()
			.then(negociacoes => {
				negociacoes.forEach((negociacao) => this._listaNegociacoes.add(negociacao))
				this._mensagem.texto = "Negociações da semana importadas com sucesso";
				this._mensagem.classe = "alert alert-success";
			})
			.catch(erro => {
				this._mensagem.texto = erro;
				this._mensagem.classe = "alert alert-danger";
			});

	}

	importaSemanaPassadaNegociacoes() {

		this._service
			.getNegociacaoSemanaPassada()
			.then(negociacoes => {
				negociacoes.forEach((negociacao) => this._listaNegociacoes.add(negociacao))
				this._mensagem.texto = "Negociações da semana passada importadas com sucesso";
				this._mensagem.classe = "alert alert-success";
			})
			.catch(erro => {
				this._mensagem.texto = erro;
				this._mensagem.classe = "alert alert-danger";
			});
	}

	importaSemanaRetrasadaNegociacoes() {

		this._service
			.getNegociacaoSemanaRetrasada()
			.then(negociacoes => {
				negociacoes.forEach((negociacao) => this._listaNegociacoes.add(negociacao))
				this._mensagem.texto = "Negociações da semana retrasada importadas com sucesso";
				this._mensagem.classe = "alert alert-success";
			})
			.catch(erro => {
				this._mensagem.texto = erro;
				this._mensagem.classe = "alert alert-danger";
			});
	}

	apaga() {

		this._service
			.apaga()
			.then(mensagem => {
				this._mensagem.texto = mensagem;
				this._mensagem.classe = "alert alert-warning";
				this._listaNegociacoes.clear();
			})
			.catch(erro => {
				this._mensagem.texto = erro;
				this._mensagem.classe = "alert alert-danger";
			});

	}

	ordena(coluna) {
		if (this._ordemAtual == coluna) {
			this._listaNegociacoes.ordenaReverso();
		} else {
			this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
		}
		this._ordemAtual = coluna;
	}

	_criaNegociacao() {
		return new Negociacao(
			DateHelper.StringToDate(this._data.value),
			parseInt(this._quantidade.value),
			parseFloat(this._valor.value)
		);
	}

	_limpaForm() {

		this._data.value = "";
		this._quantidade.value = 1;
		this._valor.value = 0.0;

		this._data.focus();

	}
}

let negociacaoController = new NegociacaoController();

export function currentInstance() {
	return negociacaoController;
}