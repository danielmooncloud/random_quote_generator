import pubSub from "./pubsub.js";


export default class Controller {
	constructor(filepath) {
		$.getJSON(filepath, (data) => {
			this.data = data;
			this.cacheDom();
			this.bindEvents();
			this.updateQuote();
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
		const random = Math.floor(Math.random() * 50);
		const quote = this.data[random].quote;
		const author = this.data[random].person;
		pubSub.publish("updateQuote", {quote, author});     
	}

}

