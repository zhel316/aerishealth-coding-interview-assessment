# Answers to Question C: Xero API

## C1. How would you prove that our Xero API connection is working before checking invoices?

Before checking invoices, I would first verify that the OAuth connection is active and that the application has access to the Xero tenant.

I would call the Xero connections endpoint:

```http
GET https://api.xero.com/connections
```

If the request succeeds and the response includes a valid `tenantId`, that confirms the user has authorized the application and that we have a tenant context to use for subsequent API calls, such as retrieving invoices.

## C2. If /connections works but GET /Invoices fails, what would you check？

If the API returns 401, I would first check the bearer token: whether it is expired, whether the Authorization header is correctly set as Bearer token, and whether the token has the required scope such as accounting.invoices. Then I would check the API endpoint, Accept header, tenant/company context if required, and the actual HTTP status code.

## C3. What endpoint would you call to check invoices?

```http
GET https://api.xero.com/api.xro/2.0/Invoices
```

## C4. How would you check one specific invoice?

I would call GET /Invoices/{InvoiceID} to retrieve a specific invoice, such as
```http
GET https://api.xero.com/api.xro/2.0/Invoices/243216c5-369e-4056-ac67-05388f86dc81
```

## C5. If the invoice API returns 429, how should the backend handle it?

If the API returns 429, I would treat it as a rate limit issue. The backend should avoid immediate retries, respect the Retry-After header if provided, and retry using exponential backoff. I would also add request throttling or queueing to reduce request frequency and prevent hitting the limit repeatedly.

