class NegociacaoController {

	constructor(){
		let $ = document.querySelector.bind(document);
		this._data = $("#data");
		this._quantidade = $("#quantidade");
		this._valor = $("#valor");
		this._listaNegociacoes = new NegociacaoList();
		this._negociacaoView = new NegociacoesView($('#negociacaoView'));
		
	}

	add(event) {
		event.preventDefault();
		
		this._listaNegociacoes.add(this._criaNegociacao());
		this._limpaForm();		

		
		this._negociacaoView.update(this._listaNegociacoes);

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