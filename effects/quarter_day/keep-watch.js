export default async (weather, terrain, light, party) => {
  if (party.keepWatch && party.hike) {
    return ["KEEP WATCH: roll SCOUTING for each hex travelled modified by darkness and weather."];
  }
  if (party.keepWatch) {
    return ["KEEP WATCH: roll SCOUTING modified by darkness and weather."];
  }
};
