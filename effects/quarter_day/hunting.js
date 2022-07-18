export default async (state) => {
  if (state.hunt) {
    return ["HUNTING: Roll SURVIVAL."];
  }
};
