This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Contact form email

The contact form sends enquiries to `mokina.viktoria.photo@gmail.com` through
`POST /api/contact`. The visitor's email is used as Reply-To, so replying to
an enquiry addresses the visitor.

Configure these server-only values in `.env.local` (and in the hosting
environment when deploying):

```dotenv
SMTP_USER=mokina.viktoria.photo@gmail.com
SMTP_APP_PASSWORD=
```

Enable Google 2-Step Verification, then create a Google App Password:
https://support.google.com/accounts/answer/185833
Paste that app password into `SMTP_APP_PASSWORD` locally and restart
`npm run dev`. Keep this value out of Git and client-side environment variables.

The form reports success only after Gmail accepts the email. If configuration
is missing or sending fails, the form keeps the entered details and displays
an error. For an end-to-end check, submit a test enquiry and check the receiving
inbox and spam folder.
