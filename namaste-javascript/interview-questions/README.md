## CORS (Cross Origin Resource Sharing)

CORS is a security mechanism that lets one web app access resources from another app on a different origin. "Different origin" means any of:

- Different domain (e.g., `example.com` vs. `exercise.com`)
- Different protocol (e.g., `http` vs. `https`)
- Different port (e.g., `example.com:80` vs. `example.com:8080`)
- Different subdomain (e.g., `app.example.com` vs. `api.example.com`)

#### Same Origin vs Same Site

**SOURCE URL**: `https://example.com:443`

| Target URL                 | Same Origin? | Same Site? | Why?                                                                                  |
| -------------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------- |
| `https://example.com`      | ✅ Yes       | ✅ Yes     | Protocol, hostname, and port all match exactly.                                       |
| `https://api.example.com`  | ❌ No        | ✅ Yes     | Hostname (subdomain) changed, but the registrable domain (`example.com`) is the same. |
| `http://example.com`       | ❌ No        | ❌ No      | Protocol changed from HTTPS to HTTP.                                                  |
| `https://example.com:8080` | ❌ No        | ✅ Yes     | Port changed from `443` to `8080`.                                                    |
| `https://another-site.com` | ❌ No        | ❌ No      | Different registrable domain (`another-site.com`).                                    |

> [!NOTE]
> A request is a cross origin if any of protocol, hostname, or port is different from the source URL. A request is cross site only if the protocol or registrable domain is different from the source URL.

#### How to enable CORS?

Browsers send a **preflight request** before the actual request — it checks whether the server permits cross-origin access and which domains are allowed. Servers opt in by including CORS-specific headers in the response:

- `Access-Control-Allow-Origin` — which domains can access the resource (`*` means all)
- `Access-Control-Allow-Methods` — which HTTP methods are permitted (GET, POST, etc.)
- `Access-Control-Allow-Headers` — which request headers are allowed
- `Access-Control-Allow-Credentials` - whether the server allows credentials (such as cookies, TLS client certificates, or HTTP authentication creds) to be included in cross-origin HTTP requests.
