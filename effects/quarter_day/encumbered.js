export default async (weather, terrain, light, party) => {
  if (party.isEncumbered)
    return "Overencumbered PCs that try to HIKE for a quarter day must roll ENDURANCE";
};
