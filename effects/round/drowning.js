/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  const messages = [];

  if (state.inWater.value) {
    if (state.wearingArmor.value) messages.push("PCs in water and wearing armor must roll ENDURANCE.");
    messages.push("PCs that sink must make an ENDURANCE roll every round to hold their breath.");
  }

  return messages;
};
