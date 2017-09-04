class NegociacoesView extends View{

	template(conteudo){
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
					${conteudo.negociacao.map( n =>  `
								
								<tr>
									<td>${DateHelper.DiaMesAno(n.data)}</td>
									<td>${n.quantidade}</td>
									<td>${n.valor}</td>
									<td>${n.volume}</td>
								</tr>
							`
						).join('')
					}
        </tbody>
        <tfoot>
        	<td colspan = "3"></td>
        	<td>
						${conteudo.volume}
        	</td>
        </tfoot>
    </table>
    `;
	}
}