import { registerEvent } from "../core/utilsRegistry";
import { createEventInitializer } from "../core/createEventInitializer";

export const PAGE_LEAVE_EVENT = "page-leave" as const;

export interface PageLeaveEventDetail {
  reason: "unload" | "visibility-hidden";
  originalEvent: Event;
}

export const setupPageLeaveEvent = createEventInitializer(
  PAGE_LEAVE_EVENT,
  () => {
    window.addEventListener("beforeunload", (e) => {
      window.dispatchEvent(
        new CustomEvent<PageLeaveEventDetail>(PAGE_LEAVE_EVENT, {
          detail: { reason: "unload", originalEvent: e }
        })
      );
    });

    document.addEventListener("visibilitychange", (e) => {
      if (document.visibilityState === "hidden") {
        window.dispatchEvent(
          new CustomEvent<PageLeaveEventDetail>(PAGE_LEAVE_EVENT, {
            detail: { reason: "visibility-hidden", originalEvent: e }
          })
        );
      }
    });
  }
);

registerEvent(PAGE_LEAVE_EVENT, setupPageLeaveEvent);
