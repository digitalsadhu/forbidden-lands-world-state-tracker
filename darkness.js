const seasonBoundaries = [
  [91, 1],
  [183, 2],
  [274, 3],
  [365, 4],
];

const seasons = {
  1: "Spring",
  2: "Summer",
  3: "Fall",
  4: "Winter",
};

function getDay(datestamp) {
  let dayNum = datestamp % 365;
  if (dayNum === 0) dayNum = 365;
  return dayNum;
}

function getSeason(datestamp) {
  const day = getDay(datestamp);
  for (const [boundary, seasonNum] of seasonBoundaries) {
    if (day <= boundary) {
      return seasons[seasonNum];
    }
  }
}

export class Darkness {
  static calculateDarkness(datestamp, quarterDay) {
    const season = getSeason(datestamp);
    let dark = false;
    if (season === "Spring") {
      if ([3, 4].includes(quarterDay)) {
        dark = true;
      }
    }
    if (season === "Summer") {
      if ([4].includes(quarterDay)) {
        dark = true;
      }
    }
    if (season === "Fall") {
      if ([3, 4].includes(quarterDay)) {
        dark = true;
      }
    }
    if (season === "Winter") {
      if ([1, 3, 4].includes(quarterDay)) {
        dark = true;
      }
    }

    return dark;
  }
}
