/**
 * @param { import("../../types").State } state
 */
export default async (state) => {
  if (state.poisoned)
    return [
      "Poisoned PCs take 1 damage each round until broken to Strength (lethal), Agility (paralyzing), Wits (Sleeping) or Empathy (Hallucinogenic)",
    ];
};
