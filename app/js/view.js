

export default class View {

	constructor(getNewQuote) {
		this.getNewQuote = getNewQuote;
		this.renderNew = this.renderNew.bind(this);
		this.cacheDom();
		this.bindEvents();
		this.getNewQuote(this.renderNew);
		this.changeColor();
		this.animate();
	}

	cacheDom() {
		this.$main = $(".main");
		this.$backgroundChange = $(".background-change");
		this.$colorChange = $(".color-change");
		this.$quoteBtn = this.$main.find("#quote-button");
		this.$quoteText = this.$main.find("#quotetext");
		this.$authorText = this.$main.find("#authortext");
		this.$twitterLink = this.$main.find(".twitter-link");
	}

	bindEvents() {
		this.$quoteBtn.click(() => {
			this.getNewQuote(this.renderNew);	
			this.changeColor();
			this.animate();
		});
	}

	renderNew(data) {
		const random = Math.floor(Math.random() * 50);
		const currentQuote = data[random].quote;
		const currentAuthor = data[random].person;                
		this.tweet(`${currentQuote} 	${currentAuthor}`); 
		this.$quoteText.html(currentQuote);
		this.$authorText.html(currentAuthor);    
	}

	changeColor() {	
		const random = Math.floor(Math.random() * 5) + 1;
		this["$backgroundChange"].attr("class", "background-change backgroundColor" + random);
		this["$colorChange"].attr("class", "color-change color" + random);
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




