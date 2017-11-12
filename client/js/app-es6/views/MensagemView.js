import {View} from './View'

export class MensagemView extends View{
	
	
	template(conteudo, classe){
			return `<p class="alert ${classe}"> ${conteudo.texto} </p>`;
	}


	update(conteudo, classe){
		this._elemento.innerHTML = this.template(conteudo, classe);
	}
}