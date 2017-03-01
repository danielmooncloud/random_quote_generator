(function() {
'use strict';

var model = {
	
	getNewQuote: function(callback) {
	    
	    $.getJSON('data/quotes.json', function(data) {
	    	callback(data)
	    });
  	} 
}


var controller = {

	init: function() {
		view.init();
		this.refreshQuote();	
	},

	refreshQuote: ()=> model.getNewQuote(view.renderNew)
}



var view = {

	init: function() {
		this.cacheDom();
		this.bindEvents();
		this.changeColor();
		this.animate();
	},

	cacheDom: function() {
		this.$main = $('.main');
		this.$body = $('body');
		this.$rightBtn = this.$main.find('#right-button');
		this.$leftBtn = this.$main.find('#left-button');
		this.$quoteText = this.$main.find('#quotetext');
    	this.$authorText = this.$main.find('#authortext');
    	this.$marks = this.$main.find('#marks');	
    	this.$twitter = this.$main.find('.twitter');
	},

	bindEvents: function() {
		this.$rightBtn.click(function() {
			controller.refreshQuote();	
			view.changeColor();
			view.animate();
		})
	},

	renderNew: function(data) {
		let random = Math.floor(Math.random() * 50)
	    let currentQuote = data[random].quote;
	    let currentAuthor = data[random].person;
	    let urlTerm = '"' + currentQuote + '"     ' + currentAuthor;                 
     	view.tweet(urlTerm); 
	    view.$quoteText.html(currentQuote);
	    view.$authorText.html(currentAuthor);    
  	},

  	changeColor: function() {	
	    let random = Math.floor(Math.random() * 5) + 1;
	    let colorChanges = ["$body", "$rightBtn", "$leftBtn", "$quoteText", "$authorText", "$marks"]
	    colorChanges.forEach(function(element, i) {
	    	view[element].removeClass().addClass((i <= 2 ? "color": "fontColor") + random); 
	    })
	},

	animate: function() {
	    let random = Math.floor(Math.random() * 8)
	    const animationArray = ['rotateIn', 'zoomInDown','hinge','bounce','shake','rubberBand','swing','wobble']
	    view.$main.addClass("animated " + animationArray[random]);
	    setTimeout(function() {
	      view.$main.removeClass("animated " + animationArray[random]);
	    }, 800);
 	},

 	tweet: (string)=> view.$twitter.attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent(string))         
  	
}

$(document).ready(function() {
	controller.init();
})


})();

