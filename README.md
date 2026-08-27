# @ranwhenparked/trustap-sdk

[![npm version](https://img.shields.io/npm/v/@ranwhenparked/trustap-sdk.svg)](https://www.npmjs.com/package/@ranwhenparked/trustap-sdk)
[![npm downloads](https://img.shields.io/npm/dm/@ranwhenparked/trustap-sdk.svg)](https://www.npmjs.com/package/@ranwhenparked/trustap-sdk)
[![OpenAPI spec sync](https://github.com/ranwhenparked/trustap-sdk/actions/workflows/check-spec.yml/badge.svg)](https://github.com/ranwhenparked/trustap-sdk/actions/workflows/check-spec.yml)
[![license](https://img.shields.io/npm/l/@ranwhenparked/trustap-sdk.svg)](https://www.npmjs.com/package/@ranwhenparked/trustap-sdk)

Type-safe TypeScript SDK for Trustap API v2, generated from Trustap's OpenAPI specification and including Zod webhook validation.

## Install

```bash
npm install @ranwhenparked/trustap-sdk
```

## Client

```typescript
import {
  createTrustapClient,
  TRUSTAP_BASE_URLS,
} from "@ranwhenparked/trustap-sdk";

const client = createTrustapClient({
  baseUrl: TRUSTAP_BASE_URLS.production,
  auth: { type: "apiKey", apiKey: process.env.TRUSTAP_API_KEY! },
});

const { data: fees, error } = await client.GET("/v2/fees", {
  params: { query: { amount: 10_000, currency: "eur" } },
});
```

The default environment is the sandbox. OAuth access tokens are also supported:

```typescript
const client = createTrustapClient({
  auth: { type: "oauth", accessToken: userAccessToken },
});
```

### Environments

```typescript
TRUSTAP_BASE_URLS.sandbox;    // https://api.test.trustap.com
TRUSTAP_BASE_URLS.production; // https://api.trustap.com
```

The generated paths include the `/v2` prefix, so custom `baseUrl` values should point to the host root.

### Transactions

API v2 uses one transaction resource for shipped and face-to-face exchanges. Transaction IDs are globally unique strings prefixed with `tx_`.

```typescript
if (!fees) throw new Error("Unable to calculate fees");

const { data: transaction } = await client.POST("/v2/transactions", {
  body: {
    role: "seller",
    description: "Trustap socks",
    currency: "eur",
    amount: 10_000,
    fees_buyer: fees.buyer,
    fees_seller: fees.seller,
    fees_config: fees.config,
    contains_shipping: true,
  },
});

console.log(transaction?.id); // tx_...
console.log(transaction?.pricing.amount);
```

A path-based client is also available:

```typescript
import { createTrustapPathClient } from "@ranwhenparked/trustap-sdk";

const client = createTrustapPathClient();
const { data } = await client["/v2/transactions/{transaction_id}"].GET({
  params: { path: { transaction_id: "tx_..." } },
});
```

## Webhooks

The webhook parser accepts the documented API v2 `tx.*` event codes and validates v2 transaction IDs and target previews. Unknown event codes fail validation.

```typescript
import {
  mapWebhookToTransactionState,
  trustapWebhookEventSchema,
} from "@ranwhenparked/trustap-sdk/webhooks";

const result = trustapWebhookEventSchema.safeParse(await request.json());
if (!result.success) throw result.error;

const event = result.data;
console.log(event.code); // tx.paid
console.log(mapWebhookToTransactionState(event)); // paid, or null without a preview
```

Use `createWebhookHandlers` for an exhaustive handler map over all documented v2 event codes.

## Types and subpath imports

```typescript
import type { paths, components } from "@ranwhenparked/trustap-sdk/types";
import { trustapWebhookEventSchema } from "@ranwhenparked/trustap-sdk/webhooks";
```

## Deno

```typescript
import { createTrustapClient } from "./mod.ts";
// or: import { createTrustapClient } from "npm:@ranwhenparked/trustap-sdk";
```

## API reference

- [Trustap API v2 reference](https://docs.trustap.com/apis/openapi)
- [Upgrade guide](https://docs.trustap.com/docs/intro/upgrade)

## License

ISC
