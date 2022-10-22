export class Round {
  /** @type {number} */
  round = 1;

  /**
   * @param { import('./data-structures').RoundData } roundData
   */
  static restore(roundData) {
    const instance = new this(roundData.round);
    return instance;
  }

  /**
   * @param {number} round
   */
  constructor(round) {
    this.round = round;
  }

  /**
   * @return { import('./data-structures').RoundData }
   */
  toJSON() {
    return {
      round: this.round,
    };
  }
}
