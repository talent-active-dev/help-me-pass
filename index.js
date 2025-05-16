export default {
  async fetch(request, env, ctx) {
    // Read environment variables from env
    const upstreamHost = env.UPSTREAM_HOST || "";
    const upstreamPort = env.UPSTREAM_PORT || "";
    const upstreamPath = env.UPSTREAM_PATH || "/";

    // Construct the upstream URL
    let url = new URL(request.url);
    url.hostname = upstreamHost;
    url.port = upstreamPort;
    url.pathname = upstreamPath;
    url.protocol = "http:";

    // Copy headers and method to preserve WebSocket handshake
    let newRequest = new Request(url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "manual"
    });

    // Forward the request to the upstream server
    return await fetch(newRequest);
  }
};
