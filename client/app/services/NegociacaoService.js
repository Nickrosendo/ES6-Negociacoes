class NegociacaoService {

	 getAllNegociacoes(callback){
        let xhr = new XMLHttpRequest();
		xhr.open('GET', 'negociacoes/semana');

		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4) 
				if(xhr.status == 200) {
                    callback(null,  
                        JSON.parse(xhr.responseText).map( ( item ) => new Negociacao(new Date(item.data), item.quantidade, item.valor))
                    );
					
				}	
				else{
                    
                    console.log(xhr.responseText);
					callback("Não foi possível importar as negociações", null);
				}	
		}

		xhr.send();

		let xhr2 = new XMLHttpRequest();
		xhr2.open('GET', 'negociacoes/anterior');
		xhr2.onreadystatechange = () => {
			if(xhr2.readyState == 4) 
				if(xhr2.status == 200) {
                    callback(null,  
                        JSON.parse(xhr2.responseText).map( ( item ) => new Negociacao(new Date(item.data), item.quantidade, item.valor))
                    );
					
				}	
				else{
                    
                    console.log(xhr2.responseText);
					callback("Não foi possível importar as negociações", null);
				}	
		}

		xhr2.send();

		let xhr3 = new XMLHttpRequest();
		xhr3.open('GET', 'negociacoes/retrasada');
		xhr3.onreadystatechange = () => {
			if(xhr3.readyState == 4) 
				if(xhr3.status == 200) {
                    callback(null,  
                        JSON.parse(xhr3.responseText).map( ( item ) => new Negociacao(new Date(item.data), item.quantidade, item.valor))
                    );
					
				}	
				else{
                    
                    console.log(xhr3.responseText);
					callback("Não foi possível importar as negociações", null);
				}	
		}

		xhr3.send();
	}
	
	getNegociacaoSemana(callback){
        let xhr = new XMLHttpRequest();
		xhr.open('GET', 'negociacoes/semana');

		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4) 
				if(xhr.status == 200) {
                    callback(null,  
                        JSON.parse(xhr.responseText).map( ( item ) => new Negociacao(new Date(item.data), item.quantidade, item.valor))
                    );
					
				}	
				else{
                    
                    console.log(xhr.responseText);
					callback("Não foi possível importar as negociações", null);
				}	
		}

		xhr.send();
	}
	
	 getNegociacaoSemanaPassada(callback){
        let xhr = new XMLHttpRequest();

		xhr.open('GET', 'negociacoes/anterior');

		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4) 
				if(xhr.status == 200) {
                    callback(null,  
                        JSON.parse(xhr.responseText).map( ( item ) => new Negociacao(new Date(item.data), item.quantidade, item.valor))
                    );
					
				}	
				else{
                    
                    console.log(xhr.responseText);
					callback("Não foi possível importar as negociações", null);
				}	
		}

		xhr.send();
	}
	
	 getNegociacaoSemanaRetrasada(callback){
		let xhr = new XMLHttpRequest();
		
		xhr.open('GET', 'negociacoes/retrasada');

		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4) 
				if(xhr.status == 200) {
                    callback(null,  
                        JSON.parse(xhr.responseText).map( ( item ) => new Negociacao(new Date(item.data), item.quantidade, item.valor))
                    );
					
				}	
				else{
                    
                    console.log(xhr.responseText);
					callback("Não foi possível importar as negociações", null);
				}	
		}

		xhr.send();
    }
}