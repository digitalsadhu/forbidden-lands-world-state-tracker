const backgroundClasses = [
  "plains",
  "forest",
  "dark-forest",
  "hills",
  "mountains",
  "high-mountains",
  "lake",
  "river",
  "marshlands",
  "quagmire",
  "ruins",
];

class Background {
  background = null;
  set(name) {
    document.body.classList.remove(...backgroundClasses);
    this.background = name;
    document.body.classList.add(name);
  }
  clear() {
    document.body.classList.remove(...backgroundClasses);
    this.background = null;
  }
}

export const background = new Background();
