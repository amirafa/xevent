import { ExternalLinkEventDetail } from "../events/externalLink";
import { PageLeaveEventDetail } from "../events/pageLeave";

declare global {
  interface WindowEventMap {
    "external-link": CustomEvent<ExternalLinkEventDetail>;
    "page-leave": CustomEvent<PageLeaveEventDetail>;
  }
}

export {};
