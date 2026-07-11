import type { components } from "../generated/types.ts";
import type { TrustapWebhookEvent } from "./schemas.ts";

export type TrustapTransactionState =
  components["schemas"]["v2_transactions.Status"];

/** Read the authoritative post-event state from an API v2 webhook preview. */
export function mapWebhookToTransactionState(
  event: TrustapWebhookEvent,
): TrustapTransactionState | null {
  return event.target_preview?.status ?? null;
}
