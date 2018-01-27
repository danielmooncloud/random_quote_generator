import pubSub from "./pubsub.js";


export default class Controller {
	constructor(filepath) {
		this.cacheDom();
		this.bindEvents();
		$.getJSON(filepath, (data) => {
			this.data = data;
			this.updateQuote();
		}).fail(function() {
			const error = new Error("This service is current unavailable.");
			pubSub.publish("renderError", error);
		});
	}

	cacheDom() {
		this.$main = $(".main");
		this.$quoteBtn = this.$main.find("#quote-button");
	}

	bindEvents() {
		this.$quoteBtn.click(() => {
			this.updateQuote();
		});
	}

	updateQuote() {
		if(this.data) {
			const random = Math.floor(Math.random() * this.data.length);
			const quote = this.data[random].quote;
			const author = this.data[random].person;
			pubSub.publish("updateQuote", {quote, author});
		}
	}

}

