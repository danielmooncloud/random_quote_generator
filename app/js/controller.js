


export default class Controller {
	constructor(Model, View, filepath) {
		this.refreshQuote = this.refreshQuote.bind(this);
		this.model = new Model(filepath);
		this.view = new View(this.refreshQuote);
	}

	refreshQuote(callback) {
		this.model.getNewQuote(callback);
	}	
}

