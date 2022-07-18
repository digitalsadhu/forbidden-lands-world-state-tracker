export default async (state) => {
  if (state.forcedMarch === 1) {
    return ["PCs making a forced march of 1 extra quarter day must roll ENDURANCE"];
  }
};
