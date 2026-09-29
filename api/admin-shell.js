const ORIGIN = "https://apex-media-studio.cgpt87227.chatgpt.site";

export default async function handler(request, response) {
  const requestedPath = String(request.query.path || "admin").replace(/^\/+/, "");
  const incomingUrl = new URL(request.url, "https://apexmedias.in");
  incomingUrl.searchParams.delete("path");
  const search = incomingUrl.search;
  const upstreamUrl = ORIGIN + "/" + requestedPath + search;

  const headers = new Headers();
  for (const name of ["cookie", "accept", "accept-language", "user-agent", "rsc", "next-router-state-tree", "next-url"]) {
    const value = request.headers[name];
    if (value) headers.set(name, Array.isArray(value) ? value.join(",") : value);
  }

  const upstream = await fetch(upstreamUrl, {
    method: request.method,
    headers,
    redirect: "manual"
  });

  const contentType = upstream.headers.get("content-type") || "";
  const body = await upstream.arrayBuffer();

  response.status(upstream.status);
  for (const name of ["content-type", "cache-control", "location", "set-cookie", "vary"]) {
    const value = upstream.headers.get(name);
    if (value) response.setHeader(name, value);
  }

  if (!contentType.includes("text/html")) {
    response.send(Buffer.from(body));
    return;
  }

  let html = new TextDecoder().decode(body);
  const enhancement = '<link rel="stylesheet" href="/admin-quotation-section.css"><script type="module" src="/admin-quotation-section.js"></script>';
  html = html.includes("</head>") ? html.replace("</head>", enhancement + "</head>") : enhancement + html;
  response.send(html);
}