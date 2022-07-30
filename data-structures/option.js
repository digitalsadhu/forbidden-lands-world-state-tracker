/**
 * "Safer" String.toLowerCase()
 */
function lowerCase(str) {
  return str.toLowerCase();
}

/**
 * "Safer" String.toUpperCase()
 */
function upperCase(str) {
  return str.toUpperCase();
}

function unCamelCase(str) {
  str = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, "$1 $2");
  str = str.toLowerCase(); //add space between camelCase text
  return str;
}

/**
 * UPPERCASE first char of each sentence and lowercase other chars.
 */
function sentenceCase(str) {
  // Replace first char of each sentence (new line or after '.\s+') to
  // UPPERCASE
  return lowerCase(str).replace(/(^\w)|\.\s+(\w)/gm, upperCase);
}

export class Option {
  constructor(key = "", value = null, displayName = null) {
    this.#key = key;
    this.#value = value;
    this.#displayName = displayName;
  }

  get name() {
    return this.#key;
  }

  get displayName() {
    if (this.#displayName) return this.#displayName;
    return sentenceCase(unCamelCase(this.#key));
  }

  get value() {
    return this.#value;
  }

  toJSON() {
    return {
      name: this.name,
      value: this.value,
    };
  }
}
