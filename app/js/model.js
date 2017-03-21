const model = {
	getNewQuote: function(callback) {    
		$.getJSON("data/quotes.json", (data) => {
			callback(data);
		});
	} 
};

module.exports = model;