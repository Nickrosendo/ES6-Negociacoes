export class ProxyFactory {

	static create(object, props, action) {

		return new Proxy( object, {

      get( target , prop, receiver) {
        if( props.includes(prop) && ProxyFactory._IsFunction(target[prop]) ) {
          return function() {
            
            let retorno = Reflect.apply(target[prop], target, arguments);
            action(target);
            return retorno;
          }

        }
        return Reflect.get( target, prop, receiver);
      },

      set( target, prop, value, receiver) {
        let retorno = Reflect.set(target, prop, value, receiver);
        if(props.includes(prop))action(target, value); 
        return retorno;
      }
    });
    
  }
  
  static _IsFunction(fnc) {
    return typeof( fnc ) == typeof( Function);
  }
}    