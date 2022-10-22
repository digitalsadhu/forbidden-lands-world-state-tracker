/**
 * @param { import("../../data-structures/selected-options").SelectedOptions } selectedOptions
 * @param { import("../../weather").Weather } weather
 * @param { boolean } dark
 * */
export default (selectedOptions, weather, dark) => {
  const messages = [];

  if (selectedOptions.inWater.value) {
    if (selectedOptions.wearingArmor.value) messages.push("PCs in water and wearing armor must roll ENDURANCE.");
    messages.push("PCs that sink must make an ENDURANCE roll every round to hold their breath.");
  }

  return messages;
};
