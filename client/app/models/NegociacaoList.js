class NegociacaoList{
	
	constructor(){

		this._negociacoes = [];
		
	}

	add(negociacao){

		this._negociacoes.push(negociacao);
		
  	}
  
	get volume() {
		return this._negociacoes.reduce( (total,n) => total + n.volume , 0);
	}

	get negociacao(){
		return [].concat(this._negociacoes);
	}

	limpaNegociacoes() {

		this._negociacoes = [];
		
	}
}