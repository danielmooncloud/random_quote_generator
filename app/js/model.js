

const model = {
	getNewQuote(callback) {    
		$.getJSON("data/quotes.json", callback);
	} 
};

export default model;