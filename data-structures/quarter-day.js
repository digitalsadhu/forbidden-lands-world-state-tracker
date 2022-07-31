import { Notes } from "./notes.js";

export class QuarterDay {
  quarterDay = null;
  turn = 1;
  round = 1;
  turns = new Map();

  constructor(quarterDay) {
    this.quarterDay = quarterDay;
  }

  setTurn(turn) {
    this.turn = turn.turn;
    this.turns.set(turn.turn, turn);
  }

  get notes() {
    return Notes.quarterDay(this.state);
  }

  get state() {
    return this.turns.get(this.turn).rounds.get(this.round).state;
  }

  get actions() {}

  toJSON() {
    return {
      quarterDay: this.quarterDay,
      turn: this.turn,
      round: this.round,
      turns: Array.from(this.turns.values()),
    };
  }
}
