import "animate.css";
import "../scss/application.scss";
import Controller from "./controller.js";



$(document).ready(() => {
	
	const view = {
		init() {
			this.cacheDom();
			this.bindEvents();
			this.changeColor();
			this.animate();
		},

		cacheDom() {
			this.$main = $(".main");
			this.$backgroundChange = $(".background-change");
			this.$colorChange = $(".color-change");
			this.$quoteBtn = this.$main.find("#quote-button");
			this.$quoteText = this.$main.find("#quotetext");
			this.$authorText = this.$main.find("#authortext");
			this.$twitterLink = this.$main.find(".twitter-link");
		},

		bindEvents() {
			this.$quoteBtn.click(() => {
				controller.refreshQuote();	
				view.changeColor();
				view.animate();
			});
		},

		renderNew(data) {
			const random = Math.floor(Math.random() * 50);
			const currentQuote = data[random].quote;
			const currentAuthor = data[random].person;                
			view.tweet(`${currentQuote} 	${currentAuthor}`); 
			view.$quoteText.html(currentQuote);
			view.$authorText.html(currentAuthor);    
		},

		changeColor() {	
			const random = Math.floor(Math.random() * 5) + 1;
			view["$backgroundChange"].attr("class", "background-change backgroundColor" + random);
			view["$colorChange"].attr("class", "color-change color" + random);
		},

		animate() {
			const random = Math.floor(Math.random() * 7);
			const animationArray = ["rotateIn", "zoomInDown", "hinge", "shake", "rubberBand", "swing", "wobble"];
			const animationName = "animated " + animationArray[random];
			const animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
			view.$main.addClass(animationName).one(animationEnd, function() {
				$(this).removeClass(animationName);
			});
		},

		tweet(string) {
			view.$twitterLink.attr("href", `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(string)}`);
		}
	};

	const controller = new Controller();
	controller.init(view);
});


