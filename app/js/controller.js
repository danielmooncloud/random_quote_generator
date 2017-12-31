import model from "./model";


export default class Controller {
	constructor() {
		this._view;
	}

	init(view) {
		this._view = view;
		this._view.init();
		this.refreshQuote();	
	}

	refreshQuote() {
		model.getNewQuote(this._view.renderNew);
	}	
}

