class MensagemView extends View{
	
	template(conteudo){
			return `<p class="alert alert-success"> ${conteudo.texto} </p>`;
	}

}