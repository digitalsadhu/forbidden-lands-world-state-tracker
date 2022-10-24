/** @type {Map<string, Database>} */
let database = new Map();

export class Database extends EventTarget {
  #namespace = "";
  /**
   * Initializes and returns the database.
   * Creates a new instance of Database if none yet exist otherwise returns
   * the existing Database instance.
   * @param {string} namespace
   * @returns {Database}
   */
  static initialize(namespace) {
    if (!database.has(namespace)) database.set(namespace, new Database(namespace));
    // @ts-ignore
    return database.get(namespace);
  }

  /**
   * @param {string} namespace
   */
  constructor(namespace) {
    super();
    this.#namespace = namespace;
  }

  /**
   * Set a value by key in the database under a namespace
   * Emits a "write" event with the key and value
   * @param {string} key
   * @param {any} value
   */
  async set(key, value) {
    window.localStorage.setItem(`${this.#namespace}:${key}`, JSON.stringify(value));
    this.dispatchEvent(new CustomEvent("write", { detail: { key, value } }));
  }

  /**
   * Check if a value exists by given key within a database namespace
   * @param {string} key
   * @returns {Promise<boolean>}
   */
  async has(key) {
    const raw = window.localStorage.getItem(`${this.#namespace}:${key}`);
    return typeof raw !== "undefined" && raw !== null;
  }

  /**
   * Read a value from the database namespace by key
   * Emits a "read" event with the key and value
   * @param {string} key
   * @returns {Promise<any>}
   */
  async get(key) {
    const raw = window.localStorage.getItem(`${this.#namespace}:${key}`);
    if (!raw) {
      throw new Error(
        `No stored value was found for key "${key}" when fetching from database with namespace "${this.#namespace}"`
      );
    }
    let value;
    try {
      value = JSON.parse(raw || "");
    } catch (err) {
      value = raw;
    }
    this.dispatchEvent(new CustomEvent("read", { detail: { key, value } }));
    return value;
  }
}
