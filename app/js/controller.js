


export default class Controller {
	constructor(Model, View) {
		this.refreshQuote = this.refreshQuote.bind(this);
		this.model = new Model("data/quotes.json");
		this.view = new View(this.refreshQuote);
	}

	refreshQuote(callback) {
		this.model.getNewQuote(callback);
	}	
}

