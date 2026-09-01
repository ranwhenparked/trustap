import assert from "node:assert/strict";
import { test } from "node:test";

import {
  createTrustapClient,
  createTrustapPathClient,
} from "../dist/index.js";

test("bodyless POST requests include JSON content type", async () => {
  let request;
  const client = createTrustapClient({
    auth: { apiKey: "test-key", type: "apiKey" },
    fetch: async (input) => {
      request = input;
      return Response.json({});
    },
  });

  await client.POST("/v2/transactions/{transaction_id}/accept_payment", {
    params: { path: { transaction_id: "tx_1" } },
  });

  assert.equal(request.headers.get("content-type"), "application/json");
});

test("caller headers override defaults while SDK auth wins", async () => {
  let request;
  const client = createTrustapClient({
    auth: { apiKey: "test-key", type: "apiKey" },
    fetch: async (input) => {
      request = input;
      return Response.json({});
    },
    headers: {
      Authorization: "Bearer caller-value",
      "Content-Type": "application/vnd.test+json",
      "X-Test": "caller-value",
    },
  });

  await client.POST("/v2/transactions/{transaction_id}/accept_payment", {
    params: { path: { transaction_id: "tx_1" } },
  });

  assert.equal(request.headers.get("content-type"), "application/vnd.test+json");
  assert.equal(request.headers.get("x-test"), "caller-value");
  assert.match(request.headers.get("authorization"), /^Basic /);
});

test("path-based client includes JSON content type", async () => {
  let request;
  const client = createTrustapPathClient({
    fetch: async (input) => {
      request = input;
      return Response.json({});
    },
  });

  await client["/v2/transactions/{transaction_id}/accept_payment"].POST({
    params: { path: { transaction_id: "tx_1" } },
  });

  assert.equal(request.headers.get("content-type"), "application/json");
});
