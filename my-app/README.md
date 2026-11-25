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

## Gallery photo versions

Requires Node.js 24+ for the maintenance script and photo tests.
New uploads retain the exact source file in R2 and generate proportional WebP
versions: an 800px preview (quality 82) and a 2400px display image (quality 85),
measured by the longest edge. EXIF rotation is applied; photos are never enlarged.
The gallery and admin grid use previews; the viewer loads the display version.
New covers use 1200px square WebP at quality 82.

Before using the new upload flow on an existing database, run:

```bash
npm run photos:optimize
npm run photos:optimize -- --apply
```

The first command only counts photos needing processing. `--apply` runs the
idempotent `002_photo_variants.sql` migration and creates versions for existing
photos using server credentials from `.env.local`. It preserves the existing
source objects, processes one photo at a time, and publishes each pair of new
keys/dimensions only after both files are uploaded. Rerunning skips completed
photos and retries incomplete ones. Legacy photos fall back to their source
until processed. Previous uploads retain their existing stored WebP source;
the original camera file cannot be recovered from that source.

Generated objects use `Cache-Control: public, max-age=31536000, immutable`.
For production CDN caching, attach an R2 custom domain and configure
`R2_PUBLIC_URL` accordingly; this script does not change domain settings.
Deleting a photo or gallery also deletes its stored web versions and source.

Run the image-processing and gallery-layout checks with `npm run test:photos`.
