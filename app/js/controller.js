
export default class Controller {
	constructor(filepath, view) {
		this._cacheDom();
		this._bindEvents();
		this._view = view;
		$.getJSON(filepath, (data) => {
			this._data = data;
			this._updateQuote();
		}).fail(function() {
			const error = new Error("This service is current unavailable.");
			this._view.renderError(error);
		});
	}

	_cacheDom() {
		this._$main = $(".main");
		this._$quoteBtn = this._$main.find("#quote-button");
	}

	_bindEvents() {
		this._$quoteBtn.click(() => {
			this._updateQuote();
		});
	}

	_updateQuote() {
		if(this._data) {
			const random = Math.floor(Math.random() * this._data.length);
			const quote = this._data[random].quote;
			const author = this._data[random].person;
			this._view.renderNew({quote, author});
		}
	}

}

