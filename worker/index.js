// @ts-check
/// <reference lib="webworker" />

import jwt from "@tsndr/cloudflare-worker-jwt";

const scope = /** @type ServiceWorkerGlobalScope */ (
  /** @type unknown */ (self)
);

scope.addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * @param {Request} request
 */
async function handleRequest(request) {
  const requestUrl = new URL(request.url);
  if (requestUrl.pathname.startsWith("/__secret__")) {
    return new Response("Forbidden", {
      status: 403,
    });
  }
  let targetPathname = requestUrl.pathname;
  const token = requestUrl.searchParams.get("token");
  if (token !== null) {
    try {
      if (await jwt.verify(token, SECRET)) {
        // passed valid JWT via token
        const payload = jwt.decode(token);
        if (typeof payload.clearance === "number" && payload.clearance >= 1) {
          targetPathname = `/__secret__${targetPathname}`;
        }
      }
    } catch {
      return new Response("Invalid token", {
        status: 403,
      });
    }
  }
  const url = new URL(targetPathname, ORIGIN);
  const response = await fetch(url.toString(), {
    headers: request.headers,
  });
  return response;
}
