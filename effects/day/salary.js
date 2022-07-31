import { html } from "../../dependencies/lit-all.min.js";

/**
 * @param { import("../../types").State } state
 */
export default (state) => {
  if (state.haveHirelings.value) {
    return [html`Hirelings require payment of salaries each day.`];
  }
};
