import { Round } from "./round.js";

export class Turn {
  /** @type {number} */
  turn = 1;
  round = 1;
  /** @type {Map<number, Round>} */
  roundList = new Map();

  /**
   * @param { import('./data-structures').TurnData } turn
   */
  static restore(turn) {
    const instance = new this(turn.turn);
    instance.round = turn.round;
    for (const round of turn.roundList) {
      instance.roundList.set(round.round, Round.restore(round));
    }
    return instance;
  }

  /**
   * @param {number} turn
   */
  constructor(turn) {
    this.turn = turn;
  }

  /**
   * @param {Round} round
   */
  setRound(round) {
    this.round = round.round;
    this.roundList.set(round.round, round);
  }

  /**
   * @return { import('./data-structures').TurnData }
   */
  toJSON() {
    return {
      turn: this.turn,
      round: this.round,
      roundList: Array.from(this.roundList.values()),
    };
  }
}
