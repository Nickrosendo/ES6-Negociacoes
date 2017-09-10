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
	}

	add(event) {
		event.preventDefault();

		try{

			this._listaNegociacoes.add(this._criaNegociacao());

			this._mensagem.texto = "Negociação adicionada com sucesso !";
			this._mensagem.classe = "alert alert-success";

			this._limpaForm();
		}catch( erro)	 {
			this._mensagem.texto = erro;
			this._mensagem.classe = "alert alert-danger";
		}

	}

	importaAllNegociacoes() {
		let negociacaoService = new NegociacaoService();
		negociacaoService.getNegociacoes()
		.then(negociacoes => {
			negociacoes.forEach((negociacao) => this._listaNegociacoes.add(negociacao))
			this._mensagem.texto = "Negociações importadas com sucesso";
			this._mensagem.classe = "alert alert-success";
		}).catch( erro => {
			this._mensagem.texto = erro;
			this._mensagem.classe = "alert alert-danger";
		})

	}

	importaEssaSemanaNegociacoes() {
		let negociacaoService = new NegociacaoService();
		negociacaoService.getNegociacaoSemana()
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
		let negociacaoService = new NegociacaoService();
		negociacaoService.getNegociacaoSemanaPassada()
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
		let negociacaoService = new NegociacaoService();
		negociacaoService.getNegociacaoSemanaRetrasada()
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
		this._listaNegociacoes.clear();

		this._mensagem.texto = " Negociações apagadas com sucesso !";
		this._mensagem.classe = "alert alert-danger";

	}

	ordena( coluna ) {
		if(this._ordemAtual == coluna) {
					this._listaNegociacoes.ordenaReverso();
			} else {
					this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
			}
			this._ordemAtual = coluna;
	}

	_criaNegociacao() {
		return new Negociacao(DateHelper.StringToDate(this._data.value), this._quantidade.value, this._valor.value);
	}

	_limpaForm() {

		this._data.value = "";
		this._quantidade.value = 1;
		this._valor.value = 0.0;

		this._data.focus();

	}
}