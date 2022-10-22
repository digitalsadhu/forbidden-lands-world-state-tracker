/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.environmentCold.value && !selectedOptions.warmClothes.value)
    return ["PCs without adequate warm clothing must roll ENDURANCE."];
};
