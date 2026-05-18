# @ranwhenparked/trustap-sdk

[![npm version](https://img.shields.io/npm/v/@ranwhenparked/trustap-sdk.svg)](https://www.npmjs.com/package/@ranwhenparked/trustap-sdk)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Type-safe TypeScript SDK for the [Trustap API](https://trustap.com) with webhook validation.

## Overview

Trustap provides escrow and payment protection for peer-to-peer and marketplace transactions. This SDK offers:

- **Type-safe API client** built on [openapi-fetch](https://openapi-ts.dev/openapi-fetch/) with auto-generated types
- **Webhook validation** using Zod schemas with TypeScript exhaustiveness checking
- **Transaction state machine** for tracking transaction lifecycle
- **Dual runtime support** for Node.js and Deno

## Installation

```bash
npm install @ranwhenparked/trustap-sdk
```

```bash
yarn add @ranwhenparked/trustap-sdk
```

```bash
pnpm add @ranwhenparked/trustap-sdk
```

## Quick Start

```typescript
import { createTrustapClient, TRUSTAP_BASE_URLS } from "@ranwhenparked/trustap-sdk";

const client = createTrustapClient({
  baseUrl: TRUSTAP_BASE_URLS.production,
  auth: { type: "apiKey", apiKey: "your-api-key" },
});

// Calculate transaction fees
const { data, error } = await client.GET("/api/v1/charge", {
  params: {
    query: { price: 10000, currency: "USD" },
  },
});
```

## Authentication

### API Key (Server-side)

Use API key authentication for server-to-server requests:

```typescript
const client = createTrustapClient({
  auth: { type: "apiKey", apiKey: process.env.TRUSTAP_API_KEY },
});
```

### OAuth (User-authenticated)

Use OAuth for requests on behalf of authenticated users:

```typescript
const client = createTrustapClient({
  auth: { type: "oauth", accessToken: userAccessToken },
});
```

## Client Usage

### Standard Client

```typescript
import { createTrustapClient } from "@ranwhenparked/trustap-sdk";

const client = createTrustapClient({
  baseUrl: TRUSTAP_BASE_URLS.staging, // or .production
  auth: { type: "apiKey", apiKey: "..." },
});

// Fully typed request/response
const { data, error } = await client.GET("/api/v1/me/transactions");
```

### Path-based Client

```typescript
import { createTrustapPathClient } from "@ranwhenparked/trustap-sdk";

const client = createTrustapPathClient({ /* options */ });

// Alternative syntax
const { data } = await client["/api/v1/me/transactions"].GET();
```

### Face-to-Face (F2F / p2p) Transactions

The standard client includes the Trustap F2F transaction endpoints from the OpenAPI spec. Use the `/api/v1/p2p/...` paths directly or the exported `TRUSTAP_F2F_PATHS` constants.

```typescript
import { createTrustapClient, TRUSTAP_F2F_PATHS } from "@ranwhenparked/trustap-sdk";

const client = createTrustapClient({ /* options */ });

const { data: charge } = await client.GET(TRUSTAP_F2F_PATHS.charge, {
  params: {
    query: { price: 1234, currency: "eur" },
  },
});

if (!charge) throw new Error("Unable to calculate F2F charge");

const { data: transaction, error } = await client.POST(
  TRUSTAP_F2F_PATHS.transactions,
  {
    body: {
      role: "seller",
      description: "Soccer ticket",
      currency: "eur",
      deposit_price: 1234,
      deposit_charge: charge.charge,
      charge_calculator_version: charge.charge_calculator_version,
      skip_remainder: true,
    },
  },
);
```

Covered F2F paths include charge calculation, create/list/get/batch transactions, create-and-join, guest-user flows, deposit acceptance/payment method, handover confirmation, complaints, metadata, claim-secret, and join-code endpoints.

### Environments

```typescript
import { TRUSTAP_BASE_URLS } from "@ranwhenparked/trustap-sdk";

TRUSTAP_BASE_URLS.staging    // https://dev.stage.trustap.com
TRUSTAP_BASE_URLS.production // https://dev.trustap.com
```

## Webhook Handling

### Parsing Events

```typescript
import { trustapWebhookEventSchema } from "@ranwhenparked/trustap-sdk";

async function handleWebhook(req: Request) {
  const body = await req.json();
  const result = trustapWebhookEventSchema.safeParse(body);

  if (!result.success) {
    // Unknown or malformed event - fails loudly, no silent fallbacks
    console.error("Invalid webhook:", result.error);
    return;
  }

  const event = result.data;
  // event.code is narrowed to specific event types
}
```

### Type-safe Handlers

Create handlers with compile-time exhaustiveness checking:

```typescript
import { createOnlineWebhookHandlers, type TrustapWebhookEvent } from "@ranwhenparked/trustap-sdk";

const handlers = createOnlineWebhookHandlers({
  "basic_tx.joined": (event) => {
    console.log("Seller joined:", event.target_preview.joined);
  },
  "basic_tx.paid": (event) => {
    console.log("Payment received:", event.target_preview.paid);
  },
  "basic_tx.tracked": (event) => {
    console.log("Tracking:", event.target_preview.tracking);
  },
  // TypeScript errors if any event type is missing
  // ... all 18 event types must be handled
});

function processEvent(event: TrustapWebhookEvent) {
  handlers[event.code](event as any);
}
```

### Switch with Exhaustiveness

```typescript
import { assertNever, type TrustapWebhookEvent } from "@ranwhenparked/trustap-sdk";

function handleEvent(event: TrustapWebhookEvent) {
  switch (event.code) {
    case "basic_tx.joined":
      return handleJoined(event);
    case "basic_tx.paid":
      return handlePaid(event);
    // ... handle all cases
    default:
      assertNever(event); // Compile error if any case is missing
  }
}
```

### State Machine

Map webhook events to transaction states:

```typescript
import { mapWebhookToOnlineState } from "@ranwhenparked/trustap-sdk";

const state = mapWebhookToOnlineState("basic_tx.paid");
// Returns: "paid"
```

## Subpath Imports

Import only what you need:

```typescript
// Full SDK
import { createTrustapClient, trustapWebhookEventSchema } from "@ranwhenparked/trustap-sdk";

// Webhooks only (smaller bundle)
import { trustapWebhookEventSchema, createOnlineWebhookHandlers } from "@ranwhenparked/trustap-sdk/webhooks";

// Types only (no runtime code)
import type { paths, components } from "@ranwhenparked/trustap-sdk/types";
```

## Deno

```typescript
import { createTrustapClient } from "./mod.ts";

// Or from npm
import { createTrustapClient } from "npm:@ranwhenparked/trustap-sdk";
```

## API Reference

This SDK's types are auto-generated from the [Trustap OpenAPI specification](https://docs.trustap.com). For endpoint documentation, see the [Trustap API docs](https://docs.trustap.com).

## License

ISC
