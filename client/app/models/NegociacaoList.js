class NegociacaoList{
	
	constructor(exec){

		this._negociacoes = [];
		this._exec = exec;
	}

	add(negociacao){

		this._negociacoes.push(negociacao);
		this._exec(this);
	}

	get negociacao(){
		return [].concat(this._negociacoes);
	}

	limpaNegociacoes() {

		this._negociacoes = [];
		this._exec(this);
	}
}