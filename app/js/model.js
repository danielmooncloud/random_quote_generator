

const model = {
	getNewQuote(callback) {    
		$.getJSON("data/quotes.json", (data) => {
			callback(data);
		});
	} 
};

export default model;