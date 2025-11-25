# @amirafa/xevent

**xevent** is a lightweight, DOM-first utility library that adds extra browser-like events that you can listen to using the native `addEventListener` API — fully typed in TypeScript.

No dependencies.  
Just plug it into any JS environment and events behave like native browser events.

---

# 🚀 Features

- 🔌 **DOM-native custom events**  
  Listen using `window.addEventListener("event", handler)` — no imports needed.

- 🎯 **Full TypeScript support**  
  Events extend `WindowEventMap` automatically.

- 🧩 **Modular & extensible architecture**  
  Add custom events in a clean, scalable pattern.

- 🔄 **Single initialization**  
  Each event bootstrap runs only once.

- 🌐 **SSR-safe**  
  No errors on server-side rendering environments.

- 🌲 **Tree-shaking friendly**  
  Optional auto-init or manual init — your choice.

---

# 📦 Installation

```bash
npm install @amirafa/xevent
```

---

# 🧠 Usage Example

## Option 1 — **Manual Initialization (Tree-shaking Friendly)**

```ts
import { setupAllEvents } from "@amirafa/xevent";

setupAllEvents(); // enables all events
```

## Option 2 — **Auto Initialization (Simple Mode)**

```ts
import "@amirafa/xevent/auto"; // initializes all events automatically
```

## Option 3 — **Single Event Only**

```ts
import { setupExternalLinkEvent } from "@amirafa/xevent";

setupExternalLinkEvent();
```

---

# 🎧 Listening to Events

### `"external-link"`

```ts
window.addEventListener("external-link", (e) => {
  console.log("External link:", e.detail.href);
});
```

### `"page-leave"`

```ts
window.addEventListener("page-leave", (e) => {
  console.log("Leaving page:", e.detail.reason);
});
```

---

# 📜 Current Events

### 1. `external-link`

Fires when the user clicks a link pointing **outside the current domain**.

```ts
{
  href: string;
  target: string | null;
  originalEvent: MouseEvent;
}
```

---

### 2. `page-leave`

Fires when the user:

- closes the tab  
- refreshes  
- switches tabs  
- navigates away  

```ts
{
  reason: "unload" | "visibility-hidden";
  originalEvent: Event;
}
```

---

# ➕ Adding New Events

Adding a new event is easy thanks to the shared initializer system.

---

## 1️⃣ Step 1 — Create a new event file

Create:

```
src/events/<yourEvent>.ts
```

Example:

```ts
import { registerEvent } from "../core/utilsRegistry";
import { createEventInitializer } from "../core/createEventInitializer";

export const SCROLL_END_EVENT = "scroll-end" as const;

export interface ScrollEndEventDetail {
  lastScrollY: number;
}

export const setupScrollEndEvent = createEventInitializer(
  SCROLL_END_EVENT,
  () => {
    let timeout: any;

    window.addEventListener("scroll", () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent<ScrollEndEventDetail>(SCROLL_END_EVENT, {
            detail: { lastScrollY: window.scrollY }
          })
        );
      }, 120);
    });
  }
);

registerEvent(SCROLL_END_EVENT, setupScrollEndEvent);
```

---

## 2️⃣ Step 2 — Add Type Support

Edit:

```
src/types/global.d.ts
```

Add:

```ts
import { ScrollEndEventDetail } from "../events/scrollEnd";

declare global {
  interface WindowEventMap {
    "scroll-end": CustomEvent<ScrollEndEventDetail>;
  }
}
```

---

## 3️⃣ Step 3 — Export It

In:

```
src/index.ts
```

Add:

```ts
export * from "./events/scrollEnd";
```

---

## 4️⃣ Step 4 — Document It (README)

```md
### 3. `scroll-end`
Fires when scrolling stops.

Event detail:
```ts
{
  lastScrollY: number;
}
```

---

# 🤝 Contributing

1. Add your event under `src/events/`
2. Register it with `registerEvent`
3. Add typings in `global.d.ts`
4. Export it from `index.ts`
5. Update README

---

# 📜 License

MIT