/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.poisoned.value)
    return [
      "Poisoned PCs take 1 damage each round until broken to Strength (lethal), Agility (paralyzing), Wits (Sleeping) or Empathy (Hallucinogenic)",
    ];
};
