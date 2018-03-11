

export default class View {

	constructor() {
		this._cacheDom();
	}

	_cacheDom() {
		this._$main = $(".main");
		this._$backgroundChange = $(".background-change");
		this._$colorChange = $(".color-change");
		this._$quoteText = this._$main.find("#quotetext");
		this._$authorText = this._$main.find("#authortext");
		this._$twitterLink = this._$main.find(".twitter-link");
	}

	_changeColor() {	
		const random = Math.floor(Math.random() * 5) + 1;
		this._$backgroundChange.attr("class", "background-change backgroundColor" + random);
		this._$colorChange.attr("class", "color-change color" + random);
	}

	_animate() {
		const random = Math.floor(Math.random() * 7);
		const animationArray = ["rotateIn", "zoomInDown", "hinge", "shake", "rubberBand", "swing", "wobble"];
		const animationName = "animated " + animationArray[random];
		const animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
		this._$main.addClass(animationName).one(animationEnd, function() {
			$(this).removeClass(animationName);
		});
	}

	_tweet(string) {
		this._$twitterLink.attr("href", `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(string)}`);
	}

	renderNew(data) {
		const { quote, author } = data;   
		this._tweet(`${quote} 	${author}`); 
		this._$quoteText.html(quote);
		this._$authorText.html(author);
		this._changeColor();
		this._animate();
	}

	renderError(error) {
		this._$quoteText.html(error.message);
		this._changeColor();
		this._animate();
	}
	
}




