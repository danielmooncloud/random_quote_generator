

export default class Model {
	constructor(url) {
		this.url = url;
	}
	
	getNewQuote(callback) {    
		$.getJSON(this.url, callback);
	} 
}
