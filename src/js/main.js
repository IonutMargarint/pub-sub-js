import store from "./store/index.js";

import Count from "./components/count.js";
import List from "./components/list.js";
import Status from "./components/status.js";

const formElement = document.querySelector(".js-form");
const inputElement = document.querySelector("#new-item-field");

formElement.addEventListener("submit", e => {
	e.preventDefault();

	let value = inputElement.value.trim();

	// if input content, trigger action/clear field
	if (value.length) {
		store.dispatch("addItem", value);
		inputElement.value = "";
		inputElement.focus();
	}
});

// initial renders
new Count().render();
new List().render();
new Status().render();
