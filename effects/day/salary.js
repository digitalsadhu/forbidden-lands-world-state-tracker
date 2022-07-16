export default async (weather, terrain, light, party) => {
  if (party.haveHirelings) {
    return ["Hirelings require payment of salaries each day."];
  }
};
