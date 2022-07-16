import { WorldStateOptions } from "./world-state-options.js";
import { WorldStateControls } from "./world-state-controls.js";
import { WorldStateNotes } from "./world-state-notes.js";
import { WorldStateTracker } from "./world-state-tracker.js";

customElements.define("world-state-tracker", WorldStateTracker);
customElements.define("world-state-controls", WorldStateControls);
customElements.define("world-state-notes", WorldStateNotes);
customElements.define("world-state-options", WorldStateOptions);
