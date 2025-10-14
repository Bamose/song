export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve built static assets; fall back to SPA index.html for unknown routes.
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url, request));
  },
};
