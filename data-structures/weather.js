export class Weather {
  #cold = "Mild";
  #rain = "No Rain";
  #wind = "Light Breeze";

  constructor(weather = {}) {
    this.#cold = weather.cold;
    this.#rain = weather.rain;
    this.#wind = weather.wind;
  }

  get cold() {
    return this.#cold;
  }
  get rain() {
    return this.#rain;
  }
  get wind() {
    return this.#wind;
  }

  toJSON() {
    return {
      cold: this.cold,
      rain: this.rain,
      wind: this.wind,
    };
  }
}
