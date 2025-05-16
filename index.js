addEventListener("fetch", event => {
    // Pass both request and env to handleRequest
    event.respondWith(handleRequest(event.request, event.env));
});

async function handleRequest(request, env) {    
    // Read environment variables from the env object
    const upstreamHost = env.UPSTREAM_HOST || "";
    const upstreamPort = env.UPSTREAM_PORT || "";
    const upstreamPath = env.UPSTREAM_PATH || "/";

    let url = new URL(request.url);
    url.hostname = upstreamHost;
    url.port = upstreamPort;
    url.pathname = upstreamPath;
    url.protocol = "http:";

    // Copy the headers and method to preserve the WebSocket handshake
    let newRequest = new Request(url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: "manual"
    });

    // Forward the request to the upstream server
    return fetch(newRequest);
}
