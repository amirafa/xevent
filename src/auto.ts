import "./events/externalLink";
import "./events/pageLeave";

import { setupAllEvents } from "./setupAllEvents";
setupAllEvents();

export const xevent = {
  version: "1.0.1",
  setupAllEvents,
};