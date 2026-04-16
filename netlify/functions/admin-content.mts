import { getStore } from "@netlify/blobs";
import type { Context, Config } from "@netlify/functions";
import dotenv from "dotenv";

// Load .env for local dev (Netlify production uses dashboard env vars)
dotenv.config();

const STORE_NAME = "admin-data";

function getAdminPassword(): string | undefined {
  return Netlify.env.get("ADMIN_PASSWORD") || process.env.ADMIN_PASSWORD;
}

export default async (req: Request, context: Context) => {
  const store = getStore({ name: STORE_NAME, consistency: "strong" });

  if (req.method === "GET") {
    const overrides = await store.get("content_overrides", { type: "json" });
    const branding = await store.get("branding", { type: "json" });

    return new Response(
      JSON.stringify({
        overrides: overrides ?? {},
        branding: branding ?? {},
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { password, overrides, branding, validate_only } = body;

    const adminPassword = getAdminPassword();
    if (!adminPassword || password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Password validation only — no data write
    if (validate_only) {
      return new Response(
        JSON.stringify({ ok: true }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // Write data to blobs
    if (overrides !== undefined) {
      await store.setJSON("content_overrides", overrides);
    }
    if (branding !== undefined) {
      await store.setJSON("branding", branding);
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/admin-content",
};
