/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.environmentDark.value && selectedOptions.lightSource.value) {
    return ["A new torch needs to be lit, roll for TORCHES"];
  }
};
