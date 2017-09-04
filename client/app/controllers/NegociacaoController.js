class NegociacaoController {

	constructor(){
		let $ = document.querySelector.bind(document);
		this._data = $("#data");
		this._quantidade = $("#quantidade");
	    this._valor = $("#valor");
	    this._negociacaoView = new NegociacoesView($('#negociacaoView'));
	    this._listaNegociacoes = new Bind( new NegociacaoList(), this._negociacaoView, ['add', 'limpaNegociacoes']);
		this._mensagemView = new MensagemView($('#mensagemView'));
		this._mensagem = new Bind( new Mensagem(), this._mensagemView, ['texto', 'classe']);
		
	}

	add(event) {
		event.preventDefault();
		
		this._listaNegociacoes.add(this._criaNegociacao());

		this._mensagem.texto = "Negociação adicionada com sucesso !";
		this._mensagem.classe = "alert alert-success";
		

		this._limpaForm();

	}

	apaga() {
		this._listaNegociacoes.limpaNegociacoes();

		this._mensagem.texto = " Negociações apagadas com sucesso !";
		this._mensagem.classe = "alert alert-danger";
		
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