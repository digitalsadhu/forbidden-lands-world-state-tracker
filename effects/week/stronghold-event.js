/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.ownStronghold.value) {
    return ["Roll for a stronghold event each week (p12 Gamemasters guide)."];
  }
};
