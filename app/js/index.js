import "animate.css";
import "../scss/application.scss";
import Model from "./model.js";
import Controller from "./controller.js";
import View from "./view.js";


$(document).ready(() => {
	new Controller(Model, View);
});