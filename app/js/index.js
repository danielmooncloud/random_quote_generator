import "animate.css";
import "../scss/application.scss";


import Controller from "./controller.js";
import View from "./view.js";


$(document).ready(() => {
	const view = new View();
	new Controller("data/quotes.json", view);
});