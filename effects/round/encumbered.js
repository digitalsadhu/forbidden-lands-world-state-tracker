export default async (state) => {
  if (state.overEncumbered) return ["Overencumbered PCs that try to RUN must roll ENDURANCE"];
};
