class NegociacaoController {

	constructor(){
		let $ = document.querySelector.bind(document);
		this._data = $("#data");
		this._quantidade = $("#quantidade");
    this._valor = $("#valor");
    this._listaNegociacoes = ProxyFactory.create( 
      new NegociacaoList(),
      ['add', 'limpaNegociacoes'],
      (model) => this._negociacaoView.update(model)
    );
		this._negociacaoView = new NegociacoesView($('#negociacaoView'));
		this._mensagem =  ProxyFactory.create( 
      new Mensagem(),
      ['texto'],
      (model) => this._mensagemView.update(model)
    );
		this._mensagemView = new MensagemView($('#mensagemView'));
		
	}

	add(event) {
		event.preventDefault();
		
		this._listaNegociacoes.add(this._criaNegociacao());

		this._mensagem.texto = "Negociação adicionada com sucesso !";
		

		this._limpaForm();

	}

	apaga() {
		this._listaNegociacoes.limpaNegociacoes();

		this._mensagem.texto = " Negociações apagadas com sucesso !";
		
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