import { State } from "./data-structures/state.js";

class Events extends EventTarget {
  #state = new State();

  update(patch) {
    console.log(patch);
    for (const [key, value] of Object.entries(patch)) {
      this.#state[key] = value;
    }
    this.dispatchEvent(new CustomEvent("change", { detail: { state: State.clone(this.#state), trigger: patch } }));
  }

  get state() {
    return State.clone(this.#state);
  }
}

export const events = new Events();
