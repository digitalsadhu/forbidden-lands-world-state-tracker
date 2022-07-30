import { Notes } from "./notes.js";

export class Turn {
  turn = null;
  round = 1;
  rounds = new Map();

  constructor(turn) {
    this.turn = turn;
  }

  setRound(round) {
    this.round = round.round;
    this.rounds.set(round.round, round);
  }

  async notes() {
    const { state } = this.rounds.get(this.round);
    return Notes.turn(state);
  }

  toJSON() {
    return {
      turn: this.turn,
      round: this.round,
      rounds: Array.from(this.rounds.values()),
    };
  }
}
