export function createEventInitializer(name: string, init: () => void) {
  return function initialize() {
    if (typeof window === "undefined") return;
    const key = `__${name}_initialized__`;
    if ((window as any)[key]) return;
    (window as any)[key] = true;
    init();
  };
}
