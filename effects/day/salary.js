export default async (state) => {
  if (state.haveHirelings) {
    return ["Hirelings require payment of salaries each day."];
  }
};
