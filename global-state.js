import { Data } from "./data-structures/data.js";

export let data = new Data();

export function restore(data) {
  data = Data.restore(data);
}
