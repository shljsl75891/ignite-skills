## CORS (Cross Origin Resource Sharing)

CORS is a security mechanism that lets one web app access resources from another app on a different origin. "Different origin" means any of:

- Different domain (e.g., `example.com` vs. `exercise.com`)
- Different protocol (e.g., `http` vs. `https`)
- Different port (e.g., `example.com:80` vs. `example.com:8080`)
- Different subdomain (e.g., `app.example.com` vs. `api.example.com`)

#### How to enable CORS?

Browsers send a **preflight request** before the actual request — it checks whether the server permits cross-origin access and which domains are allowed. Servers opt in by including CORS-specific headers in the response:

- `Access-Control-Allow-Origin` — which domains can access the resource (`*` means all)
- `Access-Control-Allow-Methods` — which HTTP methods are permitted (GET, POST, etc.)
- `Access-Control-Allow-Headers` — which request headers are allowed
- `Access-Control-Allow-Credentials` — whether the response is exposed when credentials are included
