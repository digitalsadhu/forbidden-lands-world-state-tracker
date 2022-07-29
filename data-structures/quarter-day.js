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

  toJSON() {
    return {
      quarterDay: this.quarterDay,
      turn: this.turn,
      round: this.round,
      turns: Array.from(this.turns.values()),
    };
  }
}
