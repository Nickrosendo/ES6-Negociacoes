class NegociacaoService {

	constructor(){
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
					.then( negociacoes => {
						return negociacoes.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
					})
					.catch( erro => {
						console.log(erro);
						throw new Error("Não foi possível importar as negociações da semana");
					});

	}

	getNegociacaoSemanaPassada() {

		return this._http
				.get('negociacoes/anterior')
					.then( negociacoes => {
						return negociacoes.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
					})
					.catch( erro => {
						console.log(erro);
						throw new Error("Não foi possível importar as negociações da semana anterior");
					});

	}

	getNegociacaoSemanaRetrasada() {
		
			return this._http
				.get('negociacoes/retrasada')
					.then( negociacoes => {
						return negociacoes.map((item) => new Negociacao(new Date(item.data), item.quantidade, item.valor));
					})
					.catch( erro => {
						console.log(erro);
						throw new Error("Não foi possível importar as negociações da semana retrasada");
					});

	}

}