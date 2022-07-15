export default async (weather, terrain, light, party) => {
  if (party.isPoisoned)
    return "Poisoned PCs take 1 damage each round until broken to Strength (lethal), Agility (paralyzing), Wits (Sleeping) or Empathy (Hallucinogenic)";
};
