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

	clear() {

		this._negociacoes = [];
		
	}

	ordena( criterio) {
		this._negociacoes.sort(criterio);
	}

	ordenaReverso() {
		this._negociacoes.reverse();
	}
}