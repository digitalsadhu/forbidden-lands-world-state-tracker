export default async (weather, terrain, light, party) => {
  if (party.forcedMarch === 2) {
    return ["PCs making a forced march of 2 extra quarter days must roll ENDURANCE -2"];
  }
};
