import Component from "../lib/component.js";
import store from "../store/index.js";

export default class Status extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector(".js-status")
    });
  }

  // state changes, render HTML

  render() {
    let suffix = store.state.items.length !== 1 ? "s" : "";

    this.element.innerHTML = `${store.state.items.length} item${suffix}`;
  }
}
