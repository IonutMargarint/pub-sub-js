import PubSub from "../lib/pubsub.js";

export default class Store {
  constructor(params) {
    //add default objects (actions, mutations, state)

    this.actions = {};
    this.mutations = {};
    this.state = {};

    this.status = "resting";

    // PubSub module
    this.events = new PubSub();

    // check passed params object for actions and mutations

    if (params.hasOwnProperty("actions")) {
      this.actions = params.actions;
    }

    if (params.hasOwnProperty("mutations")) {
      this.mutations = params.mutations;
    }

    // set state as a Proxy.
    this.state = new Proxy(params.state || {}, {
      set: (state, key, value) => {
        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);

        // publish the change event
        this.events.publish("stateChange", this.state);

        // warn if the value is set directly
        if (this.status !== "mutation") {
          console.warn(`You should use a mutation to set ${key}`);
        }

        // reset the status
        this.status = "resting";

        //indicate success
        return true;
      }
    });
  }

  // dispatcher for actions

  dispatch(actionKey, payload) {
    // check if the action exists

    if (typeof this.actions[actionKey] !== "function") {
      console.error(`Action "${actionKey} doesn't exist.`);
    }

    // create a console group
    console.groupCollapsed(`ACTION: ${actionKey}`);

    // set dispatching status
    this.status = "action";

    // call the action, pass the Store and payload
    this.actions[actionKey](this, payload);

    // close console group
    console.groupEnd();
  }

  // check for mutations and modify the state object

  commit(mutationKey, payload) {
    // check for mutations

    if (typeof this.mutations[mutationKey] !== "function") {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
    }

    // set status
    this.status = "mutation";

    // get new state version
    let newState = this.mutations[mutationKey](this.state, payload);

    // create new state
    this.state = Object.assign(this.state, newState);
  }
}
