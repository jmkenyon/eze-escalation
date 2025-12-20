This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Eze Incident Management

A full-stack incident escalation and communication platform built to manage live incidents, share real-time updates, and reduce operational stress during client-impacting events.

⸻

Features
	•	Live Incident Dashboard
	•	View the currently open incident
	•	Display latest advice and real-time updates
	•	Real-time Updates
	•	Push-based updates using Pusher
	•	No page refresh required
	•	Incident Lifecycle
	•	Open → Update → Resolve incidents
	•	Automatic timestamping and resolution tracking
	•	Post-Incident History
	•	Browse previously resolved incidents
	•	View historical updates and advice
	•	Admin-only Actions
	•	Secure access using cookie-based authentication
	•	Create, update, and delete incident messages
	•	Responsive UI
	•	Optimized for desktop and smaller screens
	•	Sliding drawers for closed incidents and update history

⸻

Tech Stack

Frontend
	•	Next.js (App Router)
	•	React
	•	Tailwind CSS
	•	shadcn/ui

Backend
	•	Next.js API routes
	•	Prisma ORM
	•	MongoDB

Real-time
	•	Pusher (channels + events)

Auth
	•	Secure session cookies
	•	bcrypt for password hashing

⸻

Architecture Overview
	•	Server Components
	•	Fetch initial incident state (fast + SEO-friendly)
	•	Client Components
	•	Subscribe to real-time Pusher channels
	•	Update UI instantly on new events
	•	Pusher Channels
	•	One channel per incident: incident-{incidentId}
	•	Events
	•	incident:update → new updates or advice
	•	incident:message_delete → remove updates live

⸻

Security Notes
	•	Passwords are hashed with bcrypt (one-way, salted)
	•	No plaintext credentials are stored
	•	All admin actions require a valid session cookie
	•	Real-time events only send non-sensitive data


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
