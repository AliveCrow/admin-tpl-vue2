import jsCookie from "js-cookie";

class Token {
	constructor(key) {
		this.key = key
	}
	
	get() {
		return jsCookie.get(this.key);
	}
	
	set(value) {
		jsCookie.set(this.key, value);
	}
	
	delete() {
		jsCookie.remove(this.key);
	}
}

const tokenUtil = new Token(process.env.VUE_APP_TOKEN_KEY)
export default tokenUtil
