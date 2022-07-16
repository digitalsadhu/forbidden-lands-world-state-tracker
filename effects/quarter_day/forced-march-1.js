export default async (weather, terrain, light, party) => {
  if (party.forcedMarch === 1) {
    return ["PCs making a forced march of 1 extra quarter day must roll ENDURANCE"];
  }
};
