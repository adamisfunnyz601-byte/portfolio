# Adam — Developer Portfolio

Live website: **https://adam.devs.li/**

A responsive personal portfolio for Adam, a student and developer interested in web development, software, Roblox game creation and AI experimentation. Includes a real-time visitor chat widget, email-required visitor contact, a private owner inbox, digital art and 3D modelling information, and a commission request form.

## Run locally
```bash
npm install
npm start
```

## Enzonic deployment
- Runtime: Node.js 22.x
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
| `SMTP_HOST` | Optional | SMTP server hostname for new-chat email alerts |
| `SMTP_PORT` | Optional | SMTP port; usually `587` (STARTTLS) or `465` (SSL) |
| `SMTP_SECURE` | Optional | Set `true` for port 465; otherwise `false` |
| `SMTP_USER` | Optional | SMTP account username |
| `SMTP_PASS` | Optional | SMTP password or provider API key (keep private) |
| `SMTP_FROM` | Optional | Verified sender address; defaults to `SMTP_USER` |
| `PORT` | Platform-provided | HTTP port |



### Email notifications
When SMTP is configured, each new visitor chat message and each commission request triggers an email to `CONTACT_EMAIL`. Commission requests are saved in `portfolio_commissions` when PostgreSQL is configured. Chat messages are saved with the visitor's required email address. The request/message is still saved if email delivery fails. Configure the SMTP variables above in Enzonic; do not commit SMTP credentials to GitHub. Without SMTP settings, chat and commission submissions can still be saved, but email notifications are not sent.

## Custom domain
The site metadata is configured for `https://adam.devs.li/`. Add the domain in Enzonic's custom domain settings and use the exact DNS records Enzonic provides.

## Live chat
Visitors must enter their name and a valid email address before sending a chat message. To open the owner inbox, visit [https://adam.devs.li/#owner](https://adam.devs.li/#owner), select **Sign in**, and enter the private `ADMIN_KEY`. The owner inbox lists visitor conversations; select or double-click a visitor entry to open that private thread and reply. Commission requests require a name, email, type and project description.

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
