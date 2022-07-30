import { Notes } from "./notes.js";

export class Round {
  round = null;
  state = {};

  constructor(round, state) {
    this.round = round;
    this.state = state;
  }

  async notes() {
    return Notes.round(this.state);
  }
}
