/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  if (selectedOptions.environmentDark.value && !selectedOptions.lightSource.value)
    return [
      "PCs without a light source must make a MOVE roll when they RUN in the dark (1 point of damage if they fail).",
    ];
};
