import Component from "../lib/component.js";
import store from "../store/index.js";

export default class Count extends Component {
	constructor() {
		super({
			store,
			element: document.querySelector(".js-count")
		});
	}

	//state changes and render HTML

	render() {
		let suffix = store.state.items.length !== 1 ? "s" : "";
		let emoji = store.state.items.length > 0 ? "🙌" : "😢";

		this.element.innerHTML = `
            <small>I've done</small>
            <span>${store.state.items.length}</span>
            <small>thing${suffix} today ${emoji}</small>
        `;
	}
}
