export default async (state) => {
  if (state.keepWatch && state.hike) {
    return ["KEEP WATCH: roll SCOUTING for each hex travelled modified by darkness and weather."];
  }
  if (state.keepWatch) {
    return ["KEEP WATCH: roll SCOUTING modified by darkness and weather."];
  }
};
