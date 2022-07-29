import { WorldStateOptions } from "./world-state-options.js";
import { WorldStateControls } from "./world-state-controls.js";
import { WorldStateNotes } from "./world-state-notes.js";
import { WorldStateTracker } from "./world-state-tracker.js";
import { CalendarDisplay } from "./components/calender-display.js";
import { WeatherDisplay } from "./components/weather-display.js";
import { DayDisplay } from "./components/day-display.js";
import { DaynameDisplay } from "./components/dayname-display.js";
import { SeasonDisplay } from "./components/season-display.js";
import { YearDisplay } from "./components/year-display.js";
import { QuarterDayDisplay } from "./components/quarterday-display.js";
import { StepperControl } from "./components/stepper-control.js";
import { CheckboxControl } from "./components/checkbox-control.js";
import { QuarterDayDisplayNotes } from "./components/quarterday-display-notes.js";

customElements.define("world-state-tracker", WorldStateTracker);
customElements.define("world-state-controls", WorldStateControls);
customElements.define("world-state-notes", WorldStateNotes);
customElements.define("world-state-options", WorldStateOptions);
customElements.define("calendar-display", CalendarDisplay);
customElements.define("weather-display", WeatherDisplay);
customElements.define("day-display", DayDisplay);
customElements.define("dayname-display", DaynameDisplay);
customElements.define("season-display", SeasonDisplay);
customElements.define("year-display", YearDisplay);
customElements.define("quarterday-display", QuarterDayDisplay);
customElements.define("stepper-control", StepperControl);
customElements.define("checkbox-control", CheckboxControl);
customElements.define("quarterday-display-notes", QuarterDayDisplayNotes);
