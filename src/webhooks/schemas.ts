import { z } from "zod/v4";
import type { components } from "../generated/types.ts";

export const trustapTransactionStatusSchema: z.ZodType<
  components["schemas"]["v2_transactions.Status"]
> = z.enum([
  "created",
  "joined",
  "rejected",
  "cancelled",
  "paid",
  "review_flagged",
  "payment_accepted",
  "complaint_submitted",
  "complaint_period_ended",
  "refunded",
  "buyer_handover_confirmed",
  "seller_handover_confirmed",
  "tracked",
  "delivered",
  "funds_released",
  "claimed_by_buyer",
  "claimed_by_seller",
]);

const transactionUserSchema = z.object({
  id: z.string(),
  is_guest: z.boolean(),
});

const transactionEventsSchema = z.object({
  by_key: z.looseObject({ created: z.string() }),
  by_time: z.array(
    z.object({
      at: z.string(),
      by: z.string().optional(),
      code: z.string(),
    }),
  ),
});

const transactionPricingSchema = z.object({
  amount: z.number().int(),
  amount_extra: z.number().int(),
  amount_postage: z.number().int().optional(),
  currency: z.string(),
  fees: z.object({
    buyer: z.number().int(),
    buyer_client: z.number().int(),
    international_payment: z.number().int().optional(),
    seller: z.number().int(),
    seller_client: z.number().int(),
  }),
  postage_bearer: z.enum(["buyer", "seller", "client"]).optional(),
});

/** The stable API v2 transaction fields included in webhook target previews. */
export const trustapTransactionPreviewSchema = z.looseObject({
  buyer: transactionUserSchema.optional(),
  client_id: z.string(),
  deadlines: z.object({ complaints: z.string().nullable().optional() }),
  description: z.string(),
  events: transactionEventsSchema,
  id: z.string().startsWith("tx_"),
  pricing: transactionPricingSchema,
  seller: transactionUserSchema.optional(),
  status: trustapTransactionStatusSchema,
});

/** Transaction webhook codes documented for API v2. */
export const trustapWebhookEventCodes = [
  "tx.cancelled",
  "tx.claimed",
  "tx.payment_failed",
  "tx.paid",
  "tx.payment_review_flagged",
  "tx.funds_refunded",
  "tx.payment_accepted",
  "tx.handover_confirmed",
  "tx.complained",
  "tx.funds_released",
  "tx.refund_issued",
  "tx.tracked",
  "tx.delivered",
] as const;

export type TrustapWebhookEventCode =
  (typeof trustapWebhookEventCodes)[number];

/** Unknown event codes fail validation rather than being silently accepted. */
export const trustapWebhookEventSchema = z.looseObject({
  code: z.enum(trustapWebhookEventCodes),
  user_id: z.string().nullable().optional(),
  target_id: z.string().startsWith("tx_"),
  target_preview: trustapTransactionPreviewSchema.optional(),
  time: z.string(),
  metadata: z.looseObject({}).optional(),
});

export type TrustapWebhookEvent = z.infer<typeof trustapWebhookEventSchema>;
export type TrustapWebhookEventFor<TCode extends TrustapWebhookEventCode> = Omit<
  TrustapWebhookEvent,
  "code"
> & { code: TCode };

type WebhookEventHandler<TCode extends TrustapWebhookEventCode> = (
  event: TrustapWebhookEventFor<TCode>,
) => Promise<void> | void;

export type TrustapWebhookHandlers = {
  [TCode in TrustapWebhookEventCode]: WebhookEventHandler<TCode>;
};

export function createWebhookHandlers(
  handlers: TrustapWebhookHandlers,
): TrustapWebhookHandlers {
  return handlers;
}

export function assertNever(value: never): never {
  throw new Error(`Unhandled webhook event: ${JSON.stringify(value)}`);
}
