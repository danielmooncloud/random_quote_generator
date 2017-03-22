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
			this.$body = $("body");
			this.$rightBtn = this.$main.find("#right-button");
			this.$leftBtn = this.$main.find("#left-button");
			this.$quoteText = this.$main.find("#quotetext");
			this.$authorText = this.$main.find("#authortext");
			this.$marks = this.$main.find("#marks");	
			this.$twitter = this.$main.find(".twitter");
		},

		bindEvents() {
			this.$rightBtn.click(() => {
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
			const colorChanges = ["$body", "$rightBtn", "$leftBtn", "$quoteText", "$authorText", "$marks"];
			colorChanges.forEach((element, i) => {
				view[element].removeClass().addClass((i <= 2 ? "color": "fontColor") + random); 
			});
		},

		animate() {
			const random = Math.floor(Math.random() * 8);
			const animationArray = ["rotateIn", "zoomInDown","hinge","bounce","shake","rubberBand","swing","wobble"];
			view.$main.addClass("animated " + animationArray[random]);
			setTimeout(() => {
				view.$main.removeClass(`animated ${animationArray[random]}`);
			}, 800);
		},

		tweet(string) {view.$twitter.attr("href", `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(string)}`);}
	};

	const controller = new Controller();
	controller.init(view);
});


