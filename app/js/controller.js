var model = require("./model");


module.exports = function Controller(view) {
	this.view = view;
	this.init = function() {
		this.view.init();
		this.refreshQuote();	
	};
	this.refreshQuote = function() {model.getNewQuote(this.view.renderNew);}; 
};

