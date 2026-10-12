import assert from "node:assert/strict";
import { test } from "node:test";
import express from "express";
import type { AddressInfo } from "node:net";
import { createContactRouter } from "./contact";

const valid = {
  first_name: " Test ",
  last_name: " Visitor ",
  email: "visitor@example.com",
  client_comments: " Please help with training. ",
  language: "en",
  website: "",
  utm_url: "https://learnpack.example/contact",
};

async function withEndpoint(
  transport: typeof fetch,
  run: (post: (body: unknown, headers?: Record<string, string>) => Promise<Response>) => Promise<void>,
) {
  const app = express();
  app.use(express.json());
  app.use("/api/contact", createContactRouter(transport, "https://breathecode.example/"));
  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const { port } = server.address() as AddressInfo;
  try {
    await run((body, headers = {}) => fetch(`http://127.0.0.1:${port}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    }));
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

test("forwards a validated lead with fixed routing and no credentials or private upstream data", async () => {
  let calls = 0;
  await withEndpoint(async (url, options) => {
    calls++;
    assert.equal(url, "https://breathecode.example/v1/marketing/lead");
    assert.equal(options?.method, "POST");
    assert.equal(new Headers(options?.headers).has("Authorization"), false);
    assert.deepEqual(JSON.parse(String(options?.body)), {
      first_name: "Test",
      last_name: "Visitor",
      email: valid.email,
      client_comments: "Please help with training.",
      language: "en",
      utm_url: valid.utm_url,
      location: "learnpack",
      tags: "contact-us",
    });
    assert.ok(options?.signal);
    return Response.json({ id: 123, private_data: "must not be returned" }, { status: 201 });
  }, async (post) => {
    const response = await post({ ...valid, location: "wrong", tags: "wrong", extra: "ignore" });
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), {
      message: "Your message has been received. Our team will be in touch.",
    });
  });
  assert.equal(calls, 1);
});

test("rejects missing, invalid, whitespace-only, and oversized fields without forwarding", async () => {
  await withEndpoint(async () => { throw new Error("Must not forward invalid submissions"); }, async (post) => {
    for (const body of [
      {},
      { ...valid, email: "not-an-email" },
      { ...valid, first_name: "   " },
      { ...valid, client_comments: "x".repeat(1001) },
    ]) {
      const response = await post(body);
      assert.equal(response.status, 400);
      const data = await response.json();
      assert.ok(Object.keys(data.errors).length);
    }
  });
});

test("discards honeypot submissions without forwarding", async () => {
  await withEndpoint(async () => { throw new Error("Must not forward spam"); }, async (post) => {
    assert.equal((await post({ ...valid, website: "https://spam.example" })).status, 200);
  });
});

test("rate limits repeated attempts", async () => {
  let calls = 0;
  await withEndpoint(async () => {
    calls++;
    return Response.json({ id: calls }, { status: 201 });
  }, async (post) => {
    for (let index = 0; index < 5; index++) assert.equal((await post(valid)).status, 201);
    const response = await post(valid);
    assert.equal(response.status, 429);
    assert.ok(Number(response.headers.get("Retry-After")) > 0);
  });
  assert.equal(calls, 5);
});

test("does not report success for upstream rejection, missing saved ID, invalid JSON, or network failure", async () => {
  for (const transport of [
    async () => Response.json({ detail: "private upstream error" }, { status: 400 }),
    async () => Response.json({ id: 1 }, { status: 200 }),
    async () => Response.json({ ...valid }, { status: 201 }),
    async () => new Response("not JSON", { status: 201 }),
    async () => { throw new Error("timeout"); },
  ]) {
    await withEndpoint(transport, async (post) => {
      const response = await post(valid);
      assert.equal(response.status, 502);
      assert.equal(JSON.stringify(await response.json()).includes("private upstream"), false);
    });
  }
});

test("rejects cross-site submissions and returns Spanish validation messages", async () => {
  await withEndpoint(async () => { throw new Error("Must not forward"); }, async (post) => {
    assert.equal((await post(valid, { "Sec-Fetch-Site": "cross-site" })).status, 403);
    const response = await post({ ...valid, language: "es", email: "invalid" });
    assert.equal(response.status, 400);
    assert.equal((await response.json()).errors.email, "Escribe una dirección de correo válida.");
  });
});
