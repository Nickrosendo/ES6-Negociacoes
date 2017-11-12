export class Mensagem {

	constructor(texto = '', classe){
		this._texto = texto;
		this._classe = classe;
	}

	get texto() {
		return this._texto;
	}

	set texto(texto) {
		return this._texto = texto;
	}

	set classe(classe) {
		return this._classe = classe;
	}
}