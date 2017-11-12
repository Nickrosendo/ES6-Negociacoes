import {ProxyFactory} from '../services/ProxyFactory'

export class Bind {
	constructor(model, view, props) {

		let proxy =  ProxyFactory.create( model, props, (model, classe) => view.update(model, classe));
    	return proxy;
    }
}