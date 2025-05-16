const upstreamHost = env.UPSTREAM_HOST;
const upstreamPort = env.UPSTREAM_PORT;
const upstreamPath = env.UPSTREAM_PATH || "/";


addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {    

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
