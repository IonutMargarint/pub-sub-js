// test Store class
import Store from "../store/store.js";

export default class Component {
	constructor(props = {}) {
		//set base render fn

		this.render = this.render || function() {};

		// if store passed in, subscribe to the state change
		if (props.store instanceof Store) {
			props.store.events.subscribe("stateChange", () => this.render());
		}

		// store html element
		if (props.hasOwnProperty("element")) {
			this.element = props.element;
		}
	}
}
