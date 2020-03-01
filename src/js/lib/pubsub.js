export default class PubSub {
	constructor() {
		this.events = {};
	}

	// create a new event for passed `event`
	// or push a new callback into the collection

	subscribe(event, callback) {
		// check if there's an event set
		// if not, create a new one and set it with an empty array

		if (!this.events.hasOwnProperty(event)) {
			this.events[event] = [];
		}

		//  push callback
		return this.events[event].push(callback);
	}

	//if passed event has callbacks, loop through each one and call it

	publish(event, data = {}) {
		if (!this.events.hasOwnProperty(event)) {
			return [];
		}

		// get subscriptions, call callback with the passed data
		return this.events[event].map(callback => callback(data));
	}
}
