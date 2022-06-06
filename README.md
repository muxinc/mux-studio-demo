This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmuxinc%2Fmux-studio-demo&env=MUX_TOKEN_ID,MUX_TOKEN_SECRET,MUX_SIGNING_KEY,MUX_PRIVATE_KEY&demo-title=Mux%20Studio&demo-description=An%20embeddable%20browser-based%20live%20streaming%20studio&demo-url=https%3A%2F%2Fwww.mux.com%2Fblog%2Fstream-club-is-joining-mux&demo-image=https%3A%2F%2Fi.ibb.co%2FXF8yJxp%2FScreen-Shot-2022-05-30-at-11-58-19-AM.png)

## Getting Started

First, create a studio to meet in. For all of these steps we will be using the 'Development' environment. But feel free to use 'Production' when ready.

Log in to https://dashboard.mux.com. In the left navigation menu, click on Studio from within the "/VIDEO" section. Click 'Create New Studio' and follow the prompts to create a new studio.

Now, create a .env.local file at the root of the repo with the following secrets:

```bash
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
MUX_SIGNING_KEY=
MUX_PRIVATE_KEY=
```

To generate the MUX_TOKEN_ID and MUX_TOKEN_SECRET, log in to https://dashboard.mux.com. Open API Access Tokens from the navigation menu on the left. And generate a new token with Mux Video permissions. You will be given a MUX_TOKEN_ID and a MUX_TOKEN_SECRET. Fill in the values for the .env.local file and don't commit them into the repo.

To generate the MUX_SIGNING_KEY and MUX_PRIVATE_KEY, log in to https://dashboard.mux.com. Open Signing Keys from the navigation menu on the left. And generate a new Video key. You will be given the MUX_SIGNING_KEY as well as the MUX_PRIVATE_KEY. Fill in the values for the .env.local file and don't commit them into the repo. For MUX_PRIVATE_KEY make sure you use the base64-encoded version rather than the raw .pem file download.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
