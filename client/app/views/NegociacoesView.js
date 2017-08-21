class NegociacoesView{

	constructor(elemento){
			this._elemento = elemento;
	}

	_template(conteudo){
		return ` 
		<table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>
        
        <tbody>
					${conteudo.negociacao.map( n => {
							return `
								<tr>
									<td>
										${DateHelper.DiaMesAno(n.data)}
									</td>
									<td>
										${n.quantidade}
									</td>
									<td>
										${n.valor}
									</td>
									<td>
										${n.volume}
									</td>
								</tr>
							`
						} 
					)}
        </tbody>
        
        <tfoot>
        </tfoot>
    </table>
    `;
	}

	update(conteudo){

			this._elemento.innerHTML = this._template(conteudo);
	}
}