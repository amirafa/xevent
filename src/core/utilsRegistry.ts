export type EventInitializer = () => void;

export const utilsRegistry: { events: Record<string, EventInitializer> } = {
  events: {},
};

export function registerEvent(name: string, initializer: EventInitializer) {
  utilsRegistry.events[name] = initializer;
}
