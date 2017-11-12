import { HttpService } from './HttpService'
import { Negociacao } from '../models/Negociacao'
import { NegociacaoDao } from '../dao/NegociacaoDao'
import { ConnectionFactory } from './ConnectionFactory'

export class NegociacaoService {

	constructor() {
		this._http = new HttpService();
	}


	getNegociacoes() {

		return Promise.all([
			this.getNegociacaoSemana(),
			this.getNegociacaoSemanaPassada(),
			this.getNegociacaoSemanaRetrasada()
		]).then(periodos => {

			let negociacoes = periodos
				.reduce((dados, periodo) => dados.concat(periodo), []);
			return negociacoes;
		}).catch(erro => {
			throw new Error(erro);
		});
	}

	getNegociacaoSemana() {

		return this._http
			.get('negociacoes/semana')
			.then(negociacoes => {
				return negociacoes.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
			})
			.catch(erro => {
				console.log(erro);
				throw new Error("Não foi possível importar as negociações da semana");
			});

	}

	getNegociacaoSemanaPassada() {

		return this._http
			.get('negociacoes/anterior')
			.then(negociacoes => {
				return negociacoes.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
			})
			.catch(erro => {
				console.log(erro);
				throw new Error("Não foi possível importar as negociações da semana anterior");
			});

	}

	getNegociacaoSemanaRetrasada() {

		return this._http
			.get('negociacoes/retrasada')
			.then(negociacoes => {
				return negociacoes.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
			})
			.catch(erro => {
				console.log(erro);
				throw new Error("Não foi possível importar as negociações da semana retrasada");
			});

	}

	cadastra(negociacao) {

		return ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection, 'negociacoes'))
			.then(dao => dao.adiciona(negociacao))
			.then(() => "Negociação adicionada com sucesso !")
			.catch((erro) => {
				console.log(erro);
				throw new Error("Não foi possível adicionar a negociação")
			});
	}

	lista() {
		return ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection, 'negociacoes'))
			.then(dao => dao.listaTodos())
			.catch(erro => {
				console.log(erro);
				throw new Error("Não foi possível listar as negociações")
			})
	}

	apaga() {
		return ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection, 'negociacoes'))
			.then(dao => dao.apagaTodos())
			.then(() => "Negociações apagadas com sucesso")
			.catch(erro => {
				console.log(erro);
				throw new Error("Não foi possível apagar as negociações")
			})
	}

	importa(listaAtual) {
		return this.getNegociacoes()
			.then(negociacoes =>
				negociacoes.filter(negociacao =>
					!listaAtual.some(negociacaoExistente => JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))
				)
			)
			.catch(erro => {
				console.log(erro);
				throw new Error("Não foi possível buscar negociações para importar");
			})

	}

}