import { utilsRegistry } from "./core/utilsRegistry";

export function setupAllEvents() {
  for (const name in utilsRegistry.events) {
    const initializer = utilsRegistry.events[name];
    if (typeof initializer === "function") {
      initializer();
    }
  }
}