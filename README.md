This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
```sh
npm i
```

First, run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting Up Login Auth
- Follow: [Github OAuth app](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
- Name: Anything you'd like
- URLs will be `http://localhost:3000` during the creation process
- Once the app is registered create a `.env` file in the root of this project
- Add in the Client ID and Client Secret you now have access to in the Github app to the `.env` file and save
  - Example: 
  - GITHUB_ID=123456CHANGE
  - GITHUB_SECRET=123456CHANGE

