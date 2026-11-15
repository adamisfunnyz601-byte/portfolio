# Adam — Developer Portfolio

Live website: **https://adam.devs.li/**

A responsive personal portfolio for Adam, a student and developer interested in web development, software, Roblox game creation and AI experimentation. Includes a real-time visitor chat widget and private owner inbox.

## Run locally
```bash
npm install
npm start
```

## Enzonic deployment
- Runtime: Node.js 20+
- Root directory: repository root
- Install: `npm install`
- Build: leave blank
- Start: `npm start`

## Private environment variables
Set these in Enzonic's private Environment Variables settings. **Never put real secrets in website code, GitHub source files, or a public README.**

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_KEY` | Yes | Long random secret for the private owner chat login |
| `DATABASE_URL` | Recommended | PostgreSQL connection string (Neon works) for persistent chat history |
| `CONTACT_EMAIL` | No | Public contact email; defaults to adammalik1234674@gmail.com |
| `PUBLIC_GENDER` | No | Public gender label; defaults to Male |
| `PORT` | Platform-provided | HTTP port |

## Custom domain
The site metadata is configured for `https://adam.devs.li/`. Add the domain in Enzonic's custom domain settings and use the exact DNS records Enzonic provides.

## Live chat
Visitors can message Adam using the floating **Message me** button. To open the owner inbox, visit [https://adam.devs.li/#owner](https://adam.devs.li/#owner), select **Sign in**, and enter the private `ADMIN_KEY`.

For persistent chat history, set `DATABASE_URL` to a PostgreSQL database. Without it, chat history is temporary and is lost when the service restarts.

## Public profile
- Name: Adam
- Role: Student & Developer
- Gender: Male
- Email: adammalik1234674@gmail.com
- GitHub: https://github.com/adamisfunnyz601-byte
- Interests: web development, JavaScript, Python, Luau, Roblox game development, AI tools, APIs, databases and deployment.

The portfolio describes areas of interest and ongoing learning; it does not claim professional certifications or employment history.

## Health check
The service exposes `/health` and `/api/profile`.
