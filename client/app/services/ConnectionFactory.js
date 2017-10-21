var ConnectionFactory = (function (){ 

  const stores = [ 'negociacoes' ];
  const version = 1;
  const nomeDb = 'negociacoesDb';
  
  var connection = null;
  var close = null ;


  return class ConnectionFactory{
    
    constructor(){
      throw new Error("Não é possível instanciar a classe ConnectionFactory");
    }

    static getConnection() { 

      return new Promise( (resolve, reject) => {
        
        let openrequest = window.indexedDB.open(nomeDb, version);

        openrequest.onupgradeneeded = 
          e =>{
            ConnectionFactory._createStore(e.target.result);
        };

        openrequest.onsuccess = 
          e =>{
            if(!connection){

              connection = e.target.result;
              close = connection.close.bind(connection);
              connection.close = function(){ 
                throw new Error("Não é possível fechar a conexão diretamente");
              }
            }
            resolve(connection);
        };

        openrequest.onerror = 
          e => {
            console.log('erro connectionFactory:', e.target.error);
            reject(e.target.error.name);
        };
      })
    }

    static _createStore( connection) {
      stores.forEach( store =>{
        if( connection.objectStoreNames.contains(store))
          connection.deleteObjectStore(store);

        connection.createObjectStore(store, { autoIncrement: true });
      });
    }

    static closeConnection() {

      if(connection) {
        close();
        connection = null;
      }
    }
  }

})();