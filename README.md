# Adam — Developer Portfolio

A responsive personal portfolio with a real-time visitor chat inbox. Built with Node.js and Socket.IO, ready for Enzonic or any Node.js host.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000.

## Environment variables

- `PORT` — supplied by the hosting platform (defaults to 3000).
- `ADMIN_KEY` — required secret for the owner chat dashboard. Set a long random value in Enzonic.
- `CONTACT_EMAIL` — optional public contact email shown on the site.
- `CHAT_HISTORY_LIMIT` — optional number of recent messages to retain in memory (defaults to 100).

## Enzonic deployment

Create a Node.js service from this GitHub repository and branch `main`.

- Install command: `npm install`
- Build command: leave blank
- Start command: `npm start`
- Root directory: `/` (repository root)
- Environment variables: `ADMIN_KEY` (required), optionally `CONTACT_EMAIL`.

The app listens on `0.0.0.0` and `process.env.PORT`. Chat is live while the server process is running; in-memory chat history resets when the service restarts. Use a persistent database if you want messages to survive restarts.

## Personal details

The public profile deliberately avoids inventing private details. Update the editable profile constants in `server.js` with your confirmed contact details and any personal details you want public.