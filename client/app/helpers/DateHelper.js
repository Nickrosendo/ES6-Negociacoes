class DateHelper{
	
	constructor(){
		throw new Error("Classe não pode ser instanciada!");
	}

	static DiaMesAno(data){
		return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()} `;
	}

	static StringToDate(texto) {
		if(!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error("A string informada deve estar no formato aaaa-mm-dd");

	  return new Date(...texto.split('-').map((item, indice) => item - indice %2 ));
	}

}