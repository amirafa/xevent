import { registerEvent } from "../core/utilsRegistry";
import { createEventInitializer } from "../core/createEventInitializer";

export const EXTERNAL_LINK_EVENT = "external-link" as const;

export interface ExternalLinkEventDetail {
  href: string;
  target: string | null;
  originalEvent: MouseEvent;
}

export const setupExternalLinkEvent = createEventInitializer(
  EXTERNAL_LINK_EVENT,
  () => {
    document.addEventListener("click", (e) => {
      const link = (e.target as HTMLElement)?.closest("a") as HTMLAnchorElement | null;
      if (!link) return;

      const isExternal =
        link.host !== location.host &&
        !link.href.startsWith("mailto:") &&
        !link.href.startsWith("tel:");

      if (!isExternal) return;

      window.dispatchEvent(
        new CustomEvent<ExternalLinkEventDetail>(EXTERNAL_LINK_EVENT, {
          detail: {
            href: link.href,
            target: link.target || null,
            originalEvent: e
          }
        })
      );
    });
  }
);

registerEvent(EXTERNAL_LINK_EVENT, setupExternalLinkEvent);
