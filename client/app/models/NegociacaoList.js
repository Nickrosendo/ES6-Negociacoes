class NegociacaoList{
	constructor(){

		this._negociacoes = [];
	}

	add(negociacao){

		this._negociacoes.push(negociacao);
	}

	get negociacao(){
		return [].concat(this._negociacoes);
	}
}