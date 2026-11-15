# Adam — Developer Portfolio

A polished, responsive personal portfolio with a real-time visitor chat widget and a private owner inbox.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000.

## Enzonic deployment

Deploy this repository as a **Node.js service** from the `main` branch.

- Root directory: repository root
- Install command: `npm install`
- Build command: leave blank
- Start command: `npm start`
- Runtime: Node.js 20 or newer
- Port: use the platform-provided `PORT` variable; the app binds to `0.0.0.0`

Set these environment variables in Enzonic:

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_KEY` | Yes | Long random secret for the private owner chat login |
| `DATABASE_URL` | Recommended | PostgreSQL connection string (Neon works) for chat history that survives restarts |
| `CONTACT_EMAIL` | No | Public email address; defaults to the email already shown on the portfolio |
| `PUBLIC_GENDER` | No | Optional public gender label; left blank by default |
| `PORT` | Platform-provided | HTTP port |

### Live chat

Visitors can message you from the floating **Message me** button. To open the owner inbox, visit your site with `#owner` at the end of the URL (for example, `https://your-domain.example/#owner`) and select **Sign in**. Enter the `ADMIN_KEY` you configured in Enzonic. Keep this key private.

For persistent chat history, attach a PostgreSQL database and set `DATABASE_URL`. Without it, the app uses temporary in-memory history which is lost when the service restarts.

## Personal profile

The portfolio uses the GitHub username `adamisfunnyz601-byte`, the public email configured above, and project descriptions based on the work areas shared for this portfolio. It does not guess your gender; set `PUBLIC_GENDER` only if you want that information visible publicly.

## Health check

The service exposes `/health` and `/api/profile`.
