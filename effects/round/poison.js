/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.poisoned.value)
    return [
      "Poisoned PCs take 1 damage each round until broken to Strength (lethal), Agility (paralyzing), Wits (Sleeping) or Empathy (Hallucinogenic)",
    ];
};
