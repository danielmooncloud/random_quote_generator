(function() {
'use strict';

var model = {
	randomNumber: function(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
  },
	getNewQuote: function(callback) {
	    let random = this.randomNumber(0, 50);
	    $.ajax({
	            type:"GET",
	            contentType: "application/json; charset=utf-8",
	            url: "https://api.myjson.com/bins/38caj",
	            dataType: "json",                
	            success: json => {
	              			json = json.filter(function(val) {
	  			        		return (val.id === random);
					  		});
	              			callback(json);   
	        			}  
	    });
  	} 
}

var controller = {
	init: function() {
		view.init();
		this.refreshQuote();	
	},
	refreshQuote: function() {
		model.getNewQuote(view.renderNew);
		
	},
	getRandom: function(min, max) {
		return model.randomNumber(min, max);
	}
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
	    let currentQuote = data[0].quote;
	    let currentAuthor = data[0].person;
	    var urlTerm = '"' + currentQuote + '"     ' + currentAuthor;                 
     	view.tweet(urlTerm); 
	    view.$quoteText.html(currentQuote);
	    view.$authorText.html(currentAuthor);    
  	},
  	changeColor: function() {	
	    let random = controller.getRandom(1, 5);
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
	    var random = controller.getRandom(0,7);
	    var animationArray = ['animated rotateIn', 'animated zoomInDown','animated hinge','animated bounce','animated shake','animated rubberBand','animated swing','animated wobble']
	    view.$main.addClass(animationArray[random]);
	    setTimeout(function() {
	      view.$main.removeClass(animationArray[random]);
	    }, 800);
 	},
 	tweet: function(string) {
    	view.$twitter.attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent(string));         
  	}
}

$(document).ready(function() {
	controller.init();
})


})();

