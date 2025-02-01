# Routing and Request Handlers

> The order of writing handlers is very important

Routes act as wild card handlers

- `/` => handles all routes starting with `/*`.
- `/test` => handles all routes starting with `/test/*`.
- `/hello/xyz` => handles all routes starting with `/hello/xyz/*`.

> NOTE: `*` doesn't include request params. It will be different route and will match perfectly

The request will be handled by first matching request handler always.

## HTTP Methods

- `GET` = To get the resource
- `POST` = To create the resource
- `PUT` = To replace the resource
- `PATCH` = To update the resource
- `DELETE` = To update the resource
- `OPTIONS` = To get CORS headers as preflight request by browser
  - Default Response => `Allow` (header) => list of comma seperated methods for the matched route. If no route exist, then `Cannot OPTIONS /route`.
- `HEAD` = To get resource metadata with res body to not incur costs
  - Default Response => list of headers would be sent in `GET`. Otherwise `404 Not Found` without body and with headers.

```js
app.use("/", handler);
```

The above code snippet will handle all HTTP Methods. To handle specific methods, we can use `app.get(), app.post(), app.put(), app.delete(), app.patch()` etc. But the order of routes is still very important.

## Advanced Routing Techniques

We can make routes using regular expressions.

- `'/ab?c'` => matches `/abc/*`, `/ac/*`
- `'/ab+c'` => matches `/abc/*`, `/abbc/*`, `/abbb.....bc/*`
- `'/ab*cd'` => matches `/abcd/*`, `/abbcd/*`, `/ab<anything>cd/*`
- `'/a(bc)?d'` => matches `/abcd/*`, `/ad/*`
- `'/a(bc)+d'` => matches `/abcd/*`, `/abcbcbcbcbc.....bcd/*`
- `/a/` => matches all routes containing `a` anywhere
- `/.*fly$` => matches all routes ending with `/*/*/*fly`

## Getting data from URL

- Request Params
  - `/user/:id` => `req.params` = `{ id: <val> }`
- Query Parameters
  - `/*?message=Hello%20World` => `req.query` = `{message: 'Hello World'}`
