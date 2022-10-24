const wind = {
  LIGHT_BREEZE: "Light Breeze",
  STRONG_WIND: "Strong Wind",
  STORM: "Storm",
};
const rain = {
  NO_RAIN: "No Rain",
  LIGHT_RAIN: "Light Rain",
  LIGHT_SNOW: "Light Snow",
  HEAVY_RAIN: "Heavy Rain",
  HEAVY_SNOW: "Heavy Snow",
};
const cold = {
  MILD: "Mild",
  COLD: "Cold",
  BITING: "Biting",
};

const phases = {
  SPRING_RISE: "Springrise",
  SPRING_WANE: "Springwane",
  SUMMER_RISE: "Summerrise",
  SUMMER_WANE: "Summerwane",
  FALL_RISE: "Fallrise",
  FALL_WANE: "Fallwane",
  WINTER_RISE: "Winterrise",
  WINTER_WANE: "Winterwane",
};

const phaseMap = {
  1: phases.SPRING_RISE,
  2: phases.SPRING_WANE,
  3: phases.SUMMER_RISE,
  4: phases.SUMMER_WANE,
  5: phases.FALL_RISE,
  6: phases.FALL_WANE,
  7: phases.WINTER_RISE,
  8: phases.WINTER_WANE,
};

const phaseBoundaries = [
  [45, 1],
  [91, 2],
  [137, 3],
  [183, 4],
  [228, 5],
  [274, 6],
  [319, 7],
  [365, 8],
];

function getPhaseName(datestamp) {
  const day = getDay(datestamp);
  for (const [boundary, phaseNum] of phaseBoundaries) {
    if (day <= boundary) {
      return phaseMap[phaseNum];
    }
  }
}

function getDay(datestamp) {
  let dayNum = datestamp % 365;
  if (dayNum === 0) dayNum = 365;
  return dayNum;
}

export class Weather {
  wind = "";
  rain = "";
  cold = "";

  /**
   * @param { import("./data-structures/data-structures").WeatherData? } weather;
   * @param { number? } timestamp;
   */
  constructor(weather = null, timestamp = null) {
    if (weather) {
      this.wind = weather.wind;
      this.rain = weather.rain;
      this.cold = weather.cold;
    } else {
      this.generate(timestamp);
    }
  }

  d6() {
    return Math.ceil(Math.random() * 6);
  }

  generateWind() {
    const roll = this.d6();
    if (roll >= 1 && roll <= 3) {
      return wind.LIGHT_BREEZE;
    } else if (roll >= 4 && roll <= 5) {
      return wind.STRONG_WIND;
    } else if (roll === 6) {
      return wind.STORM;
    }
    return wind.LIGHT_BREEZE;
  }

  generateRain(timestamp) {
    const phase = getPhaseName(timestamp);
    const roll = this.d6();
    if (roll >= 1 && roll <= 3) {
      return rain.NO_RAIN;
    } else if (roll >= 4 && roll <= 5) {
      if (phase === phases.WINTER_RISE || phase === phases.WINTER_WANE) return rain.LIGHT_SNOW;
      return rain.LIGHT_RAIN;
    } else if (roll === 6) {
      if (phase === phases.WINTER_RISE || phase === phases.WINTER_WANE) return rain.HEAVY_SNOW;
      return rain.HEAVY_RAIN;
    }
    return rain.NO_RAIN;
  }

  generateCold(timestamp, modifier = 0) {
    const phase = getPhaseName(timestamp);
    if (
      phase === phases.FALL_WANE ||
      phase === phases.WINTER_RISE ||
      phase === phases.WINTER_WANE ||
      phase === phases.SPRING_RISE
    ) {
      const roll = this.d6() + modifier;
      if (roll >= 4 && roll <= 5) {
        return cold.COLD;
      } else if (roll >= 6) {
        return cold.BITING;
      }
    }
    return cold.MILD;
  }

  generate(timestamp) {
    this.wind = this.generateWind();
    this.rain = this.generateRain(timestamp);

    let modifier = 0;
    if (this.wind === "Strong Wind") modifier = 1;
    if (this.wind === "Storm") modifier = 2;

    this.cold = this.generateCold(timestamp, modifier);
  }

  toJSON() {
    return {
      rain: this.rain,
      cold: this.cold,
      wind: this.wind,
    };
  }
}
