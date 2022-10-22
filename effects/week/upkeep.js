/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.ownStronghold.value) {
    return [
      "Roll CRAFTING for stronghold upkeep. This roll automatically fails if noone has spent one quarter day each day on maintenance during the week.",
    ];
  }
};
