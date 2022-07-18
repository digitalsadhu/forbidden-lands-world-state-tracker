/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  const messages = [];
  if (state.environmentCold) {
    const gear = [];
    if (state.noWarmClothes) {
      gear.push("adequate warm clothing");
    }

    if (state.sleep) {
      gear.push("a camp fire");
    }
    const message = `COLD: PCs without ${gear.join(" or ")} must roll ENDURANCE in cold conditions or become COLD.`;

    if (gear.length > 0) messages.push(message);
  }
  if (state.cold && state.sleep) {
    messages.push("COLD: PCs with the COLD condition that sleep around a campfire are no longer COLD.");
  }

  return messages;
};
