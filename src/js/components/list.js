import Component from "../lib/component.js";
import store from "../store/index.js";

export default class List extends Component {
  // pass store instance and HTML element to the parent Component
  constructor() {
    super({
      store,
      element: document.querySelector(".js-items")
    });
  }

  //state changes, render HTML

  render() {
    // if no items, render status
    if (store.state.items.length === 0) {
      return (this.element.innerHTML = `<p class="no-items">Do something... 😢</p>`);
    }

    // loop the items, generate list
    const appItems = `
            <ul class="app__items">
                ${store.state.items
                  .map(item => {
                    return `
                        <li>${item}<button >×</button></li>`;
                  })
                  .join("")}
            </ul>
        `;

    this.element.innerHTML = appItems;

    // find buttons, dispatch `clearItem` action, pass current item's index
    this.element.querySelectorAll("button").forEach((button, index) => {
      button.addEventListener("click", () => {
        store.dispatch("clearItem", { index });
      });
    });
  }
}
