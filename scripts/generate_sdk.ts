#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net
/**
 * Script: scripts/generate_sdk.ts
 * --------------------------------
 * Generates a full, conventional TypeScript SDK from the local openapi.json.
 * It relies on `openapi-typescript-codegen` (fetched from npm) which produces
 * strongly-typed models and a client with one function per operation.
 *
 * Usage:
 *   deno run -A scripts/generate_sdk.ts
 *
 * After running, import the generated client:
 *   import { Api } from "../sdk/index.ts";
 *
 *   const api = new Api({ baseUrl: "https://dev.stage.trustap.com/api/v1", fetch });
 *   const res = await api.basic.getTransactions();
 */

// @ts-nocheck

import { walk } from "https://deno.land/std@0.212.0/fs/walk.ts";
import { generate } from "npm:openapi-typescript-codegen@0.27.0";

// Adding .ts extensions to imports makes the SDK compatible with Deno
async function addTsExtensionsToImports() {
  for await (const entry of walk("sdk", { exts: [".ts"] })) {
    if (!entry.isFile) continue;
    
    const content = await Deno.readTextFile(entry.path);
    const updatedContent = content.replace(
      /(from\s+['"]\..*?)(['"])/g,
      "$1.ts$2"
    );
    
    if (content !== updatedContent) {
      await Deno.writeTextFile(entry.path, updatedContent);
      console.log(`✓ Added .ts extensions to imports in ${entry.path}`);
    }
  }
}

await generate({
  input: "https://docs.trustap.com/_spec/apis/openapi.json",
  output: "sdk",
  clientName: "Trustap",
  httpClient: "fetch", // Deno/Fetch API compatible client
  useUnionTypes: true,
  useOptions: true,
});

// Add .ts extensions to all local imports
await addTsExtensionsToImports();

console.log("✅ SDK generated in ./sdk")