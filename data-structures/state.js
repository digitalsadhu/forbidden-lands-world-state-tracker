import { Option } from "./option.js";
import { Weather } from "./weather.js";

export class State {
  #options = {};

  constructor(options = {}) {
    this.#options = options;
  }
  get hungry() {
    return new Option("hungry", this.#options.hungry || false);
  }
  set hungry(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.hungry to be type Boolean. Got "${typeof value}"`);
    this.#options.hungry = value;
  }
  get thirsty() {
    return new Option("thirsty", this.#options.thirsty || false);
  }
  set thirsty(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.thirsty to be type Boolean. Got "${typeof value}"`);
    this.#options.thirsty = value;
  }
  get sleepy() {
    return new Option("sleepy", this.#options.sleepy || false);
  }
  set sleepy(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.sleepy to be type Boolean. Got "${typeof value}"`);
    this.#options.sleepy = value;
  }
  get cold() {
    return new Option("cold", this.#options.cold || false);
  }
  set cold(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.cold to be type Boolean. Got ${typeof value}`);
    this.#options.cold = value;
  }
  get poisoned() {
    return new Option("poisoned", this.#options.poisoned || false);
  }
  set poisoned(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.poisoned to be type Boolean. Got ${typeof value}`);
    this.#options.poisoned = value;
  }
  get injured() {
    return new Option("injured", this.#options.injured || false);
  }
  set injured(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.injured to be type Boolean. Got ${typeof value}`);
    this.#options.injured = value;
  }
  get diseased() {
    return new Option("diseased", this.#options.diseased || false);
  }
  set diseased(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.diseased to be type Boolean. Got ${typeof value}`);
    this.#options.diseased = value;
  }
  get overEncumbered() {
    return new Option("overEncumbered", this.#options.overEncumbered || false);
  }
  set overEncumbered(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.overEncumbered to be type Boolean. Got ${typeof value}`);
    this.#options.overEncumbered = value;
  }
  get usingArrows() {
    return new Option("usingArrows", this.#options.usingArrows || false, "Arrows");
  }
  set usingArrows(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.usingArrows to be type Boolean. Got ${typeof value}`);
    this.#options.usingArrows = value;
  }
  get wearingArmor() {
    return new Option("wearingArmor", this.#options.wearingArmor || false, "Armor");
  }
  set wearingArmor(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.wearingArmor to be type Boolean. Got ${typeof value}`);
    this.#options.wearingArmor = value;
  }
  get warmClothes() {
    return new Option("warmClothes", this.#options.warmClothes || false);
  }
  set warmClothes(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.warmClothes to be type Boolean. Got ${typeof value}`);
    this.#options.warmClothes = value;
  }
  get lightSource() {
    return new Option("lightSource", this.#options.lightSource || false);
  }
  set lightSource(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.lightSource to be type Boolean. Got ${typeof value}`);
    this.#options.lightSource = value;
  }
  get environmentDark() {
    return new Option("environmentDark", this.#options.environmentDark || false, "Dark");
  }
  set environmentDark(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.environmentDark to be type Boolean. Got ${typeof value}`);
    this.#options.environmentDark = value;
  }
  get environmentCold() {
    return new Option("environmentCold", this.#options.environmentCold || "Mild", "Cold");
  }
  set environmentCold(value) {
    if (typeof value !== "string")
      throw new Error(`Expected state.environmentCold to be type String. Got ${typeof value}`);
    if (!["Mild", "Cold", "Biting"].includes(value))
      throw new Error(`Expected state.environmentCold to be one of "Mild", "Cold" or "Biting". Got ${value}`);
    this.#options.environmentCold = value;
  }
  get environmentRain() {
    return new Option("environmentRain", this.#options.environmentRain || "No Rain", "Rain");
  }
  set environmentRain(value) {
    if (typeof value !== "string")
      throw new Error(`Expected state.environmentRain to be type String. Got ${typeof value}`);
    if (!["No Rain", "Light Rain", "Light Snow", "Heavy Rain", "Heavy Snow"].includes(value))
      throw new Error(
        `Expected state.environmentRain to be one of "No Rain", "Light Rain", "Light Snow", "Heavy Rain" or "Heavy Snow". Got ${value}`
      );
    this.#options.environmentRain = value;
  }
  get environmentWind() {
    return new Option("environmentWind", this.#options.environmentWind || "Light Breeze", "Wind");
  }
  set environmentWind(value) {
    if (typeof value !== "string")
      throw new Error(`Expected state.environmentWind to be type String. Got ${typeof value}`);
    if (!["Light Breeze", "Strong Wind", "Storm"].includes(value))
      throw new Error(
        `Expected state.environmentRain to be one of "Light Breeze", "Strong Wind" or "Storm". Got ${value}`
      );
    this.#options.environmentWind = value;
  }
  get inWater() {
    return new Option("inWater", this.#options.inWater || false, "Water");
  }
  set inWater(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.inWater to be type Boolean. Got "${typeof value}"`);
    this.#options.inWater = value;
  }
  get ownStronghold() {
    return new Option("ownStronghold", this.#options.ownStronghold || false, "Stronghold");
  }
  set ownStronghold(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.ownStronghold to be type Boolean. Got "${typeof value}"`);
    this.#options.ownStronghold = value;
  }
  get haveHirelings() {
    return new Option("haveHirelings", this.#options.haveHirelings || false, "Hirelings");
  }
  set haveHirelings(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.haveHirelings to be type Boolean. Got "${typeof value}"`);
    this.#options.haveHirelings = value;
  }
  get explore() {
    return new Option("explore", this.#options.explore || false);
  }
  set explore(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.explore to be type Boolean. Got "${typeof value}"`);
    this.#options.explore = value;
  }
  get hike() {
    return new Option("hike", this.#options.hike || false);
  }
  set hike(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.hike to be type Boolean. Got "${typeof value}"`);
    this.#options.hike = value;
  }
  get fish() {
    return new Option("fish", this.#options.fish || false);
  }
  set fish(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.fish to be type Boolean. Got "${typeof value}"`);
    this.#options.fish = value;
  }
  get forage() {
    return new Option("forage", this.#options.forage || false);
  }
  set forage(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.forage to be type Boolean. Got "${typeof value}"`);
    this.#options.forage = value;
  }
  get hunt() {
    return new Option("hunt", this.#options.hunt || false);
  }
  set hunt(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.hunt to be type Boolean. Got "${typeof value}"`);
    this.#options.hunt = value;
  }
  get keepWatch() {
    return new Option("keepWatch", this.#options.keepWatch || false);
  }
  set keepWatch(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.keepWatch to be type Boolean. Got "${typeof value}"`);
    this.#options.keepWatch = value;
  }
  get leadTheWay() {
    return new Option("leadTheWay", this.#options.leadTheWay || false);
  }
  set leadTheWay(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.leadTheWay to be type Boolean. Got "${typeof value}"`);
    this.#options.leadTheWay = value;
  }
  get rest() {
    return new Option("rest", this.#options.rest || false);
  }
  set rest(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.rest to be type Boolean. Got "${typeof value}"`);
    this.#options.rest = value;
  }
  get sleep() {
    return new Option("sleep", this.#options.sleep || false);
  }
  set sleep(value) {
    if (typeof value !== "boolean") throw new Error(`Expected state.sleep to be type Boolean. Got "${typeof value}"`);
    this.#options.sleep = value;
  }
  get makeCamp() {
    return new Option("makeCamp", this.#options.makeCamp || false);
  }
  set makeCamp(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.makeCamp to be type Boolean. Got "${typeof value}"`);
    this.#options.makeCamp = value;
  }
  // get bareGroundSleeping() {
  //   return new Option("bareGroundSleeping", this.#options.bareGroundSleeping || false);
  // }

  // get forcedMarch() {
  //   return new Option("forcedMarch", this.#options.forcedMarch || 0);
  // }

  get terrainPlains() {
    return new Option("terrainPlains", this.#options.terrainPlains || false, "Plains");
  }
  set terrainPlains(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.terrainPlains to be type Boolean. Got "${typeof value}"`);
    this.#options.terrainPlains = value;
  }
  get terrainForest() {
    return new Option("terrainForest", this.#options.terrainForest || false, "Forest");
  }
  set terrainForest(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.terrainForest to be type Boolean. Got "${typeof value}"`);
    this.#options.terrainForest = value;
  }
  get terrainDarkForest() {
    return new Option("terrainDarkForest", this.#options.terrainDarkForest || false, "Dark Forest");
  }
  set terrainDarkForest(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.terrainDarkForest to be type Boolean. Got "${typeof value}"`);
    this.#options.terrainDarkForest = value;
  }
  get terrainHills() {
    return new Option("terrainHills", this.#options.terrainHills || false, "Hills");
  }
  set terrainHills(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.terrainHills to be type Boolean. Got "${typeof value}"`);
    this.#options.terrainHills = value;
  }
  get terrainMountains() {
    return new Option("terrainMountains", this.#options.terrainMountains || false, "Mountains");
  }
  set terrainMountains(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.terrainMountains to be type Boolean. Got "${typeof value}"`);
    this.#options.terrainMountains = value;
  }
  get terrainHighMountains() {
    return new Option("terrainHighMountains", this.#options.terrainHighMountains || false, "High Mountains");
  }
  set terrainHighMountains(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.terrainHighMountains to be type Boolean. Got "${typeof value}"`);
    this.#options.terrainHighMountains = value;
  }
  get terrainLakeRiver() {
    return new Option("terrainLakeRiver", this.#options.terrainLakeRiver || false, "Lake / River");
  }
  set terrainLakeRiver(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.terrainLakeRiver to be type Boolean. Got "${typeof value}"`);
    this.#options.terrainLakeRiver = value;
  }
  get terrainMarshlands() {
    return new Option("terrainMarshlands", this.#options.terrainMarshlands || false, "Marshlands");
  }
  set terrainMarshlands(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.terrainMarshlands to be type Boolean. Got "${typeof value}"`);
    this.#options.terrainMarshlands = value;
  }
  get terrainQuagmire() {
    return new Option("terrainQuagmire", this.#options.terrainQuagmire || false, "Quagmire");
  }
  set terrainQuagmire(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.terrainQuagmire to be type Boolean. Got "${typeof value}"`);
    this.#options.terrainQuagmire = value;
  }
  get terrainRuins() {
    return new Option("terrainRuins", this.#options.terrainRuins || false, "Ruins");
  }
  set terrainRuins(value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected state.terrainRuins to be type Boolean. Got "${typeof value}"`);
    this.#options.terrainRuins = value;
  }

  get weather() {
    return new Weather(this.#options.weather) || null;
  }
  set weather(value) {
    if (typeof value !== "object") throw new Error(`Expected state.weather to be type Object. Got "${typeof value}"`);
    if (!value.cold || !value.rain || !value.wind)
      throw new Error(`Expected state.weather to include exactly keys "cold", "rain" and "wind". Got "${value}"`);
    this.#options.weather = value;
  }

  toJSON() {
    return { ...this.#options };
  }
}
