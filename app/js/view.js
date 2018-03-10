import pubSub from "./pubsub.js";

export default class View {

	constructor() {
		this.cacheDom();
		this.bindEvents();
	}

	cacheDom() {
		this.$main = $(".main");
		this.$backgroundChange = $(".background-change");
		this.$colorChange = $(".color-change");
		this.$quoteText = this.$main.find("#quotetext");
		this.$authorText = this.$main.find("#authortext");
		this.$twitterLink = this.$main.find(".twitter-link");
	}

	bindEvents() {
		pubSub.subscribe("updateQuote", (quote) => {
			this.renderNew(quote);
		});
		pubSub.subscribe("renderError", (error) => {
			this.renderError(error);
		});
	}

	renderNew(data) {
		const { quote, author } = data;   
		this.tweet(`${quote} 	${author}`); 
		this.$quoteText.html(quote);
		this.$authorText.html(author);
		this.changeColor();
		this.animate();
	}

	renderError(error) {
		this.$quoteText.html(error.message);
		this.changeColor();
		this.animate();
	}

	changeColor() {	
		const random = Math.floor(Math.random() * 5) + 1;
		this.$backgroundChange.attr("class", "background-change backgroundColor" + random);
		this.$colorChange.attr("class", "color-change color" + random);
	}

	animate() {
		const random = Math.floor(Math.random() * 7);
		const animationArray = ["rotateIn", "zoomInDown", "hinge", "shake", "rubberBand", "swing", "wobble"];
		const animationName = "animated " + animationArray[random];
		const animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
		this.$main.addClass(animationName).one(animationEnd, function() {
			$(this).removeClass(animationName);
		});
	}

	tweet(string) {
		this.$twitterLink.attr("href", `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(string)}`);
	}
	
}




