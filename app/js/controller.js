import model from "./model";


export default class Controller {
	constructor(view) {
		this.view = view;
	}

	init() {
		this.view.init();
		this.refreshQuote();	
	}

	refreshQuote() {model.getNewQuote(this.view.renderNew);}	
}

