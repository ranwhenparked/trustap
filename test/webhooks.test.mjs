import assert from "node:assert/strict";
import test from "node:test";
import {
  TRUSTAP_BASE_URLS,
  createApiKeyAuthHeader,
  mapWebhookToTransactionState,
  trustapWebhookEventSchema,
} from "../dist/index.js";

const paidEvent = {
  code: "tx.paid",
  user_id: "1-buyer",
  target_id: "tx_01kq9gj63sf4pbpesq9kna5ysa",
  target_preview: {
    buyer: { id: "1-buyer", is_guest: true },
    client_id: "client",
    deadlines: { complaints: null },
    description: "Trustap socks",
    events: {
      by_key: { created: "2026-04-28T07:41:21Z", paid: "2026-04-28T07:41:25Z" },
      by_time: [
        { at: "2026-04-28T07:41:21Z", code: "created" },
        { at: "2026-04-28T07:41:25Z", by: "1-buyer", code: "paid" },
      ],
    },
    id: "tx_01kq9gj63sf4pbpesq9kna5ysa",
    pricing: {
      amount: 1000,
      amount_extra: 0,
      currency: "eur",
      fees: { buyer: 50, buyer_client: 0, seller: 0, seller_client: 0 },
    },
    seller: { id: "1-seller", is_guest: true },
    status: "paid",
  },
  time: "2026-04-28T07:41:25.213691597Z",
  metadata: {},
};

test("uses the API v2 environments and API-key auth", () => {
  assert.equal(TRUSTAP_BASE_URLS.sandbox, "https://api.test.trustap.com");
  assert.equal(TRUSTAP_BASE_URLS.production, "https://api.trustap.com");
  assert.equal(createApiKeyAuthHeader("secret"), "Basic c2VjcmV0Og==");
});

test("parses v2 webhook payloads and exposes their resulting state", () => {
  const event = trustapWebhookEventSchema.parse(paidEvent);
  assert.equal(mapWebhookToTransactionState(event), "paid");

  const eventWithoutPreview = trustapWebhookEventSchema.parse({
    code: "tx.funds_released",
    target_id: "tx_01kq9gj63sf4pbpesq9kna5ysa",
    time: "2026-04-28T07:41:25Z",
  });
  assert.equal(mapWebhookToTransactionState(eventWithoutPreview), null);
});

test("validates event-specific target previews", () => {
  for (const [code, status] of [
    ["tx.complained", "complaint_submitted"],
    ["tx.tracked", "tracked"],
  ]) {
    assert.equal(
      trustapWebhookEventSchema.safeParse({
        ...paidEvent,
        code,
        target_preview: { ...paidEvent.target_preview, status },
      }).success,
      false,
    );
  }
});

test("rejects v1 webhook codes and transaction IDs", () => {
  assert.equal(
    trustapWebhookEventSchema.safeParse({
      ...paidEvent,
      code: "basic_tx.paid",
      target_id: "32698",
    }).success,
    false,
  );
});
