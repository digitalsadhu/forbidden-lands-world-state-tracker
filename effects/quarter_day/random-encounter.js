export default async (state) => {
  if (state.hike) {
    return ["Roll once per quarter day for a random encounter when on a HIKE."];
  }
};
