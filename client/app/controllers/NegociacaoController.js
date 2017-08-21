class NegociacaoController {

	constructor(){
		let $ = document.querySelector.bind(document);
		this._data = $("#data");
		this._quantidade = $("#quantidade");
		this._valor = $("#valor");
		this._listaNegociacoes = new NegociacaoList();
		this._negociacaoView = new NegociacoesView($('#negociacaoView'));
		this._mensagem = new Mensagem();
		this._mensagemView = new MensagemView($('#mensagemView'));
		
	}

	add(event) {
		event.preventDefault();
		
		this._listaNegociacoes.add(this._criaNegociacao());
		this._negociacaoView.update(this._listaNegociacoes);

		this._mensagem.texto = "Negociação adicionada com sucesso !";
		this._mensagemView.update(this._mensagem);

		this._limpaForm();		


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