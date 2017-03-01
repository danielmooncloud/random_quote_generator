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
		this.$rightBtn = $('#right-button');
		this.$leftBtn = $('#left-button');
		this.$quoteText = $('#quotetext');
    	this.$authorText = $('#authortext');
    	this.$marks = $('#marks');	
    	this.$twitter = $('.twitter');
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
	    let random = Math.floor(Math.random() * 5) + 1
	    view.$body.removeClass();
	    view.$rightBtn.removeClass();
	    view.$leftBtn.removeClass();
	    view.$quoteText.removeClass();
	    view.$authorText.removeClass();
	    view.$marks.removeClass();
	    view.$body.addClass('color' + random);
	    view.$rightBtn.addClass('color' + random);
	    view.$leftBtn.addClass('color' + random);
	    view.$quoteText.addClass('fontColor' + random);
	    view.$authorText.addClass('fontColor' + random);
	    view.$marks.addClass('fontColor' + random);
	},

	animate: function() {
	    let random = Math.floor(Math.random() * 8)
	    const animationArray = ['animated rotateIn', 'animated zoomInDown','animated hinge','animated bounce','animated shake','animated rubberBand','animated swing','animated wobble']
	    view.$main.addClass(animationArray[random]);
	    setTimeout(function() {
	      view.$main.removeClass(animationArray[random]);
	    }, 800);
 	},

 	tweet: (string)=> view.$twitter.attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent(string))         
  	
}

$(document).ready(function() {
	controller.init();
})


})();

