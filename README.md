# The Cyborg JobPortal App

This is the frontend for JobPortal platform.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000][localhost] with your browser to see the result.

All job portals currently supported by Cyborg are running on the same source code.
[`package.json`](./package.json) file has a "starting" script for every supported
job portal. Look for scripts named `dev:${JOBPORTAL_BRAND}`.

If you wish to locally start a dev server with a specific Job Portal, you just start
a relevant `dev:*` script. For example, to start Prace.cz locally:

```bash
cd apps/jobportal
yarn dev:prace.cz
```

## Deployment

The easiest way to deploy this app is to use the [AWS Amplify][aws-amplify].

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation][docs-next-js] - learn about Next.js features and API.
- [Learn Next.js][learn-next] - an interactive Next.js tutorial.

[localhost]: http://localhost:3000
[aws-amplify]: https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html
[docs-next-js]: https://nextjs.org/docs
[learn-next]: https://nextjs.org/learn
