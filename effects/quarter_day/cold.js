export default async (weather, terrain, light, party) => {
  const messages = [];
  if (party.environmentCold) {
    const gear = [];
    if (party.noWarmClothes) {
      gear.push("adequate warm clothing");
    }

    if (party.sleep) {
      gear.push("a camp fire");
    }
    const message = `COLD: PCs without ${gear.join(" or ")} must roll ENDURANCE in cold conditions or become COLD.`;

    if (gear.length > 0) messages.push(message);
  }
  if (party.cold && party.sleep) {
    messages.push("COLD: PCs with the COLD condition that sleep around a campfire are no longer COLD.");
  }

  return messages;
};
